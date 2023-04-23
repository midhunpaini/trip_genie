import re
from backend.trip_genie.settings import GOOGLE_PLACES_KEY

result =  "Itinerary:\n\nDay 1: Arrive in San Francisco.\n\nDay 2: Explore Golden Gate Park.\n\nDay 3: Visit Fisherman's Wharf.\n\nDay 4: Tour Alcatraz Island.\n\nDay 5: Hike Muir Woods.\n\nDay 6: Tour Chinatown.\n\nDay 7: Visit Twin Peaks.\n\nDay 8: Explore Mission District.\n\nDay 9: Visit San Francisco Museum of Modern Art. \n\nDay 10: Depart San Francisco. \n\n\nPlaces to Visit: \nGolden Gate Bridge, Palace of Fine Arts, Exploratorium, de Young Museum, Cable Car Museum, Ghirardelli Square, Aquarium of the Bay, Ferry Building Marketplace, Coit Tower, Painted Ladies. \n\nAccommodation Options: \nHotel Emblem San Francisco, Hotel Union Square, Hotel Drisco, The Inn at Union Square, The Orchard Hotel, Hotel Whitcomb, Hotel Zetta San Francisco, Hotel Abri Union Square. \n\nLocal Delicacies: \nCioppino (seafood stew), sourdough bread, burritos, dim sum, clam chowder in a sourdough bread bowl, dungeness crab, italian sandwiches (focaccia), Mission-style burritos, Ghirardelli chocolate sundaes. \n\nTravel Options: \nPublic transportation (MUNI and BART), bike rentals, walking tours, ride-sharing services (Uber/Lyft), car rentals. \n\nDietary Restrictions: \nVegetarian/vegan restaurants in San Francisco include Greens Restaurant, Herbivore Restaurant & Cafe, The Plant Cafe Organic, and Golden Era Vegan Restaurant. Gluten-free restaurants include The Plant Cafe Organic and Pica Pica Arepa Kitchen. \n\nInterests and Hobbies: \nOutdoor activities such as kayaking/canoeing in the bay area, biking along the waterfront or through Golden Gate Park; cultural experiences such as visiting museums and art galleries; exploring the city's unique neighborhoods; shopping at local markets; attending music or theater performances; trying out the city's diverse cuisine; visiting local wineries or breweries; and enjoying the nightlife scene."


# itinerary = []
# for line in result.split('\n'):
#     if re.match(r"Day \d+: ", line):
#         itinerary.append(line)


# local_delicacies_start = result.find("Local Delicacies:")
# local_delicacies_end = result.find("Travel Options:")
# local_delicacies = result[local_delicacies_start:local_delicacies_end].strip('Local Delicacies: ').strip('\n').split(', ')



travel_options_regex = r'Travel Options:\s+(.*?)\s+Dietary Restrictions:'
travel_options_match = re.search(travel_options_regex, result, re.DOTALL)

if travel_options_match:
    travel_options = travel_options_match.group(1).strip().split(', ')


print(travel_options)

import requests

url = f"https://maps.googleapis.com/maps/api/place/textsearch/json?query=munnar&key={GOOGLE_PLACES_KEY}"



payload={}
headers = {}

response = requests.request("GET", url, headers=headers, data=payload)

print(response.text)


