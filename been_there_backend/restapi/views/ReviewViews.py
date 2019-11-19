from ..models import Review, Pinpoint
from rest_framework import viewsets
from rest_framework.decorators import api_view
from django.core.serializers import serialize
from ..serializers import ReviewSerializer
from rest_framework.response import Response
from rest_framework import status
from .PinpointViews import create_pinpoint


@api_view(['GET'])
def review_list(request):

    reviews = Review.objects.all()
    if reviews:
        return Response(
            serialize('geojson',
                      reviews,
                      geometry_field='point',
                      fields=('title', 'rating', 'text', 'date', 'time', 'user', 'point')),
            status=status.HTTP_200_OK)

    return Response({}, status=status.HTTP_200_OK)



@api_view(['POST'])
def insert_review(request):
    """Create a review from POST data"""

    title   = request.data['title']
    rating  = request.data['rating']
    text    = request.data['text']
    date    = request.data['date']
    time    = request.data['time']
    user    = request.data['user']
    point   = request.data['point']

    if title and rating and text and date and time and user and point:

        existing_pinpoint = Pinpoint.objects.get(point=point)
        if not existing_pinpoint:
            create_pinpoint(request)

        review_object = Review.objects.create(
            title=title,
            rating=rating,
            text=text,
            date=date,
            time=time,
            user=user,
            point=point
        )

        if review_object:
            review_object.save()
            return Response({}, status=status.HTTP_200_OK)

    return Response({}, status=status.HTTP_400_BAD_REQUEST)
