import openai
from trip_genie.settings import GPT_KEY, GOOGLE_PLACES_KEY, TRIPADVISOR_KEY
from rest_framework.views import APIView
from rest_framework.response import Response
from . models import *
import jwt
from rest_framework.exceptions import AuthenticationFailed
from users.models import User
import googlemaps
import datetime
from . helpers import *
from . serializers import *
openai.api_key = GPT_KEY
from rest_framework.throttling import UserRateThrottle
from .scrap.booking import Booking
from datetime import date


class SetDestinationView(APIView):
    throttle_classes = [UserRateThrottle]

    def post(self, request):
        start_date = request.data.get('start_date')
        end_date = request.data.get('end_date')
        budget = request.data.get('budget')
        current_location = request.data.get('current_location')
        destination = request.data.get('destination')
        currency = request.data.get('currency')
        num_people = request.data.get('num_persons')
        token = request.COOKIES.get('jwt')

        if not token:
            raise AuthenticationFailed('Unauthenticated')

        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated')

        today = datetime.date.today()
        start_date = datetime.datetime.strptime(start_date, "%Y-%m-%d").date()
        end_date = datetime.datetime.strptime(end_date, "%Y-%m-%d").date()

        if start_date > end_date or start_date < today:
            return Response({"itinerary": [], "places": [],"message":"Invalid date"})

        user = User.objects.filter(id=payload['id']).first()

        prompt = f"Is it practically possible to plan a {num_people} person vacation trip to {destination[0]} between {start_date} and {end_date} with a budget of {budget} {currency} which includes travel, food , accommodation and other expences? The output should be Yes or No"

        response = openai.Completion.create(
            model="text-davinci-003",
            prompt=prompt,
            max_tokens=3,
            n=1,
            stop=None,
            temperature=0.7,
        )

        result = response.choices[0].text.strip()
        if result == 'Yes':
            trip = Trip.objects.create(
                user=user,
                current_location=current_location[0],
                currency=currency,
                no_of_people=num_people,
                destination=destination[0],
                destination_id=destination[1],
                start_date=start_date,
                end_date=end_date,
                budget=budget
            )
            request.session['trip_id'] = trip.id
            return Response({"result": True, "message": result, "trip":trip.id})
        else:
            return Response({"result": False, "message": f"No, it is not possible to plan the trip with the given budget. Please Increase your budget to continue."})

class ActivitiesView(APIView):
    throttle_classes = [UserRateThrottle]
    def get(self, request):
        trip_id = request.session.get('trip_id')
        token = request.COOKIES.get('jwt')
        if not token:
            raise AuthenticationFailed('Unauthenticated')

        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated')

        user = User.objects.filter(id=payload['id']).first()
        trip = Trip.objects.get(id=trip_id)

        activities =["outdoor activities",
                    "cultural experiences",
                    "beach and water activities",
                    "adventure sports",
                    "wildlife safaris",
                    "city sightseeing",
                    "relaxation and spa",
                    "shopping and fashion",
                    "historical tours",
                    "religious and spiritual journeys",
                    "give more options like this",
                    "Culinary tours and experiences",
                    "Wine tasting and vineyard tours",
                    "Music and arts festivals",
                    "Ecotourism and sustainable travel",
                    "Volunteering and community service trips",
                    "Road trips and scenic drives",
                    "Skiing and winter sports",
                    "Yoga and wellness retreats",
                    "Cultural immersion and homestays",
                    "Archaeological expeditions and ancient ruins visits",
                    "National park exploration and hiking trips",
                    "Train journeys and railway travel",
                    "River cruises and sailing trips",
                    "Photography tours and workshops",
                    "Stargazing and astronomy experiences",
                    "Scuba diving and snorkeling adventures",
                    "Surfing and windsurfing lessons and experiences",
                    "Mountain biking and cycling tours",
                    "Horseback riding and equestrian experiences",
                    "Glamping and luxury camping",
                    "Sports and fitness retreats",
                    "Literary and book-themed tours",
                    "Ghost tours and paranormal experiences",
                    "Film and TV location tours",]


        prompt = f"What are the activities in {activities} that can be done in {trip.destination}? Give the most relevent 10"
        response = openai.Completion.create(
            model="text-davinci-003",
            prompt=prompt,
            max_tokens=250,
            top_p=0.46,
            frequency_penalty=0.2,
            presence_penalty=0,
            temperature=0.8,

        )

        result = response.choices[0].text.strip()
        list = result.split("\n")
        activities = [item.lstrip('1234567890. ') for item in list if item]
        return Response({"activities":activities})


class GPTView(APIView):
    throttle_classes = [UserRateThrottle]
    def post(self, request):
        trip_id = request.session.get('trip_id')
        travel_preferences = request.data.get('interests')
        group_type =request.data.get('group_type ')
        dietary_requirements = request.data.get('dietary_requirements')
        token = request.COOKIES.get('jwt')

        if not token:
            raise AuthenticationFailed('Unauthenticated')

        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated')
        

        user = User.objects.filter(id=payload['id']).first()
        trip = Trip.objects.get(id=trip_id)
        num_people = trip.no_of_people
        destination = trip.destination
        start_date =trip.start_date
        end_date = trip.end_date
        currency = trip.currency
        budget = trip.budget

        today = datetime.date.today()
        if start_date > end_date or start_date < today:
            return Response({"itinerary": [], "places": [],"message":"Invalid date"})
        

        # Configure the OpenAI API client

        # Define the input parameters for the GPT-3 model

        prompt = f"{num_people} people are planning a trip to {destination} from {start_date} to {end_date} with a budget of {currency} {budget}.They are {group_type}. They are interested in {travel_preferences}. Can you help plan an itinerary and suggest places to visit within their budget\n\nItinerary: Please suggest an appropriate itinerary with daily activities, each activity should be described in 15 words or less.\n\nPlaces to Visit: Please suggest must see attractions within the {travel_preferences}, each place should be separated by comma in a line."

        # Call the GPT-3 model and receive the response
        response = openai.Completion.create(
            model="text-davinci-003",
            prompt=prompt,
            max_tokens=450,
            top_p=0.46,
            frequency_penalty=0.2,
            presence_penalty=0,
            temperature=0.8,

        )

        result = response.choices[0].text.strip()
        data = extract_data(result)
        itinerary = data['itinerary']
        places = data['places_to_visit']

     
        request.session['trip'] = trip
        request.session['places'] = places

        Itinerary.objects.create(trip=trip, itinerary=itinerary)

        return Response({"itinerary": itinerary, "places": places,"message":"ok"})


