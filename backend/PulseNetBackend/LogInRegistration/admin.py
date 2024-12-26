from django.contrib import admin
from .models import CustomerUser,Post,Comments
# Register your models here.
admin.site.register(CustomerUser)
admin.site.register(Post)
admin.site.register(Comments)
