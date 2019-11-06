from ..models import Review
from rest_framework import viewsets
from rest_framework.decorators import api_view
from django.core.serializers import serialize
from ..serializers import ReviewSerializer
from rest_framework.response import Response
from rest_framework import status


@api_view(['GET'])
def review_list(request):
    reviews = Review.objects.all()
    serializer = ReviewSerializer(reviews, many=True)
    if reviews:
        return Response(data=serializer.data, status=status.HTTP_200_OK)

    return Response({}, status=status.HTTP_400_BAD_REQUEST)
