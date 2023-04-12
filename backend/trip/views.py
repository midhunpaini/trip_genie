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
        interests = request.data.get('interests')
        destination = request.data.get('destination')
        current_location = request.data.get('current_location')
        num_people = request.data.get('num_people')
        group_type = request.data.get('group_type')

        # Generate the complete prompt with all sections
        prompt = f"I am planning a trip to {destination} with my {group_type} of {num_people} people. We will be traveling from {start_date} to {end_date} and have a budget of ${budget}. Our travel preferences are {travel_preferences}. Can you help me plan an itinerary, suggest places to visit, accommodation options, local delicacies, and travel options within our budget?\n\nItinerary: Please suggest a appropriate itinerary with daily activities, each activity should be described in 10 words or less.\n\nPlaces to Visit: Please suggest must-see attractions within our travel preferences.\n\nAccommodation Options: Please suggest affordable accommodation options.\n\nLocal Delicacies: Please suggest local foods we must try on our trip.\n\nTravel Options: Please suggest transportation options within our budget.\n\nDietary Restrictions: We have {dietary_requirements} dietary requirements.\n\nInterests and Hobbies: Our interests . Output Format (JSON)"
        
        # Call the OpenAI API with the prompt
        response = openai.Completion.create(
            model="text-davinci-003",
            prompt=prompt,
            max_tokens=694,
            top_p=0.46,
            frequency_penalty=0.2,
            presence_penalty=0
        )
        result = response.choices[0].text.strip()



        
        # Extract the sections from the generated text
        itinerary = re.search(r"Itinerary:(.*?)Places to Visit:", result, re.DOTALL).group(1).strip('\n' and '\n\n')
        places_to_visit = re.search(r"Places to Visit:(.*?)Accommodation Options:", result, re.DOTALL).group(1).strip('\n' and'\n\n')
        accommodation_options = re.search(r"Accommodation Options:(.*?)Local Delicacies:", result, re.DOTALL).group(1).strip('\n'and'\n\n')
        local_delicacies = re.search(r"Local Delicacies:(.*?)Travel Options:", result, re.DOTALL).group(1).strip('\n'and'\n\n')
        travel_options = re.search(r"Travel Options:(.*?)Dietary Restrictions:", result, re.DOTALL).group(1).strip('\n'and'\n\n')
        dietary_restrictions = re.search(r"Dietary Restrictions:(.*?)Interests and Hobbies:", result, re.DOTALL).group(1).strip('\n'and'\n\n')

        # Return the sections as a JSON response
        print(result,'***************************')
        print(response,'&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&')
        print({
            'itinerary': itinerary, 
            'places_to_visit': places_to_visit, 
            'accommodation_options': accommodation_options, 
            'local_delicacies': local_delicacies, 
           
 
            'travel_options': travel_options, 
            'dietary_restrictions': dietary_restrictions
        })
        return Response({
            'itinerary': itinerary, 
            'places_to_visit': places_to_visit, 
            'accommodation_options': accommodation_options, 
            'local_delicacies': local_delicacies, 
            'travel_options': travel_options, 
            'dietary_restrictions': dietary_restrictions
        })


