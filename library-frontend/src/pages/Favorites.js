import React, { useEffect, useState, useContext } from 'react';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import './Favorites.css'; // Import the custom CSS

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      fetchFavorites();
    }
  }, [user]);

  const fetchFavorites = async () => {
    try {
      const response = await api.get('/favorites/');
      setFavorites(response.data.favorites);
      setRecommendations(response.data.recommendations);
    } catch (error) {
      console.error('Error fetching favorites', error);
    }
  };

  const removeFavorite = async (bookId) => {
    try {
      await api.delete('/favorites/', { data: { book_id: bookId } });
      fetchFavorites();
    } catch (error) {
      console.error('Error removing favorite', error);
    }
  };

  return (
    <div className="favorites-container">
      <h2 className="favorites-heading">Your Favorite Books</h2>
      <div className="favorites-list">
        {favorites.map((book) => (
          <div key={book.id} className="favorite-card">
            <div className="favorite-info">
              <h4 className="favorite-title">{book.title}</h4>
              <p className="favorite-author">by {book.author.name}</p>
            </div>
            <button onClick={() => removeFavorite(book.id)} className="remove-button">
              Remove
            </button>
          </div>
        ))}
      </div>

      <h3 className="recommendations-heading">Recommended Books</h3>
      <div className="recommendations-list">
        {recommendations.map((book) => (
          <div key={book.id} className="recommendation-card">
            <h4 className="recommendation-title">{book.title}</h4>
            <p className="recommendation-author">by {book.author.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
