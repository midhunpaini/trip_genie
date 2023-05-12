from rest_framework import serializers
from .models import Site,Hotel

class SiteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Site
        fields = ['id', 'name', 'place_id', 'description', 'image_url', 'latitude', "longitude"]


class HotelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hotel
        fields = ['id','name','price','rating','total_rating','image_url','booking_url','hotel_url','trip']  
        
    
     
