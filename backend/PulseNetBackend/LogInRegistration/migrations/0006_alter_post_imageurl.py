# Generated by Django 5.1.3 on 2024-12-23 09:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('LogInRegistration', '0005_alter_post_imageurl'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='imageUrl',
            field=models.CharField(blank=True, max_length=1000, null=True),
        ),
    ]
