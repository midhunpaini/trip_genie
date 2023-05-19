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


    data = {
        "itinerary": itinerary,
        "places_to_visit": places_to_visit,
    }

    return data

def extract_delicacy(data):
    menu = []
    try:
        items = data.split("\n\n")
        # Loop through the items and add them to the list as dictionaries
        for item in items:
            # Split the item into the name and description
            name = item.split(":")[0].split(". ")[1].strip()
            description = item.split(":")[1].strip()
            
            # Add the item as a dictionary to the list
            menu.append({"name": name, "description": description})
    finally:
        return menu


    
def extract_travel_options(string):
    lines = string.split('\n')

    travel_options = []
    try:
        for line in lines:
            if line.strip() == "":  # skip empty lines
                continue
            parts = line.split(":")
            mode = parts[0].strip()
            description = parts[1].strip()
            travel_options.append({"option": mode, "description": description})
        if len(travel_options) == 0:
            mode = 'Travel Options'
            description = lines.strip('\n\n')
    except:
        Exception
      
    return travel_options

    
