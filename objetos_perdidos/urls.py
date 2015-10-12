from django.conf.urls import patterns, url, include
from objetos_perdidos.views import IndexView
from rest_framework_nested import routers
from authentication.views import AccountViewSet, LoginView, LogoutView
from django.contrib import admin
from posts.views import AccountPostsViewSet, PostViewSet, PostsList
from django.conf import settings
from django.core.cache import cache

router = routers.SimpleRouter()
router.register(r'accounts', AccountViewSet)

router.register(r'posts', PostViewSet)

accounts_router = routers.NestedSimpleRouter(
    router, r'accounts', lookup='account'
)
accounts_router.register(r'posts', AccountPostsViewSet)


urlpatterns = patterns(
    '',
    url(r'^admin/', include(admin.site.urls)),
    #url(r'^api/v1/', include(router.urls)),
  	#url(r'^api/v1/', include(accounts_router.urls)),
    url(r'^api/v1/auth/login/$', LoginView.as_view(), name='login'),
    url(r'^api/v1/auth/logout/$', LogoutView.as_view(), name='logout'),

  	url(r'^api/v1/', include(router.urls)),
  	url(r'^api/v1/', include(accounts_router.urls)),
    url(r'^api/v1/post/recovered/(?P<recovered>.+)/$', PostsList.as_view()),

    #mediafiles
    url(r'^media/(?P<path>.*)$', 'django.views.static.serve', {'document_root': settings.MEDIA_ROOT,}),
  
    url('^.*$', IndexView.as_view(), name='index'),
    #url('^/*$', IndexView.as_view(), name='index'),
)


cache.clear()