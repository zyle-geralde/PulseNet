from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('api/sampledata/', views.sample_data, name='sample_data'),
    path('csrf-token/', views.csrf_token_view, name='csrf-token'),
    path('api/signup/',views.signUp,name = "signUp"),
    path('api/login/',views.logIn,name = 'logIn'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/allpost/',views.allpostview,name='allpostview'),
    path('api/createPost/',views.createPost,name = "createPost")
]
