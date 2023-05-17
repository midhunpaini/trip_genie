from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from .models import User
from .serializer import UserSerializers
import jwt, datetime
from trip_genie.settings import JWT_CODE
from rest_framework.throttling import UserRateThrottle
from django.db.models import Prefetch
from trip.models import *
from trip.serializers import *




class RegisterView(APIView):
    throttle_classes = [UserRateThrottle]
  
    def post(self,request):
        serializer = UserSerializers(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            errors = serializer.errors
            return Response(errors, status=400)

    
class Login(APIView):
    throttle_classes = [UserRateThrottle]
    def post(self, request):
        email = request.data['email']
        password = request.data['password']
        user = User.objects.filter(email=email).first()
        
        if user is None:
            raise AuthenticationFailed('User not Found')
            
        
        if not user.check_password(password):
            raise AuthenticationFailed('Incorrect Password')
        
        payload = {
            'id':user.id,
            'exp':datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
            'iat':datetime.datetime.utcnow()
        }
        
        token = jwt.encode(payload, 'secret', algorithm='HS256')
        
        response = Response()
        response.set_cookie(key='jwt', value=token, httponly=True)
        response.data = {
            'jwt':token,
            'message':True,
            'name':user.name
        }
        return response
    
    
class UserViews(APIView):
    def get(self, request):
        token = request.COOKIES.get('jwt')
        if not token:
            raise AuthenticationFailed('Unauthenticated')
        
        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
            print(payload)
            print(token)
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated')
        
        user = User.objects.filter(id=payload['id']).first()
        
        print('user calling')
        serializer = UserSerializers(user)
        return Response(serializer.data)
    

class LogoutView(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie('jwt')
        response.data = {
            'message':'success'
        }
        return response
    



class UserTripView(APIView):
    def get(self, request):
        token = request.COOKIES.get('jwt')

        if not token:
            raise AuthenticationFailed('Unauthenticated')

        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated')

        user = User.objects.filter(id=payload['id']).first()

        trips = Trip.objects.filter(user=user, is_save=True).prefetch_related(
            Prefetch('local_delicacy', queryset=LocalDelicacy.objects.all()),
            Prefetch('itineraries', queryset=Itinerary.objects.all()),
            Prefetch('sites', queryset=Site.objects.all()),
            Prefetch('travel_options', queryset=TravelOption.objects.all()),
            Prefetch('hotels', queryset=Hotel.objects.all()),
        )

        serializer = TripSerializer(trips, many=True)
        data = serializer.data

  
        for i, trip_data in enumerate(data):
            itinerary = trips[i].itineraries.all()
            sites = trips[i].sites.all()
            hotels = trips[i].hotels.all()
            local_delicacy = trips[i].local_delicacy.all()
            travel_options = trips[i].travel_options.all()
            itinerary_serializer = ItinerarySerializer(itinerary, many=True)
            sites_serializer = SiteSerializer(sites, many=True)
            hotel_serializer = HotelSerializer(hotels, many=True)
            local_delicacy_serializer = LocalDelicacySerializer(local_delicacy, many=True)
            travel_option_serializer = TravelOptionSerializer(travel_options, many=True)
            data[i]['local_delicacy'] = local_delicacy_serializer.data
            data[i]['hotels'] = hotel_serializer.data
            data[i]['itinerary'] = itinerary_serializer.data
            data[i]['places'] = sites_serializer.data
            data[i]['travel_options'] = travel_option_serializer.data

        return Response(data)
    


class DeleteTripView(APIView):
    def post(self, request):
        trip_id = request.data['tripId']
        trip = Trip.objects.get(id=trip_id)
        trip.is_save = False
        trip.save()

        return Response({'message:success'})
