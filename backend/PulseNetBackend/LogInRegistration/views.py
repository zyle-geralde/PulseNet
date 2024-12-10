from django.shortcuts import render
import json
from django.http import JsonResponse
from django.middleware.csrf import get_token
from django.views.decorators.csrf import csrf_protect, csrf_exempt
from django.views.decorators.csrf import ensure_csrf_cookie  #set CSRF cookie if not set

# Create your views here.

def csrf_token_view(request):
    #send the CSRF token to the frontend
    return JsonResponse({'csrftoken': get_token(request)})


#ensure CSRF cookie is set on the first request
def sample_data(request):
    if request.method == "POST":
        try:
        
            data = json.loads(request.body)
            password = data.get("password")
            email = data.get("email")

            print(data)

            
            return JsonResponse({"status":"Successful","data":data})
        
        except Exception as e:
            return JsonResponse({"status":"error","message":str(e)})
        
    return JsonResponse({"status":"error","message":"Invalid Request"})


def signUp(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            firstname = data.get("firstname")
            lastname = data.get("lastname")
            age = data.get("age")
            gender = data.get("gender")
            address=data.get("address")
            email = data.get("email")
            password = data.get("password")

            print(data)

            return JsonResponse({"message":"Successful"})


        except Exception:
            return JsonResponse({"error":"Unexpected error occured"})

