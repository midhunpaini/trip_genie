import openai
from trip_genie.settings import GPT_KEY, GPT_ORG_ID
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import re

openai.api_key = GPT_KEY

import re
import openai
from rest_framework.response import Response
from rest_framework.views import APIView

class GPTView(APIView):
    def post(self, request):
        start_date = request.data.get('start_date')
        end_date = request.data.get('end_date')
        budget = request.data.get('budget')
        travel_preferences = request.data.get('travel_preferences')
        transportation = request.data.get('transportation')
        accommodation = request.data.get('accommodation')
        dietary_restrictions = request.data.get('dietary_restrictions')
        dietary_requirements = request.data.get('dietary_requirements')
        destination = request.data.get('destination')
        current_location = request.data.get('current_location')
        num_people = request.data.get('num_people')
        group_type = request.data.get('group_type')

        # Generate the complete prompt with all sections
        prompt = f"I am planning a trip to {destination} with my {group_type} of {num_people} people. We will be traveling from {start_date} to {end_date} and have a budget of ${budget}. Our travel preferences are {travel_preferences} And my current location is {current_location}. Can you help me plan an itinerary, suggest places to visit, accommodation options, local delicacies, and travel options within our budget?\n\nItinerary: Please suggest a appropriate itinerary with daily activities, each activity should be described in 10 words or less.\n\nPlaces to Visit: Please suggest must-see attractions within our travel preferences.\n\nAccommodation Options: Please suggest affordable accommodation options.\n\nLocal Delicacies: Please suggest local foods we must try on our trip.\n\nTravel Options: Please suggest transportation options for site seeing in our {destination} within our budget.\n\nDietary Restrictions: We have {dietary_requirements} dietary requirements.\n\nInterests and Hobbies: Our interests ."
        
        # Call the OpenAI API with the prompt
        response = openai.Completion.create(
            model="text-davinci-003",
            prompt=prompt,
            max_tokens=694,
            top_p=0.46,
            frequency_penalty=0.2,
            presence_penalty=0,
            temperature=0.8
        )
        result = response.choices[0].text.strip()
        print(result[0])
        
        # Extract Itinerary
        itinerary_start = result.find("Itinerary:")
        itinerary_end = result.find("Places to Visit:")
        itinerary = result[itinerary_start:itinerary_end].strip()

        # Extract Places to Visit
        places_start = result.find("Places to Visit:")
        places_end = result.find("Accommodation Options:")
        places = result[places_start:places_end].strip()

        # Extract Accommodation Options
        accommodation_start = result.find("Accommodation Options:")
        accommodation_end = result.find("Local Delicacies:")
        accommodation = result[accommodation_start:accommodation_end].strip()

        # Extract Local Delicacies
        local_delicacies_start = result.find("Local Delicacies:")
        local_delicacies_end = result.find("Travel Options:")
        local_delicacies = result[local_delicacies_start:local_delicacies_end].strip()

        # Extract Travel Options
        travel_options_start = result.find("Travel Options:")
        travel_options_end = result.find("Dietary Restrictions:")
        travel_options = result[travel_options_start:travel_options_end].strip()


        
        
        
        return Response({
            "itinerary":itinerary,
            "places":places,
            "travel_options":travel_options,
            "accommodation":accommodation,
            "local_delicacies":local_delicacies
        })

