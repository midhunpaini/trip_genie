from django.urls import path
from .views import *


urlpatterns = [
    path('gpt',GPTView.as_view(), name='gpt' ),
]