# LibraryApiX - Django RESTful API for Library Management

LibraryApiX is a Django-based RESTful API designed to manage books and authors, with integrated features such as user authentication, search functionality, and a recommendation system based on user preferences. This project provides users with the ability to interact with a library of books, manage their favorites list, and receive personalized book recommendations.

## Features

- **Books Management**:
  - Retrieve, create, update, and delete books.
  - API endpoints for managing book data.
  
- **Authors Management**:
  - Retrieve, create, update, and delete authors.
  - API endpoints for managing author data.

- **Authentication**:
  - User registration and login using JWT (JSON Web Tokens).
  - Secure endpoints for creating, updating, and deleting books/authors.

- **Search Functionality**:
  - Search books by title or author name.

- **Recommendation System**:
  - Personalized book recommendations based on the user's favorites list.
  - A maximum of 20 books in the favorites list.
  - Returns recommendations in under 1 second.
  - Uses a similarity algorithm to suggest relevant books based on favorites.

## API Endpoints

### Books Endpoints:
- `GET /books`: Retrieve a list of all books.
- `GET /books/:id`: Retrieve a specific book by ID.
- `POST /books`: Create a new book (protected).
- `PUT /books/:id`: Update an existing book (protected).
- `DELETE /books/:id`: Delete a book (protected).

### Authors Endpoints:
- `GET /authors`: Retrieve a list of all authors.
- `GET /authors/:id`: Retrieve a specific author by ID.
- `POST /authors`: Create a new author (protected).
- `PUT /authors/:id`: Update an existing author (protected).
- `DELETE /authors/:id`: Delete an author (protected).

### Authentication Endpoints:
- `POST /register`: Register a new user.
- `POST /login`: Login an existing user.

### Search Functionality:
- `GET /books?search=query`: Search for books by title or author name.

### Recommendation System:
- `GET /recommendations`: Get book recommendations based on favorites.

## Installation

To get started with LibraryApiX, follow these steps to set up the environment and run the application locally.

### Prerequisites

- Python 3.x
- Django
- Django REST framework
- JWT for authentication
-  database

### Setup is currently not allowed only allowed for spotter.ai only 
