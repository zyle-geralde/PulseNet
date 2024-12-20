from django.db import models

# Create your models here.

class CustomerUser(models.Model):
    firstname = models.CharField(max_length=255,default="none")
    lastname = models.CharField(max_length=255,default="none")
    age = models.CharField(max_length=255,default="0")
    gender = models.CharField(max_length=255,default="none")
    address = models.CharField(max_length=255,default="none")
    email = models.CharField(max_length=255,default="none")
    password = models.CharField(max_length=1000,default="none")
    imageurl = models.CharField(max_length=1000,default="images/userhold.png")
