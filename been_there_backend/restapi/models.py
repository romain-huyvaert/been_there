from django.db import models


"""
Class User
Custom user model that takes differents fields in consideration
for the needs of the project.
"""
class User(models.Model):
    username = models.CharField(null=False, max_length=50)
    email = models.EmailField(null=False, unique=True)
    name = models.CharField(null=False, max_length=100)
    friends = models.ForeignKey('self', on_delete=models.CASCADE)


"""
Class Pinpoint
"""
class Pinpoint(models.Model):
    category    = models.CharField(null=False, max_length=50)
    x           = models.FloatField(null=False)
    y           = models.FloatField(null=False)
    address     = models.CharField(null=False, max_length=255)
    title       = models.CharField(null=False, max_length=50)
    owner_id    = models.ForeignKey(User, on_delete=models.CASCADE)


"""
Class Review
"""
class Review(models.Model):
    rating      = models.IntegerField(null=False)
    text        = models.CharField(max_length=500)
    date        = models.DateField(null=False)
    time        = models.TimeField(null=False)
    pinpoint_id = models.ForeignKey(Pinpoint, on_delete=models.CASCADE)
    #TODO picture storage


"""
Class WorldMap
"""
class WorldMap(models.Model):
    x       = models.FloatField(null=False)
    y       = models.FloatField(null=False)
    filter  = models.ForeignKey(User, on_delete=models.CASCADE)
    cities  = models.CharField(max_length=30)
    country = models.CharField(max_length=55)
