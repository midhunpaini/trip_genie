from django.urls import path
from .views import *


urlpatterns = [
    path('register',RegisterView.as_view(), name='register' ), 
    path('login',Login.as_view(), name='login' ), 
    path('admin_login',AdminLogin.as_view(), name='admin_login' ), 
    path('user',UserViews.as_view(), name='user' ), 
    path('logout',LogoutView.as_view(), name='logout' ),
    path('trips',UserTripView.as_view(), name='trips' ), 
    path('delete_trip',DeleteTripView.as_view(), name='delete_trip' ), 
    path('users',AllUsersView.as_view(), name='users' ), 
    path('block',ChangeUserStaus.as_view(), name='block'), 
    path('data',GetSiteData.as_view(), name='data'), 
    path('fake',FakeDataView.as_view(), name='fake'), 
       
]
