from django.shortcuts import render
import json
import uuid
from django.http import JsonResponse
from django.middleware.csrf import get_token
from django.views.decorators.csrf import csrf_protect, csrf_exempt
from django.views.decorators.csrf import ensure_csrf_cookie  #set CSRF cookie if not set
from .models import CustomerUser,Post,Comments
from django.contrib.auth.hashers import make_password,check_password
from rest_framework_simplejwt.tokens import RefreshToken,AccessToken
from django.conf import settings
import os

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
            print(token_check)

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
                            'profimage':i.userId.imageurl,
                            'postId':str(i.id)}
                
                passarray.append(holdjson)

            return JsonResponse({"message": "Successful","jsondata":passarray})
        except Exception as e:
            return JsonResponse({"message":"error","message":str(e)})
        
    return JsonResponse({"status":"error","message":"Invalid Request"})


def createPost(request):
    if request.method == "POST":

        token_check = validate_access_token(request)
        print(token_check)

        if not token_check["status"]:
            return JsonResponse({"message": token_check["message"]})
    
        caption = request.POST.get("caption")
        imageUrl = request.FILES.get("imageUrl")
        userId = request.POST.get("userId")

        print(caption)
        print(imageUrl)
        print(userId)
        if imageUrl:
            frontend_images_path = os.path.abspath(os.path.join(settings.BASE_DIR,'..','..','PulsNetFrontEnd', 'public', 'images'))
            print(frontend_images_path)


            file_extension = os.path.splitext(imageUrl.name)[1]
            unique_name = f"{uuid.uuid4().hex}{file_extension}"

            file_path = os.path.join(frontend_images_path,unique_name)
            print(unique_name)
            print(file_extension)    

            with open(file_path, 'wb+') as destination:
                for chunk in imageUrl.chunks():
                    destination.write(chunk)

            userPosted = CustomerUser.objects.get(id = int(userId))

            savePost = Post(
                userId = userPosted,
                caption = caption,
                imageUrl = f'images/{unique_name}'
            )
            savePost.save()

            return JsonResponse({"message":"Successful"})
        
        userPosted = CustomerUser.objects.get(id = int(userId))

        savePost = Post(
            userId = userPosted,
            caption = caption,
        )
        savePost.save()

        return JsonResponse({"message":"Successful"})
    return JsonResponse({"message":"Invalid request"})

def deletePost(request):
    if request.method == "POST":

        token_check = validate_access_token(request)
        print(token_check)

        if not token_check["status"]:
            return JsonResponse({"message": token_check["message"]})
        
        data = json.loads(request.body)
        postId = data.get("postId")

        delPost = Post.objects.get(id = int(postId))
        delPost.delete()

        return JsonResponse({"message":"Successful"})
    
    return JsonResponse({"message":"Invalid request"})


def editPost(request):
    if request.method == "POST":
        token_check = validate_access_token(request)
        print(token_check)

        if not token_check["status"]:
            return JsonResponse({"message": token_check["message"]})
        
        caption = request.POST.get("caption")
        imageUrl = request.FILES.get("imageUrl")
        postId = request.POST.get("postId")
        imgIndic = request.POST.get("indic")

        postEdit = Post.objects.get(id = int(postId))
        if imgIndic == postEdit.imageUrl:
            postEdit.caption = caption
            print("do not change the image")
        elif imgIndic == "":
            postEdit.caption = caption
            postEdit.imageUrl = None
            print("image should be null")
        else:
            frontend_images_path = os.path.abspath(os.path.join(settings.BASE_DIR,'..','..','PulsNetFrontEnd', 'public', 'images'))
            print(frontend_images_path)


            file_extension = os.path.splitext(imageUrl.name)[1]
            unique_name = f"{uuid.uuid4().hex}{file_extension}"

            file_path = os.path.join(frontend_images_path,unique_name)
            print(unique_name)
            print(file_extension)    

            with open(file_path, 'wb+') as destination:
                for chunk in imageUrl.chunks():
                    destination.write(chunk)

            postEdit.caption = caption
            postEdit.imageUrl = f'images/{unique_name}'
            print("change the image")

        postEdit.save()

        return JsonResponse({"message":"Successful"})
    
    return JsonResponse({"message":"Invalid request"})


def getComments(request):
    if request.method == "POST":
        token_check = validate_access_token(request)
        print(token_check)

        if not token_check["status"]:
            return JsonResponse({"message": token_check["message"]})
        try:
            data = json.loads(request.body)
            postId = data.get("postId")
            print("Post Id comments ",postId)

            allComments = Comments.objects.filter(postId = int(postId))

            comment_list = []
            for nn in allComments:
                holdlist = {
                    'id':str(nn.id),
                    'fullname': nn.userId.firstname + " " + nn.userId.lastname,
                    'dateCreated': nn.dateCreated,
                    'message':nn.comment,
                    'userId':str(nn.userId.id),
                    'postId':str(nn.postId.id),
                    'userImage':nn.userId.imageurl
                }

                comment_list.append(holdlist)

            print(comment_list)
            return JsonResponse({"message":"Successful","result":comment_list})
        except Exception:
            return JsonResponse({"message":"An exception occured"})
    return JsonResponse({"message":"Not a Post request"})

