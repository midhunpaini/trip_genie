from django.urls import path
from .views import *


urlpatterns = [
    path('register',RegisterView.as_view(), name='register' ), 
    path('login',Login.as_view(), name='login' ), 
    path('user',UserViews.as_view(), name='user' ), 
    path('logout',LogoutView.as_view(), name='logout' ),
    path('trips',UserTripView.as_view(), name='trips' ), 
    path('delete_trip',DeleteTripView.as_view(), name='delete_trip' ), 
       
]