class PlaceView(APIView):
    throttle_classes = [UserRateThrottle]
    def get(self, request):
        gmaps = googlemaps.Client(key=GOOGLE_PLACES_KEY)
        places = request.session.get('places')
        trip = request.session.get('trip')

        prompt = f"Describe the each place in {places} in 50 words"

        # Call the GPT-3 model and receive the response
        response = openai.Completion.create(
            model="text-davinci-003",
            prompt=prompt,
            max_tokens=750,
            top_p=0.46,
            frequency_penalty=0.2,
            presence_penalty=0,
            temperature=0.8,

        )

        result = response.choices[0].text.strip()
        place_descriptions = []
        for line in result.split("\n"):
            if line.strip():  # check if line is not empt
                place_descriptions.append(line.split(":"))

        sites = []
        for i, site in enumerate(places):
            place = gmaps.places(site)
            place_id = place["results"][0]["place_id"]
            lat = place["results"][0]["geometry"]["location"]["lat"]
            lng = place["results"][0]["geometry"]["location"]["lng"]
            photo_reference = None
            if "photos" in place["results"][0]:
                photo_reference = place["results"][0]["photos"][0]["photo_reference"]
            if photo_reference is None:
                url = None
            else:
                url = f"https://maps.googleapis.com/maps/api/place/photo?maxwidth=500&photoreference={photo_reference}&key={GOOGLE_PLACES_KEY}"
            site = Site.objects.create(
                place_id=place_id, trip=trip, name=site, image_url=url, description=place_descriptions[i], latitude=lat, longitude=lng)
            sites.append(site)
        serializer = SiteSerializer(sites, many=True)
        places = serializer.data
        return Response(places)


class BookingView(APIView):
    throttle_classes = [UserRateThrottle]
    def get(self, request):
        trip_id = request.session.get('trip_id')
        trip = Trip.objects.get(id=trip_id)
        start_date = trip.start_date.strftime("%Y-%m-%d")
        end_date = trip.end_date.strftime("%Y-%m-%d")
        destination = trip.destination
        
    
        with Booking() as bot:
            bot.land_first_page()
            bot.select_place_to_go(destination)
            bot.select_date(start_date, end_date)
            bot.occupancy(trip.no_of_people)
            bot.search()
            hotels=bot.collect_data()
            bot.close()
        
        for hotel in hotels:
            Hotel.objects.create(trip=trip, name=hotel['name'], price=hotel['price'],rating=hotel['rating'], total_rating=hotel['total_rating'], image_url=hotel['image_url'], booking_url = hotel['booking_link'], hotel_url= hotel['hotel_link'])
        
        print(hotels)
        return Response({"hotels":hotels})


class LocalDelicacyView(APIView):
    throttle_classes = [UserRateThrottle]
    def get(self, request):
        trip_id = request.session.get('trip_id')
        trip = Trip.objects.get(id=trip_id)
        destination = trip.destination

        prompt = f"Suggest 5 Must try local food(delicacy) in {destination}"

        # Call the GPT-3 model and receive the response
        response = openai.Completion.create(
            model="text-davinci-003",
            prompt=prompt,
            max_tokens=750,
            top_p=0.46,
            frequency_penalty=0.2,
            presence_penalty=0,
            temperature=0.8,
        )
        result = response.choices[0].text.strip()
  
        delicacies = extract_delicacy(result)

        for delicacy in delicacies:
            LocalDelicacy.objects.create(trip=trip, name=delicacy['name'], description=delicacy['description'])

        return Response({'delicacies':delicacies})
    

class TravelOptionsView(APIView):
    throttle_classes = [UserRateThrottle]
    
    def get(self, request):
        trip_id = request.session.get('trip_id')
        trip = Trip.objects.get(id=trip_id)
        destination = trip.destination
        current_location = trip.current_location
        currency  = trip.currency

        prompt = f"What are the travel options available from {current_location} to {destination}."

        # Call the GPT-3 model and receive the response
        response = openai.Completion.create(
            model="text-davinci-003",
            prompt = prompt,
            max_tokens=650,
            top_p=0.46,
            frequency_penalty=0.2,
            presence_penalty=0,
            temperature=0.6,
        )
        result = response.choices[0].text.strip()
        
        travel_options = extract_travel_options(result)
        for option in travel_options:
            TravelOption.objects.create(trip=trip, option=option['option'], description=option['description'])
      
        return Response({'travel_options':travel_options})
    

class SaveTripView(APIView):
    def post(self, request):

        trip_id = request.session.get('trip_id')
        trip = Trip.objects.get(id=trip_id)

        trip.is_save = True
        trip.save()
    
        return Response({'message':'success'})