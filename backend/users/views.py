from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed, PermissionDenied
from .models import User
from .serializer import UserSerializers
import jwt
from django.db.models import Count
import datetime
from trip_genie.settings import JWT_CODE
from rest_framework.throttling import UserRateThrottle
from django.db.models import Prefetch
from trip.models import *
from trip.serializers import *
from django.db.models.functions import ExtractMonth
import calendar
from rest_framework.permissions import IsAuthenticated
import random


class RegisterView(APIView):
    throttle_classes = [UserRateThrottle]

    def post(self, request):

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
            'id': user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
            'iat': datetime.datetime.utcnow()
        }

        token = jwt.encode(payload, 'secret', algorithm='HS256')

        response = Response()
        response.set_cookie(key='jwt', value=token, httponly=True)
        response.data = {
            'jwt': token,
            'message': True,
            'name': user.name,
            'is_superuser': user.is_superuser
        }
        return response


class UserViews(APIView):
    def get(self, request):

        token = request.COOKIES.get('jwt')
        if not token:
            raise PermissionDenied('Unauthenticated')

        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])

        except jwt.ExpiredSignatureError:
            raise PermissionDenied('Unauthenticated')

        user = User.objects.filter(id=payload['id']).first()

        if not user:
            raise PermissionDenied('User not found')

        serializer = UserSerializers(user)
        return Response(serializer.data)


class LogoutView(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie('jwt')
        response.data = {
            'message': 'success'
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
            local_delicacy_serializer = LocalDelicacySerializer(
                local_delicacy, many=True)
            travel_option_serializer = TravelOptionSerializer(
                travel_options, many=True)
            data[i]['local_delicacy'] = local_delicacy_serializer.data
            data[i]['hotels'] = hotel_serializer.data
            data[i]['itinerary'] = itinerary_serializer.data
            data[i]['places'] = sites_serializer.data
            data[i]['travel_options'] = travel_option_serializer.data

        return Response(data)


class DeleteTripView(APIView):
    def post(self, request):
        token = request.COOKIES.get('jwt')
        try:
            jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated')
        except jwt.DecodeError:
            raise AuthenticationFailed('Invalid token')
        trip_id = request.data['tripId']
        trip = Trip.objects.get(id=trip_id)
        trip.is_save = False
        trip.save()

        return Response({'message:success'})


class AllUsersView(APIView):
    def get(self, request):

        token = request.COOKIES.get('jwt')

        if not token:
            raise AuthenticationFailed('Unauthenticated')
        try:
            jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated')
        except jwt.exceptions.DecodeError:
            raise AuthenticationFailed('Invalid token')

        users = User.objects.filter(is_superuser=False)
        serializer = UserSerializers(users, many=True)
        return Response(serializer.data)


class ChangeUserStaus(APIView):
    def post(self, request):
        token = request.COOKIES.get('jwt')
        id = request.data['id']

        if not token:
            raise AuthenticationFailed('Unauthenticated')
        try:
            jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated')
        except jwt.DecodeError:
            raise AuthenticationFailed('Invalid token')

        user = User.objects.get(id=id)
        if user.is_active:
            user.is_active = False
        else:
            user.is_active = True

        user.save()

        return Response({'user': False})


class AdminLogin(APIView):
    throttle_classes = [UserRateThrottle]

    def post(self, request):
        email = request.data['email']
        password = request.data['password']
        user = User.objects.filter(email=email, is_superuser=True).first()

        if user is None:
            raise AuthenticationFailed('User not Found')

        if not user.check_password(password):
            raise AuthenticationFailed('Incorrect Password')

        payload = {
            'id': user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
            'iat': datetime.datetime.utcnow()
        }

        token = jwt.encode(payload, 'secret', algorithm='HS256')

        response = Response()
        response.set_cookie(key='jwt', value=token, httponly=True)
        response.data = {
            'jwt': token,
            'message': True,
            'name': user.name,
            'is_superuser': user.is_superuser
        }
        return response


class GetSiteData(APIView):
    def get(self, request):

        token = request.COOKIES.get('jwt')

        if not token:
            raise AuthenticationFailed('Unauthenticated')
        try:
            jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated')
        except jwt.DecodeError:
            raise AuthenticationFailed('Invalid token')

        date = datetime.datetime.now() - datetime.timedelta(hours=24)
        week_before = datetime.datetime.now() - datetime.timedelta(days=7)
        total_users = User.objects.filter(is_superuser=False).count()

        active_new_users = User.objects.filter(
            date_joined__gte=date, is_superuser=False).count()

        increase_in_users = int((active_new_users/total_users)*100)

        active_users = User.objects.filter(
            last_login__gt=week_before, is_superuser=False).count()
        
        new_users = User.objects.filter(
            date_joined__gte=week_before, is_superuser=False).count()
        
        active_users_percentage = int((active_users/total_users)*100)

        current_year = timezone.now().year

        total_trip_count = Trip.objects.all().count()

        increase_in_trip_no = Trip.objects.filter(end_date__gte=week_before).count() 

        increase_in_trip_percentage = int((increase_in_trip_no/total_trip_count)*100)

        increase_in_all_users = int((new_users/total_users)*100)

        group_types = ["Friends", "Family", "Couple", "Solo", "Business"]

        data_set = []
        monthly_data = (
            Trip.objects
            .filter(end_date__year=current_year)
            .annotate(month=ExtractMonth('end_date'))
            .values('month', 'group_type')
            .annotate(count=Count('id'))
        )

        color_mapping = {
            'Friends': 'hsl(0, 70%, 50%)',
            'Family': 'hsl(60, 70%, 50%)',
            'Couple': 'hsl(120, 70%, 50%)',
            'Solo': 'hsl(180, 70%, 50%)',
            'Business': 'hsl(240, 70%, 50%)',
        }

        for group_type in group_types:
            month_data = {
                'id': group_type,
                'color': color_mapping.get(group_type, 'hsl(0, 0%, 0%)'),
                'data': [],
            }
            data_set.append(month_data)

        for month in monthly_data:
            group_type = month['group_type']
            month_name = calendar.month_abbr[month['month']]
            month_data = next(
                (data for data in data_set if data['id'] == group_type), None)
            if month_data:
                month_data['data'].append(
                    {'x': month_name, 'y': month['count']})

        # Sort the data within each group_type entry based on the month order
        for data in data_set:
            data['data'] = sorted(data['data'], key=lambda d: list(
                calendar.month_abbr).index(d['x']))

        code = 10
        dietery_preference_counts = Trip.objects.values(
            'dietery_preference').annotate(count=Count('dietery_preference'))
        dietery_data = []
        for entry in dietery_preference_counts:
            preference = {}
            preference['id'] = entry['dietery_preference']
            preference['label'] = entry['dietery_preference']
            preference['value'] = entry['count']
            preference['color'] = 'hsl(104, 70%, 50%)'
            dietery_data.append(preference)
            code += 10

        country_visits = Trip.objects.values(
            'country_code').annotate(count=Count('country_code'))
        country_data = []
        for country in country_visits:
            preference = {}
            preference['id'] = country['country_code']
            preference['value'] = country['count']
            country_data.append(preference)

        data = {
            'new': active_new_users,
            'increase': increase_in_users,
            'active_users': active_users,
            'active_users_percentage': active_users_percentage,
            'total_trips': total_trip_count,
            'group_type': data_set,
            'diet_data': dietery_data,
            'country_data': country_data,
            'all_users': total_users,
            'increase_in_all_users': increase_in_all_users,
            'increase_in_trip_percentage':increase_in_trip_percentage,
        }

        return Response(data)


