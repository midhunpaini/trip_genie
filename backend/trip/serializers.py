from rest_framework import serializers
from .models import *

class SiteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Site
        fields = ['id', 'name', 'place_id', 'description', 'image_url', 'latitude', "longitude"]


class HotelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hotel
        fields = ['id','name','price','rating','total_rating','image_url','booking_url','hotel_url'] 

class LocalDelicacySerializer(serializers.ModelSerializer):
    class Meta:
        model = LocalDelicacy
        fields = ['id','name','description'] 


class TravelOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = TravelOption
        fields = ['id','option','description', 'cost'] 



class ItinerarySerializer(serializers.ModelSerializer):
    class Meta:
        model = Itinerary
        fields = '__all__'


class TripSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Trip
        fields = '__all__'
       
    
     
