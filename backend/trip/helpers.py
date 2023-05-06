import re
import jwt
from rest_framework.exceptions import AuthenticationFailed
from functools import wraps

def authenticated(view_func):
    @wraps(view_func)
    def wrapper(request, *args, **kwargs):
        token = request.COOKIES.get('jwt')
        if not token:
            raise AuthenticationFailed('Unauthenticated')

        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated')

        # Pass the payload to the view function
        return view_func(request, payload, *args, **kwargs)

    return wrapper





def extract_data(result):

    # extract itinerary
    itinerary = []
    itinerary_pattern = r"Day \d+: .+"
    itinerary_matches = re.findall(itinerary_pattern, result)
    for match in itinerary_matches:
        itinerary.append(match)

    # extract places to visit
    places_to_visit = []
    places_pattern = r"Places to Visit:\s*(.*)"
    places_match = re.search(places_pattern, result, re.DOTALL)
    if places_match:
        places_to_visit = [place.strip() for place in places_match.group(1).split(",")]


    # descriptions = []

    # for place in places_to_visit:
    #     description = result.split(place + ': ')[-1].split('\n')[0]
    #     descriptions.append(description)
        

    # extract places to visit discription
    # place_descriptions = []
    # place_desc_pattern = r"Place Description:\s*(.+?)\n\n"
    # place_desc_matches = re.search(place_desc_pattern, result, re.DOTALL)
    # if place_desc_matches:
    #     place_descriptions = [desc.strip().replace('***', '') for desc in place_desc_matches.group(1).split('***')]




    # # extract accommodation options
    # accommodation_options = []
    # accommodation_pattern = r"Accommodation Options: (.+?)\n\n"
    # accommodation_match = re.search(accommodation_pattern, result, re.DOTALL)
    # if accommodation_match:
    #     accommodation_options = [option.strip() for option in accommodation_match.group(1).split(",")]

    # # extract local delicacies
    # local_delicacies = []
    # delicacies_pattern = r"Local Delicacies: (.+?)\n\n"
    # delicacies_match = re.search(delicacies_pattern, result, re.DOTALL)
    # if delicacies_match:
    #     local_delicacies = [delicacy.strip() for delicacy in delicacies_match.group(1).split(",")]

    # # extract travel options
    # travel_options = []
    # options_pattern = r"Travel Options: (.+?)\n\n"
    # options_match = re.search(options_pattern, result, re.DOTALL)
    # if options_match:
    #     travel_options = [option.strip() for option in options_match.group(1).split(",")]

    # create dictionary
    data = {
        "itinerary": itinerary,
        "places_to_visit": places_to_visit,
        # "place_discription":descriptions,
        # "accommodation_options": accommodation_options,
        # "local_delicacies": local_delicacies,
        # "travel_options": travel_options
    }
    print(places_to_visit)

    return data
    
