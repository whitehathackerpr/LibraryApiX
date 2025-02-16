import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';
import './Books.css'; // Import custom CSS for Books page styling

const Books = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');

  const fetchBooks = async (query = '') => {
    try {
      const response = await api.get(`/books/?search=${query}`);
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books', error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchBooks(search);
  };

  return (
    <div className="books-container">
      <h2 className="books-heading">Books</h2>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          className="search-input"
          placeholder="Search books by title or author"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
      <div className="books-grid">
        {books.map((book) => (
          <div key={book.id} className="book-card">
            <Link to={`/books/${book.id}`} className="book-title">
              {book.title}
            </Link>
            <p className="book-author">by {book.author.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Books;
