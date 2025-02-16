import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Import custom CSS for styling and animations

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-title">Welcome to the Library</h1>
        <p className="home-subtitle">
          Explore our extensive collection of books and authors. Dive into the world of knowledge and imagination.
        </p>
        <div className="home-buttons">
          <Link to="/books" className="home-button home-button-primary">
            Browse Books
          </Link>
          <Link to="/authors" className="home-button home-button-secondary">
            Browse Authors
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
