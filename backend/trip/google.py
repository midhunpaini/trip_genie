import googlemaps
from datetime import datetime
from trip_genie.settings import GOOGLE_PLACES_KEY

gmaps = googlemaps.Client(key=GOOGLE_PLACES_KEY)

# Geocode the address of Goa
geocode_result = gmaps.geocode('Goa, India')

# Set the latitude and longitude of Goa
location = geocode_result[0]['geometry']['location']

# Define the type of places you want to search for
place_type = 'tourist_attraction'

# Define the radius of the search area in meters
radius = 5000

# Search for places of interest in Goa
places_result = gmaps.places_nearby(
    location=location,
    radius=radius,
    type=place_type
)

