from ..models import WorldMap
from rest_framework import viewsets
from ..serializers import WorldMapSerializer
from rest_framework.decorators import api_view
from django.core.serializers import serialize
from rest_framework.response import Response
from rest_framework import status


@api_view(['GET'])
def worldmap_list(request):
    worldmap = WorldMap.objects.all()
    serializer = WorldMapSerializer(worldmap, many=True)
    if worldmap:
        return Response(data=serializer.data, status=status.HTTP_200_OK)

    return Response({}, status=status.HTTP_400_BAD_REQUEST)
