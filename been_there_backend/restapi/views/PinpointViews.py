from ..models import Pinpoint
from rest_framework import viewsets
from been_there_backend.restapi.serializers import PinpointSerializer
from rest_framework.decorators import api_view
from django.core.serializers import serialize
from rest_framework.response import Response
from rest_framework import status

#
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
                      fields=('name', 'rating', 'review', 'reviewer', 'reviewerName')
                      ),
            status=status.HTTP_200_OK
        )

    return Response({}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def create_pinpoint(request):
    name = request.data['name']
    rating = request.data['rating']
    review = request.data['review']
    reviewer = request.data['reviewer']
    x = request.data['x']
    y = request.data['y']

    if name and rating and review and reviewer and x and y:
        pinpoint = Pinpoint.objects.create(
            name=name,
            rating=rating,
            review=review,
            reviewer=reviewer,
            x=x,
            y=y,
        )

        if pinpoint:
            pinpoint.save()
            return Response({}, status=status.HTTP_200_OK)

    return Response({}, status=status.HTTP_400_BAD_REQUEST)
