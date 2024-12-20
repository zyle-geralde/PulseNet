# Generated by Django 5.1.3 on 2024-12-20 01:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('LogInRegistration', '0002_alter_customeruser_password'),
    ]

    operations = [
        migrations.AddField(
            model_name='customeruser',
            name='imageurl',
            field=models.CharField(default='images/userhold.png', max_length=1000),
        ),
        migrations.AlterField(
            model_name='customeruser',
            name='address',
            field=models.CharField(default='none', max_length=255),
        ),
        migrations.AlterField(
            model_name='customeruser',
            name='age',
            field=models.CharField(default='0', max_length=255),
        ),
        migrations.AlterField(
            model_name='customeruser',
            name='email',
            field=models.CharField(default='none', max_length=255),
        ),
        migrations.AlterField(
            model_name='customeruser',
            name='firstname',
            field=models.CharField(default='none', max_length=255),
        ),
        migrations.AlterField(
            model_name='customeruser',
            name='gender',
            field=models.CharField(default='none', max_length=255),
        ),
        migrations.AlterField(
            model_name='customeruser',
            name='lastname',
            field=models.CharField(default='none', max_length=255),
        ),
        migrations.AlterField(
            model_name='customeruser',
            name='password',
            field=models.CharField(default='none', max_length=1000),
        ),
    ]
