from django.shortcuts import render
import json
from django.http import JsonResponse

# Create your views here.

def sample_data(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            password = data.get("password")
            email = data.get("email")

            
            return JsonResponse({"status":"Successful","data":{email,password}})
        
        except Exception as e:
            return JsonResponse({"status":"error","message":str(e)})
        
    return JsonResponse({"status":"error","message":"Invalid Request"})

