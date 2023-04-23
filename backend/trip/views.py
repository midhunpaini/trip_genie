import openai
from trip_genie.settings import GPT_KEY, GPT_ORG_ID
from rest_framework.views import APIView
from rest_framework.response import Response
from . models import *
import jwt
from rest_framework.exceptions import AuthenticationFailed
from users.models import User
import googlemaps
from trip_genie.settings import GOOGLE_PLACES_KEY
from . helpers import *
import requests
import json
from . serializers import *
openai.api_key = GPT_KEY


class GPTView(APIView):
    def post(self, request):
        start_date = request.data.get('start_date')
        end_date = request.data.get('end_date')
        budget = request.data.get('budget')
        travel_preferences = request.data.get('interests')
        dietary_requirements = request.data.get('dietary_requirements')
        destination = request.data.get('destination')
        currency = request.data.get('currency')
        current_location = request.data.get('current_location')
        num_people = request.data.get('num_persons')
        group_type = request.data.get('group_type')
        token = request.COOKIES.get('jwt')

        if not token:
            raise AuthenticationFailed('Unauthenticated')

        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated')

        user = User.objects.filter(id=payload['id']).first()
        trip = Trip.objects.create(user=user, current_location=current_location,
                                   destination=destination, start_date=start_date, end_date=end_date, budget=budget)

        

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
       
        # places = [
        #     "Old Goa",
        #     "Panaji",
        #     "Dudhsagar Falls",
        #     "Anjuna Beach",
        #     "Vagator Beach",
        #     "Baga Beach",
        #     "Calangute Beach",
        #     "Arambol Beach."
        # ]
        # itinerary = [
        #     "Day 1: Arrive in Goa, explore beaches.",
        #     "Day 2: Visit Dudhsagar Falls, enjoy sunset.",
        #     "Day 3: Explore Old Goa, visit churches.",
        #     "Day 4: Visit Fort Aguada, explore markets.",
        #     "Day 5: Enjoy water sports, visit temples.",
        #     "Day 6: Explore wildlife sanctuaries, relax on beaches.",
        #     "Day 7: Visit spice plantations, enjoy local cuisine.",
        #     "Day 8: Enjoy beach activities, visit local markets.",
        #     "Day 9: Explore churches, enjoy nightlife. ",
        #     "Day 10: Depart from Goa. "
        # ]
        request.session['trip'] = trip
        request.session['places'] = places
       
        Itinerary.objects.create(trip=trip, itinerary=itinerary)

    
        return Response({"itinerary": itinerary,"places":places})


class PlaceView(APIView):
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
            if line.strip(): # check if line is not empt
                place_descriptions.append(line.split(":"))
        
        
        sites = []
        for i, site in enumerate(places):
            place = gmaps.places(site)
            place_id = place["results"][0]["place_id"]
            photo_reference = None
            if "photos" in place["results"][0]:
                photo_reference = place["results"][0]["photos"][0]["photo_reference"]
            if photo_reference is None:
                url = None
            else:
                url = f"https://maps.googleapis.com/maps/api/place/photo?maxwidth=500&photoreference={photo_reference}&key={GOOGLE_PLACES_KEY}"
            site = Site.objects.create(trip=trip, name=site, image_url=url, description=place_descriptions[i])
            sites.append(site)
        serializer = SiteSerializer(sites, many=True)
        places = serializer.data
        return Response(places)

    
