from ..models import Pinpoint
from rest_framework.decorators import api_view
from django.core.serializers import serialize
from rest_framework.response import Response
from rest_framework import status

# class PinpointViewSet(viewsets.ModelViewSet):
#     """
#     API endpoint that allows pinpoints to be viewed or edited.
#     """
#     queryset = Pinpoint.objects.all()
#     serializer_class = PinpointSerializer


@api_view(['GET'])
def pinpoint_list(request):
    """Get the list of all pinpoints : return GEOJSON format"""
    pinpoints = Pinpoint.objects.all()

    if pinpoints:
        return Response(
            serialize('geojson',
                      pinpoints,
                      geometry_field='point',
                      ),
            status=status.HTTP_200_OK
        )

    return Response({}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def insert_pinpoint(request):
    point = 'POINT(' + request.data['point'][0] + ' ' + request.data['point'][1] + ')'

    if point:
        pinpoint = Pinpoint.objects.create(
            point=point
        )

        if pinpoint:
            pinpoint.save()
            return Response({}, status=status.HTTP_200_OK)

    return Response({}, status=status.HTTP_400_BAD_REQUEST)
