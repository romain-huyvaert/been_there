from rest_framework import serializers
from .models import User, Pinpoint, Review, WorldMap


class UserSerializer(serializers.HyperlinkedModelSerializer):
    friends = serializers.HyperlinkedModelSerializer(
        many=True
    )

    class Meta:
        model = User
        fields = ['username', 'email', 'name', 'friends']


class PinpointSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Pinpoint
        fields = ['category', 'x', 'y', 'address', 'title', 'owner_id']


class ReviewSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Review
        fields = ['rating', 'text', 'date', 'time', 'pinpoint_id']


class WorldMapSerializer(serializers.HyperlinkedModelSerializer):
    filter = serializers.HyperlinkedModelSerializer(
        many=True
    )

    cities = serializers.HyperlinkedModelSerializer(
        many=True
    )

    countries = serializers.HyperlinkedModelSerializer(
        many=True
    )

    class Meta:
        model = WorldMap
        fields = ['x', 'y', 'filter', 'cities', 'countries']
