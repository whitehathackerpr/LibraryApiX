from django.contrib import admin
from django.urls import path, include
from library.views import LoginView
from rest_framework.routers import DefaultRouter
from library.views import BookViewSet, AuthorViewSet, RegisterView, FavoriteView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from django.http import JsonResponse  # Import for the root view

# Initialize the DefaultRouter
router = DefaultRouter()
router.register(r'books', BookViewSet, basename='book')
router.register(r'authors', AuthorViewSet, basename='author')

# Define a root view for the default URL
def root_view(request):
    return JsonResponse({
        "message": "Welcome to the Library API!",
        "endpoints": [
            "/admin/",
            "/api/",
            "/api/register/",
            "/api/token/",
            "/api/token/refresh/",
            "/api/favorites/",
        ],
    })

# Define the urlpatterns
urlpatterns = [
    path('', root_view, name='root'),  # Root URL for the welcome message
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/register/', RegisterView.as_view(), name='register'),
    path('api/login/', LoginView.as_view(), name='login'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/favorites/', FavoriteView.as_view(), name='favorites'),
]
