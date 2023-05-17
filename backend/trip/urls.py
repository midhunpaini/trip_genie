from django.urls import path
from .views import *


urlpatterns = [
    path('gpt',GPTView.as_view(), name='gpt' ),
    path('places',PlaceView.as_view(), name='places' ),
    path('set_destination',SetDestinationView.as_view(), name='set_destination' ),
    path('activities',ActivitiesView.as_view(), name='activities' ),
    path('booking',BookingView.as_view(), name='booking' ),
    path('delicacy',LocalDelicacyView.as_view(), name='delicacy' ),
    path('travel_options',TravelOptionsView.as_view(), name='travel_options' ),
    path('save_trip',SaveTripView.as_view(), name='save_trip' ),
]