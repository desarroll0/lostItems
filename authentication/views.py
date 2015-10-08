from django.shortcuts import render
from rest_framework import permissions, viewsets, status, views
from rest_framework.response import Response
from django.contrib.auth import authenticate, login, logout

from authentication.models import Account
from authentication.permissions import IsAccountOwner
from authentication.serializers import AccountSerializer

import json

# Create your views here.

class AccountViewSet(viewsets.ModelViewSet):
    # we will use the username attribute of the Account model to look up accounts instead of the id attribute. Overriding lookup_field handles this for us  : https://thinkster.io/django-angularjs-tutorial/
    lookup_field = 'username'
    queryset = Account.objects.all()
    serializer_class = AccountSerializer

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return (permissions.AllowAny(),)

        if self.request.method == 'POST':
            return (permissions.AllowAny(),)

        return (permissions.IsAuthenticated(), IsAccountOwner(),)


    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
        	Account.objects.create_user(**serializer.validated_data)
        return Response(serializer.validated_data, status=status.HTTP_201_CREATED)
        return Response({
            'status': 'Bad request',
            'message': 'Account could not be created with received data.'
        }, status=status.HTTP_400_BAD_REQUEST)


class LoginView(views.APIView):
    print("000000000")
    def post(self, request, format=None):
        print("1111111")
        data = json.loads((request.body).decode('utf-8')) #json.loads(request.body)
        #data = json.loads('{"email":"ok@ok.com","password":"ok"}')
        email = data.get('email', None)
        password = data.get('password', None)
        account = authenticate(email=email, password=password)
        if account is not None:
            if account.is_active:
                login(request, account)

                serialized = AccountSerializer(account)

                return Response(serialized.data)
            else:
                return Response({
                    'status': 'Unauthorized',
                    'message': 'This account has been disabled.'
                }, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response({
                'status': 'Unauthorized',
                'message': 'Username/password combination invalid.'
            }, status=status.HTTP_401_UNAUTHORIZED)

class LogoutView(views.APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, format=None):
        logout(request)

        return Response({}, status=status.HTTP_204_NO_CONTENT)
    