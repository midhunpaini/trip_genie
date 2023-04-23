import re

text = "Itinerary:\n\nDay 1: Arrive in Goa, explore local markets.\n\nDay 2: Visit Calangute Beach, enjoy water sports.\n\nDay 3: Explore Old Goa, visit churches.\n\nDay 4: Visit Dudhsagar Falls, take a boat ride.\n\nDay 5: Visit Dona Paula Beach, enjoy the sunset.\n\nDay 6: Take a day trip to Panaji, explore the city.\n\nDay 7: Visit Anjuna Beach, shop at the flea market.\n\nDay 8: Take a day trip to Arambol Beach, relax on the beach.\n\nDay 9: Visit Morjim Beach, try local cuisine. \n\nDay 10: Depart from Goa. \n\nPlaces to Visit: Calangute Beach, Old Goa, Dudhsagar Falls, Dona Paula Beach, Panaji, Anjuna Beach, Arambol Beach, Morjim Beach."

places_to_visit = []
places_pattern = r"Places to Visit:\s*(.*)"
places_match = re.search(places_pattern, text, re.DOTALL)
if places_match:
    places_to_visit = [place.strip() for place in places_match.group(1).split(",")]

print(places_to_visit)