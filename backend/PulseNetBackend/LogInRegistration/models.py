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


class Post(models.Model):
    userId = models.ForeignKey(CustomerUser,on_delete=models.CASCADE)
    caption = models.TextField(default = "This is a default text")
    imageUrl = models.CharField(max_length=1000,null=True,blank=True)
    dateUpdated = models.DateTimeField(auto_now=True)
    likes = models.ManyToManyField(CustomerUser,related_name="customer_likes")


    def __str__(self):
        return f"{self.imageUrl} by {self.dateUpdated}"
    
class Comments(models.Model):
    userId = models.ForeignKey(CustomerUser,on_delete=models.CASCADE)
    postId = models.ForeignKey(Post,on_delete=models.CASCADE)
    comment = models.TextField(default="default comment")
    dateCreated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Id no. {self.id}"


    

