from .models import User, Pinpoint, Review, WorldMap
from rest_framework import viewsets
from been_there_backend.restapi.serializers import UserSerializer, PinpointSerializer, ReviewSerializer, WorldMapSerializer


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer


class PinpointViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows pinpoints to be viewed or edited.
    """
    queryset = Pinpoint.objects.all()
    serializer_class = PinpointSerializer


class ReviewViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows reviews to be viewed or edited.
    """
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer


class WorldMapViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows world map data to be viewed or edited.
    """
    queryset = WorldMap.objects.all()
    serializer_class = WorldMapSerializer
