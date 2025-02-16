import React, { useEffect, useState } from 'react';
import api from '../services/api';
import './Authors.css';

const Authors = () => {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await api.get('/authors/');
        setAuthors(response.data);
      } catch (err) {
        console.error('Error fetching authors:', err);
        setError('Failed to fetch authors. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchAuthors();
  }, []);

  if (loading) {
    return <div className="loading">Loading authors...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="authors-container">
      <h2 className="authors-heading">Authors</h2>
      {authors.length === 0 ? (
        <div className="no-authors">No authors found.</div>
      ) : (
        <div className="authors-list">
          {authors.map((author) => (
            <div key={author.id} className="author-card">
              <h5 className="author-name">{author.name}</h5>
              <p className="author-bio">{author.bio}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Authors;
