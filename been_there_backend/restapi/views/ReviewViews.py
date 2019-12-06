from ..models import Review, User
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
                      fields=('title', 'rating', 'text', 'date', 'time', 'user')),
            status=status.HTTP_200_OK)

    return Response({}, status=status.HTTP_200_OK)


@api_view(['POST'])
def insert_review(request):
    """Inserting a review from POST data"""

    title           = request.data['name']
    rating          = request.data['rating']
    text            = request.data['review']
    current_date    = date.today().strftime("%Y-%m-%d")
    current_time    = time.strftime("%H:%M:%S")
    user            = User.objects.get(id=request.data['userId'])
    point           = GEOSGeometry('POINT(' + request.data['point'][0] + ' ' + request.data['point'][1] + ')')

    if title and rating and text and date and time and user and point:

        review_object = Review.objects.create(
            title=title,
            rating=rating,
            text=text,
            date=current_date,
            time=current_time,
            user=user,
            point=point,
            username=user,
        )

        if review_object:
            review_object.save()
            return Response({}, status=status.HTTP_200_OK)

    return Response({}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def user_reviews(request):
    """Send reviews of the current user"""
    reviews = Review.objects.filter(user_id=request.data['userId'])
    if reviews:
        return Response(
            serialize('geojson',
                      reviews,
                      geometry_field='point',
                      fields=('title', 'rating', 'text', 'date', 'time', 'user')),
            status=status.HTTP_200_OK)

    return Response({}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def friends_reviews(request):
    """Send reviews of the current user's friends"""
    ids = User.objects.filter(id=request.data['userId']).values_list('friends')
    list_ids = [int(friend_id) for friend_id in ids[0][0].split('-')]
    reviews = Review.objects.filter(user_id__in=list_ids)

    if reviews:
        return Response(
            serialize('geojson',
                      reviews,
                      geometry_field='point',
                      fields=('user_id', 'title', 'rating', 'text', 'date', 'time', 'user')),
            status=status.HTTP_200_OK)

    return Response({}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def delete_review(request):
    """Delete the given review id"""
    review_id = request.data['reviewId']
    user_id = request.data['userId']
    if review_id and user_id:

        review = Review.objects.get(id=review_id)
        if review and review.user_id == user_id:
            review.delete()
            return Response({}, status=status.HTTP_200_OK)

        else:
            return Response({}, status=status.HTTP_400_BAD_REQUEST)

    return Response({}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def update_review(request):
    """Update the given review id data"""
    review_id       = request.data['reviewId']
    user_id         = request.data['userId']
    title           = request.data['name']
    rating          = request.data['rating']
    text            = request.data['review']
    point           = request.data['point']

    if title and rating and text and point and review_id and user_id:
        review = Review.objects.get(id=review_id)

        if review and user_id == review.user_id:
            review.title    = title
            review.rating   = rating
            review.text     = text
            review.point    = point

            review.save()
            return Response({}, status=status.HTTP_200_OK)

        else :
            return Response({}, status=status.HTTP_400_BAD_REQUEST)

    return Response({}, status=status.HTTP_400_BAD_REQUEST)
