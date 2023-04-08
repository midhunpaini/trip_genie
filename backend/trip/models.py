from django.db import models
from django.utils import timezone
from users.models import User
# Create your models here.
from django.db import models

class Hotel(models.Model):
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=100)
    image_url = models.URLField()
    site = models.ForeignKey('Site', on_delete=models.CASCADE)
    
    
class Itinerary(models.Model):
    day = models.IntegerField()
    description = models.TextField()
    trip = models.ForeignKey('Trip', on_delete=models.CASCADE)
    
    
class LocalDelicacy(models.Model):
    name = models.CharField(max_length=100)
    image_url = models.URLField()
    site = models.ForeignKey('Site', on_delete=models.CASCADE)
    
    
class PurchaseTrip(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    trip = models.ForeignKey('Trip', on_delete=models.CASCADE)
    price = models.IntegerField()
    purchase_date = models.DateField()
    
    
class Site(models.Model):
    name = models.CharField(max_length=100)
    location = models.CharField(max_length=100)
    description = models.TextField()
    image_url = models.URLField()
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
    current_location = models.CharField(max_length=100)
    destination = models.CharField(max_length=100)
    start_date = models.DateField()
    end_date = models.DateField()
    budget = models.IntegerField()
    