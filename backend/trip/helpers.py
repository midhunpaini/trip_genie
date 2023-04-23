import re

# result = "Itinerary: \nDay 1: Arrive in Goa, explore local markets. \nDay 2: Visit Calangute Beach, shop at Baga Beach. \nDay 3: Take a boat ride to Grand Island, snorkel and swim. \nDay 4: Explore Old Goa churches, visit the Dudhsagar Falls. \nDay 5: Relax at Agonda Beach, visit the Spice Plantation. \nDay 6: Visit Fort Aguada, enjoy the nightlife in Panjim. \nDay 7: Take a trip to Anjuna Beach, explore the flea market. \nDay 8: Enjoy a boat ride on the Mandovi River, explore Chapora Fort. \nDay 9: Visit Dona Paula Beach, take a trip to Colva Beach. \nDay 10: Depart from Goa.\n\nPlaces to Visit: Calangute Beach, Baga Beach, Grand Island, Old Goa Churches, Dudhsagar Falls, Agonda Beach, Spice Plantation, Fort Aguada, Panjim, Anjuna Beach, Mandovi River, Chapora Fort, Dona Paula Beach, Colva Beach.\n\nPlace Discription: Calangute Beach- Popular beach known for its nightlife and water sports activities., Baga Beach- A picturesque beach with white sand and crystal clear waters., Grand Island- An island with a variety of water sports activities., Old Goa Churches- Historic churches built by the Portuguese., Dudhsagar Falls- Magnificent waterfall surrounded by lush greenery., Agonda Beach- A serene beach with stunning views of the Arabian Sea., Spice Plantation- A plantation where you can learn about spices and herbs., Fort Aguada- An old Portuguese fort with a lighthouse., Panjim- The capital city of Goa with a vibrant nightlife., Anjuna Beach- A popular beach known for its flea market., Mandovi River- A river with beautiful views of the city., Chapora Fort- An old fort overlooking the Arabian Sea., Dona Paula Beach- A beach with stunning views of the city., Colva Beach- A popular beach known for its golden sand."
def extract_data(result):
# sample text
    text = result

    # extract itinerary
    itinerary = []
    itinerary_pattern = r"Day \d+: .+"
    itinerary_matches = re.findall(itinerary_pattern, text)
    for match in itinerary_matches:
        itinerary.append(match)

    # extract places to visit
    places_to_visit = []
    places_pattern = r"Places to Visit:\s*(.*)"
    places_match = re.search(places_pattern, text, re.DOTALL)
    if places_match:
        places_to_visit = [place.strip() for place in places_match.group(1).split(",")]


    # descriptions = []

    # for place in places_to_visit:
    #     description = text.split(place + ': ')[-1].split('\n')[0]
    #     descriptions.append(description)
        

    # extract places to visit discription
    # place_descriptions = []
    # place_desc_pattern = r"Place Description:\s*(.+?)\n\n"
    # place_desc_matches = re.search(place_desc_pattern, text, re.DOTALL)
    # if place_desc_matches:
    #     place_descriptions = [desc.strip().replace('***', '') for desc in place_desc_matches.group(1).split('***')]




    # # extract accommodation options
    # accommodation_options = []
    # accommodation_pattern = r"Accommodation Options: (.+?)\n\n"
    # accommodation_match = re.search(accommodation_pattern, text, re.DOTALL)
    # if accommodation_match:
    #     accommodation_options = [option.strip() for option in accommodation_match.group(1).split(",")]

    # # extract local delicacies
    # local_delicacies = []
    # delicacies_pattern = r"Local Delicacies: (.+?)\n\n"
    # delicacies_match = re.search(delicacies_pattern, text, re.DOTALL)
    # if delicacies_match:
    #     local_delicacies = [delicacy.strip() for delicacy in delicacies_match.group(1).split(",")]

    # # extract travel options
    # travel_options = []
    # options_pattern = r"Travel Options: (.+?)\n\n"
    # options_match = re.search(options_pattern, text, re.DOTALL)
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
    
