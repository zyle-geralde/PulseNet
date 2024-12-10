from django.urls import path
from . import views

urlpatterns = [
    path('api/sampledata/', views.sample_data, name='sample_data'),
    path('csrf-token/', views.csrf_token_view, name='csrf-token'),
    path('api/signup/',views.signUp,name = "signUp")
]
