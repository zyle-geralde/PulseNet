from django.urls import path
from . import views

urlpatterns = [
    path('api/sampledata/', views.sample_data, name='sample_data'),
]
