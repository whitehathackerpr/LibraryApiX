from rest_framework import viewsets, filters, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from django_filters.rest_framework import DjangoFilterBackend
from django.contrib.auth import authenticate
from .models import Book, Author, Favorite
from .serializers import BookSerializer, AuthorSerializer, UserRegistrationSerializer
from rest_framework_simplejwt.tokens import RefreshToken


# BOOK CRUD ENDPOINTS (PROTECTED)
class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    # Only logged in users can access any book routes
    permission_classes = [IsAuthenticated]
    filter_backends = [filters.SearchFilter, DjangoFilterBackend]
    search_fields = ['title', 'author__name']

# AUTHOR CRUD ENDPOINTS (PROTECTED)
class AuthorViewSet(viewsets.ModelViewSet):
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer
    # Only logged in users can access any author routes
    permission_classes = [IsAuthenticated]

# USER REGISTRATION ENDPOINT (PUBLIC)
class RegisterView(APIView):
    # Allow any user to register
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "User registered successfully."},
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# LOGIN ENDPOINT (PUBLIC)
class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        username = request.data.get("username")
        password = request.data.get("password")
        
        user = authenticate(username=username, password=password)
        if user is not None:
            # Generate JWT tokens for the authenticated user
            refresh = RefreshToken.for_user(user)
            return Response({
                "message": "Login successful!",
                "refresh": str(refresh),
                "access": str(refresh.access_token)
            }, status=status.HTTP_200_OK)
        return Response({"error": "Invalid username or password."}, status=status.HTTP_401_UNAUTHORIZED)
# FAVORITES & RECOMMENDATIONS ENDPOINTS (PROTECTED)
class FavoriteView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Get all favorites for the current user
        favorites = Favorite.objects.filter(user=request.user)
        favorite_books = [fav.book for fav in favorites]

        # Recommendation: find books by the same authors of favorited books,
        # excluding books already in favorites.
        author_ids = {book.author.id for book in favorite_books}
        recommendations = (
            Book.objects.filter(author__id__in=author_ids)
            .exclude(id__in=[book.id for book in favorite_books])
            .distinct()[:5]
        )

        book_serializer = BookSerializer(favorite_books, many=True)
        recommended_serializer = BookSerializer(recommendations, many=True)

        return Response({
            "favorites": book_serializer.data,
            "recommendations": recommended_serializer.data
        }, status=status.HTTP_200_OK)

    def post(self, request):
        book_id = request.data.get('book_id')
        if not book_id:
            return Response(
                {"error": "Book ID is required."},
                status=status.HTTP_400_BAD_REQUEST
            )
        if Favorite.objects.filter(user=request.user).count() >= 20:
            return Response(
                {"error": "Maximum 20 favorite books allowed."},
                status=status.HTTP_400_BAD_REQUEST
            )
        try:
            book = Book.objects.get(id=book_id)
        except Book.DoesNotExist:
            return Response(
                {"error": "Book not found."},
                status=status.HTTP_404_NOT_FOUND
            )
        favorite, created = Favorite.objects.get_or_create(user=request.user, book=book)
        if not created:
            return Response(
                {"message": "Book already in favorites."},
                status=status.HTTP_200_OK
            )
        return Response(
            {"message": "Book added to favorites."},
            status=status.HTTP_201_CREATED
        )

    def delete(self, request):
        book_id = request.data.get('book_id')
        if not book_id:
            return Response(
                {"error": "Book ID is required."},
                status=status.HTTP_400_BAD_REQUEST
            )
        try:
            favorite = Favorite.objects.get(user=request.user, book__id=book_id)
        except Favorite.DoesNotExist:
            return Response(
                {"error": "Favorite not found."},
                status=status.HTTP_404_NOT_FOUND
            )
        favorite.delete()
        return Response(
            {"message": "Book removed from favorites."},
            status=status.HTTP_200_OK
        )
