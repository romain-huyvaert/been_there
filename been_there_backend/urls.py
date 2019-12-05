from django.urls import include, path
from rest_framework import routers
from been_there_backend.restapi.views import UserViews, ReviewViews, WorldMapViews

router = routers.DefaultRouter()
# router.register(r'users', UserViews)
# router.register(r'pinpoints', PinpointViews)
# router.register(r'reviews', ReviewViews)
# router.register(r'worldmap', WorldMapViews)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),


    # User View
    path('api/users/', UserViews.user_list),

    # Review View
    path('api/reviews/', ReviewViews.review_list),
    path('api/reviews/add/', ReviewViews.insert_review),
    path('api/reviews/user/', ReviewViews.user_reviews),
    path('api/reviews/friends/', ReviewViews.friends_reviews),
    path('api/reviews/update/', ReviewViews.update_review),
    path('api/reviews/delete/', ReviewViews.delete_review),

    # Worldmap View
    path('api/worldmap/', WorldMapViews.worldmap_list),
]
