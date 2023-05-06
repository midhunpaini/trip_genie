from django.db import models
from django.utils import timezone
from users.models import User
from django.contrib.postgres.fields import ArrayField
from django.db import models

class Hotel(models.Model):
    name = models.CharField(max_length=100)
    price = models.CharField(max_length=100, null=True, blank=True)
    rating = models.CharField(max_length=100, null=True, blank=True)
    total_rating = models.CharField(max_length=100, null=True, blank=True)
    image_url = models.URLField()
    booking_url = models.CharField(max_length=100, null=True, blank=True)
    hotel_url = models.CharField(max_length=100, null=True, blank=True)
    trip = models.ForeignKey('Trip', on_delete=models.CASCADE)
    
    
class Itinerary(models.Model):
    itinerary = ArrayField(models.CharField(max_length=500), blank=True, default=list)
    trip = models.ForeignKey('Trip', on_delete=models.CASCADE)
    
    
class LocalDelicacy(models.Model):
    name = models.CharField(max_length=250)
    image_url = models.URLField()
    site = models.ForeignKey('Site', on_delete=models.CASCADE)
    
    
class PurchaseTrip(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    trip = models.ForeignKey('Trip', on_delete=models.CASCADE)
    price = models.IntegerField()
    purchase_date = models.DateField()
    
    
class Site(models.Model):
    name = models.CharField(max_length=100)
    place_id = models.CharField(max_length=100,null=True, blank=True)
    latitude = models.CharField(max_length=100,null=True, blank=True)
    longitude = models.CharField(max_length=100,null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    image_url = models.URLField(null=True, blank=True, max_length=500)
    trip = models.ForeignKey('Trip', on_delete=models.CASCADE)

    
class Subscription(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    subscription_date = models.DateField(default=timezone.now)
    end_date = models.DateField()
    type = models.ForeignKey('SubscriptionType', on_delete=models.CASCADE)
    
    
class SubscriptionType(models.Model):
    name = models.CharField(max_length=100)
    
    
class TravelPreference(models.Model):
    type = models.CharField(max_length=100)
    cost = models.IntegerField()
    trip = models.ForeignKey('Trip', on_delete=models.CASCADE)
    
    
class Trip(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    current_location = models.CharField(max_length=200)
    destination = models.CharField(max_length=200)
    destination_id = models.CharField(max_length=200, null=True, blank=True)
    start_date = models.DateField()
    end_date = models.DateField()
    no_of_people = models.IntegerField(null=True,blank=True)
    budget = models.IntegerField(null=True,blank=True)
    currency = models.CharField(max_length=200, null=True,blank=True)
    
    