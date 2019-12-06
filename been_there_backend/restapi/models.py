from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from django.contrib.gis.db import models as gis_models

"""
Class User
Custom user model that takes differents fields in consideration
for the needs of the project.
"""
class User(models.Model):
    username = models.CharField(null=False, max_length=50, unique=True)
    email = models.EmailField(null=False, unique=True)
    name = models.CharField(null=False, max_length=100)
    friends = models.TextField(null=True)

"""
Class Review : Review and Pinpoint merged in one table, request on click or all data ?
"""
class Review(models.Model):
    title       = models.CharField(null=False, max_length=80)
    rating      = models.IntegerField(null=False)
    text        = models.CharField(max_length=500)
    date        = models.DateField(null=False)
    time        = models.TimeField(null=False)
    user        = models.ForeignKey(User, related_name='fk_user', on_delete=models.CASCADE)
    username    = models.ForeignKey(User, to_field='username', related_name='fk_username', on_delete=models.CASCADE)
    point       = gis_models.PointField(null=False, spatial_index=True, geography=True)
    #TODO picture storage


# """
# Class Pinpoint
# """
# class Pinpoint(models.Model):
#     point = gis_models.PointField(null=False, spatial_index=True, geography=True, unique=True)
#
#
# """
# Class Review
# """
# class Review(models.Model):
#     title       = models.CharField(null=False, max_length=80)
#     rating      = models.IntegerField(null=False)
#     text        = models.CharField(max_length=500, unique=True)
#     date        = models.DateField(null=False)
#     time        = models.TimeField(null=False)
#     user        = models.ForeignKey(User, on_delete=models.CASCADE)
#     point       = models.ForeignKey(Pinpoint, to_field='point', on_delete=models.CASCADE)
#     #TODO picture storage


"""
Class WorldMap
"""
class WorldMap(models.Model):
    x       = models.FloatField(null=False)
    y       = models.FloatField(null=False)
    filter  = models.ForeignKey(User, on_delete=models.CASCADE)
    cities  = models.CharField(max_length=30)
    country = models.CharField(max_length=55)
