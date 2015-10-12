from django.shortcuts import render

# Create your views here.
from rest_framework import permissions, viewsets
from rest_framework.response import Response

from posts.models import Post
from posts.permissions import IsAuthorOfPost
from posts.serializers import PostSerializer
from rest_framework.parsers import MultiPartParser, FormParser, FileUploadParser
from rest_framework import generics


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.order_by('-created_at')
    serializer_class = PostSerializer
    #parser_classes = (FormParser, )#FormParser, MultiPartParser, )# MultiPartParser FileUploadParser, FormParser,)

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return (permissions.AllowAny(),)
        return (permissions.IsAuthenticated(), )

    def perform_create(self, serializer):
        instance = serializer.save(author=self.request.user, datafile =self.request.data.get('datafile'))
        return super(PostViewSet, self).perform_create(serializer)

    def list(self, request):
        print(request.data)
        serializer = self.serializer_class(self.queryset, many=True)
        return Response(serializer.data)

class PostsList(generics.ListAPIView):
    serializer_class = PostSerializer

    def get_queryset(self):
        """
        This view should return a list of all the purchases for
        the user as determined by the username portion of the URL.
        """
        print(self.kwargs['recovered'])
        if self.kwargs['recovered'] == 'si' : recovered = True
        else:
            recovered = False
        #recovered = (self.kwargs['recovered'] == 'si') ? True : False
        return Post.objects.filter(recovered=recovered)


class AccountPostsViewSet(viewsets.ViewSet):
    queryset = Post.objects.select_related('author').all()
    serializer_class = PostSerializer

    def list(self, request, account_username=None):
        queryset = self.queryset.filter(author__username=account_username)
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)