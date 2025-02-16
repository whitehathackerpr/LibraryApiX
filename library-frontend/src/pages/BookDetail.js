// src/pages/BookDetail.js
import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await api.get(`/books/${id}/`);
        setBook(response.data);
      } catch (error) {
        console.error('Error fetching book details', error);
      }
    };
    fetchBook();
  }, [id]);

  const addToFavorites = async () => {
    try {
      await api.post('/favorites/', { book_id: book.id });
      alert('Book added to favorites!');
    } catch (error) {
      console.error('Error adding book to favorites', error);
      alert('Failed to add book to favorites.');
    }
  };

  if (!book) {
    return (
      <div className="container mt-5">
        <p>Loading book details...</p>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2>{book.title}</h2>
      <p>
        <strong>Author:</strong> {book.author.name}
      </p>
      <p>
        <strong>Publication Date:</strong> {book.publication_date}
      </p>
      <p>{book.description}</p>
      {user && (
        <button onClick={addToFavorites} className="btn btn-primary">
          Add to Favorites
        </button>
      )}
    </div>
  );
};

export default BookDetail;
