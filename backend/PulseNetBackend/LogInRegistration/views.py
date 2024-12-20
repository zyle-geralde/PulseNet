from django.shortcuts import render
import json
from django.http import JsonResponse
from django.middleware.csrf import get_token
from django.views.decorators.csrf import csrf_protect, csrf_exempt
from django.views.decorators.csrf import ensure_csrf_cookie  #set CSRF cookie if not set
from .models import CustomerUser,Post
from django.contrib.auth.hashers import make_password,check_password
from rest_framework_simplejwt.tokens import RefreshToken,AccessToken

# Create your views here.


def validate_access_token(request):
    auth_header = request.headers.get('Authorization')
    if not auth_header:
        return {"status": False, "message": "Invalid"}
    
    try:
        token_type, access_token = auth_header.split()
        if token_type.lower() != "bearer":
            return {"status": False, "message": "Invalid"}
    except ValueError:
        return {"status": False, "message": "Invalid"}
    
    if access_token.strip() == "null" or access_token.strip() == "":
        return {"status": False, "message": "Invalid"}
    
    try:
        token = AccessToken(access_token)
        user_id = token["user_id"]  
        return {"status": True, "user_id": user_id}  
    except Exception as e:
        return {"status": False, "message": "Expired access token"}

def csrf_token_view(request):
    #send the CSRF token to the frontend
    return JsonResponse({'csrftoken': get_token(request)})


#ensure CSRF cookie is set on the first request
def sample_data(request):
    if request.method == "POST":
        token_check = validate_access_token(request)

        if not token_check["status"]:
            return JsonResponse({"message": token_check["message"]})
        try:
        
            data = json.loads(request.body)
            password = data.get("password")
            email = data.get("email")

            print(data)

            
            return JsonResponse({"message":"Successful","data":data})
        
        except Exception as e:
            return JsonResponse({"message":"error","message":str(e)})
        
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

            if CustomerUser.objects.filter(email=email).exists():
                return JsonResponse({"message": "User already exists"})
            
            hashed_password = make_password(password)

            createdUser = CustomerUser(
                firstname = firstname,
                lastname = lastname,
                age = age,
                gender = gender,
                address = address,
                email = email,
                password = hashed_password
            )
            createdUser.save()

            return JsonResponse({"message":"Successfully created User"})
        except Exception:
            return JsonResponse({"message":"Unexpected error occured"})
        
    else:
        return JsonResponse({"message":"not a Post request"})
    

def logIn(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            email = data.get("email")
            password = data.get("password")

            if CustomerUser.objects.filter(email = email).exists():
                user = CustomerUser.objects.get(email = email)

                if check_password(password, user.password):
                    refresh = RefreshToken.for_user(user)
                    return JsonResponse({
                        "message": "Login Successful",
                        "access": str(refresh.access_token),
                        "refresh": str(refresh),
                        "userId": user.id
                    })
                else:
                    return JsonResponse({"message": "Invalid Credentails"})

            else:
                return JsonResponse({"message":"Invalid Credentails"})

        except Exception:
            return JsonResponse({"message":"Unxpected Error occured",})
        
def allpostview(request):
    if request.method == "POST":
        try:
            token_check = validate_access_token(request)

            if not token_check["status"]:
                return JsonResponse({"message": token_check["message"]})
            

            data = json.loads(request.body)
            userId = data.get('userId')

            userRef = CustomerUser.objects.get(id = int(userId))
            allpost = Post.objects.all()

            passarray = []
            for i in allpost:
                inLike = i.likes.filter(id=userRef.id).exists()
                likescount = i.likes.count()

                holdjson = {'fullname': i.userId.firstname + " " +i.userId.lastname, 
                            'dateCreated':  i.dateUpdated, 
                            'caption': i.caption,
                            'imageurl': i.imageUrl,
                            'liked': str(inLike), 
                            'countLike': str(likescount),
                            'userPosted':str(i.userId.id),
                            'profimage':i.userId.imageurl}
                
                passarray.append(holdjson)

            return JsonResponse({"message": "Successful","jsondata":passarray})
        except Exception as e:
            return JsonResponse({"message":"error","message":str(e)})
        
    return JsonResponse({"status":"error","message":"Invalid Request"})


def createPost(request):

    return JsonResponse({"message":"Successful"})



