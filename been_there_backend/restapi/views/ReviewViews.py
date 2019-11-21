from ..models import Review, User, Pinpoint
from rest_framework.decorators import api_view
from django.core.serializers import serialize
from rest_framework.response import Response
from rest_framework import status
from datetime import date
import time
from django.contrib.gis.geos import GEOSGeometry


@api_view(['GET'])
def review_list(request):
    """Send all the reviews stored in the database"""
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
    """Inserting a review from POST data"""

    request_point = GEOSGeometry('POINT(' + request.data['point'][0] + ' ' + request.data['point'][1] + ')', srid=4326)
    point = None

    title           = request.data['name']
    rating          = request.data['rating']
    text            = request.data['review']
    current_date    = date.today().strftime("%Y-%m-%d")
    current_time    = time.strftime("%H:%M:%S")
    user            = User.objects.get(id=1)
    searched_points = Pinpoint.objects.all()

    for search_point in searched_points:
        if search_point.point == request_point:
            point = search_point
            break

    # TODO : Remove the for loop and use the regular Pinpoint.objects.filter() function of Django instead

    if title and rating and text and date and time and user and point is not None:

        review_object = Review.objects.create(
            title=title,
            rating=rating,
            text=text,
            date=current_date,
            time=current_time,
            user=user,
            point=point
        )

        if review_object:
            review_object.save()
            return Response({}, status=status.HTTP_200_OK)

    return Response({}, status=status.HTTP_400_BAD_REQUEST)
