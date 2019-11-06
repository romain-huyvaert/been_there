from ..models import User
from rest_framework import viewsets
from ..serializers import UserSerializer
from rest_framework.decorators import api_view
from django.core.serializers import serialize
from rest_framework.response import Response
from rest_framework import status


@api_view(['GET'])
def user_list(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    if users:
        return Response(data=serializer.data, status=status.HTTP_200_OK)

    return Response({}, status=status.HTTP_400_BAD_REQUEST)