def createComment(request):
    if request.method == "POST":

        token_check = validate_access_token(request)
        print(token_check)

        if not token_check["status"]:
            return JsonResponse({"message": token_check["message"]})
        
        data = json.loads(request.body)
        userId = data.get("userId")
        postId = data.get("postId")
        comment = data.get("comment")

        userGet = CustomerUser.objects.get(id = int(userId))
        postGet = Post.objects.get(id = int(postId))

        createdComment = Comments(
            userId = userGet,
            postId = postGet,
            comment = comment
        )
        createdComment.save()

        return JsonResponse({"message":"Successful"})
    return JsonResponse({"message":"Invalid request"})


def deleteComment(request):
    if request.method == "POST":
        token_check = validate_access_token(request)
        print(token_check)

        if not token_check["status"]:
            return JsonResponse({"message": token_check["message"]})
        
        try:
            data = json.loads(request.body)
            commentId = data.get("commentId")

            delComment = Comments.objects.get(id = int(commentId))
            delComment.delete()

            return JsonResponse({"message":"Successful"})
        except Exception:
            return JsonResponse({"message":"An exception occured"})

        
    return JsonResponse({"message":"Invalid request"})


def editComment(request):
    if request.method == "POST":
        token_check = validate_access_token(request)
        print(token_check)

        if not token_check["status"]:
            return JsonResponse({"message": token_check["message"]})
        
        try:
            data = json.loads(request.body)
            commentId = data.get("commentId")
            message = data.get("message")

            findComment = Comments.objects.get(id = int(commentId))

            findComment.comment = message

            findComment.save()

            return JsonResponse({"message":"Successful"})

        except Exception:
            return JsonResponse({"message":"An exception occured"})

        
    return JsonResponse({"message":"Invalid request"})


def changeLike(request):
    if request.method == "POST":

        token_check = validate_access_token(request)
        print(token_check)

        if not token_check["status"]:
            return JsonResponse({"message": token_check["message"]})
        

        try:
            data = json.loads(request.body)
            postId = data.get("postId")
            userId = data.get("userId")

            postLiked = Post.objects.get(id = int(postId))
            userLiked = CustomerUser.objects.get(id = int(userId))

            if postLiked.likes.filter(id=userLiked.id).exists():
                postLiked.likes.remove(userLiked)
            else:
                postLiked.likes.add(userLiked)

            return JsonResponse({"message":"Successful"})
        except Exception:
            return JsonResponse({"message":"An exception occured"})

    return JsonResponse({"message":"Invalid request"})


def getUserLogged(request):
    if request.method == "POST":

        token_check = validate_access_token(request)
        print(token_check)

        if not token_check["status"]:
            return JsonResponse({"message": token_check["message"]})
        

        data = json.loads(request.body)
        userId = data.get("userId")
        loggedUser = CustomerUser.objects.get(id = int(userId))

        retUser = {
            "firstname":loggedUser.firstname,
            "lastname":loggedUser.lastname,
            "age":loggedUser.age,
            "gender":loggedUser.gender,
            "address":loggedUser.address,
            "imageurl":loggedUser.imageurl,
        }

        return JsonResponse({"message":"Successful","jsondata":retUser})
    
    return JsonResponse({"message":"Invalid request"})


def changeProfileImage(request):
    if request.method == "POST":
       
        token_check = validate_access_token(request)
        print(token_check)

        if not token_check["status"]:
            return JsonResponse({"message": token_check["message"]})
        

        imageUrl = request.FILES.get("imageUrl")
        userId = request.POST.get("userId")

        print("\n\nshow image")
        print(imageUrl)

        if imageUrl:
            frontend_images_path = os.path.abspath(os.path.join(settings.BASE_DIR,'..','..','PulsNetFrontEnd', 'public', 'images'))
            print(frontend_images_path)


            file_extension = os.path.splitext(imageUrl.name)[1]
            unique_name = f"{uuid.uuid4().hex}{file_extension}"

            file_path = os.path.join(frontend_images_path,unique_name)
            print(unique_name)
            print(file_extension)    

            with open(file_path, 'wb+') as destination:
                for chunk in imageUrl.chunks():
                    destination.write(chunk)

            findeUser = CustomerUser.objects.get(id = int(userId))
            findeUser.imageurl = f'images/{unique_name}'
            findeUser.save()
        
        return JsonResponse({"message":"Successful"})

    return JsonResponse({"message":"Invalid request"})


def editUserProfile(request):
    if request.method == "POST":
        token_check = validate_access_token(request)
        print(token_check)

        if not token_check["status"]:
            return JsonResponse({"message": token_check["message"]})
        
        data = json.loads(request.body)
        firstname = data.get("firstname")
        lastname = data.get("lastname")
        gender = data.get("gender")
        age = data.get("age")
        address = data.get("address")
        userId = data.get("userId")

        userHold = CustomerUser.objects.get(id = int(userId))
        
        userHold.firstname = firstname
        userHold.lastname = lastname
        userHold.age = age
        userHold.address = address
        userHold.gender = gender

        userHold.save()
        return JsonResponse({"message":"Successful"})

    return JsonResponse({"message":"Invalid request"})
       




        





