import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './hd.css';

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="custom-header">
      <div className="container d-flex justify-content-between align-items-center py-3">
        {/* Logo / Brand */}
        <div className="logo">
          <Link to="/" className="custom-link text-decoration-none">
          LibraryApi<span style={{ fontWeight: 'bold' }}>X</span>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="nav-menu">
          <Link to="/" className="custom-link me-3 text-decoration-none">Home</Link>
          <Link to="/books" className="custom-link me-3 text-decoration-none">Books</Link>
          <Link to="/authors" className="custom-link me-3 text-decoration-none">Authors</Link>
          {user && (
            <Link to="/favorites" className="custom-link text-decoration-none">Favorites</Link>
          )}
        </nav>
        
        {/* Authentication Section */}
        <div className="auth-section">
          {user ? (
            <button onClick={handleLogout} className="btn btn-outline-light custom-btn">
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline-light me-2 custom-btn">
                Login
              </Link>
              <Link to="/register" className="btn btn-outline-light custom-btn">
                Register
              </Link>
            </>
          )}
        </div>

        {/* Hamburger Menu (visible on mobile) */}
        <button className="hamburger" onClick={toggleNav}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isNavOpen && (
        <div className="mobile-nav">
          <nav className="d-flex flex-column">
            <Link to="/" onClick={() => setIsNavOpen(false)} className="custom-link text-decoration-none">Home</Link>
            <Link to="/books" onClick={() => setIsNavOpen(false)} className="custom-link text-decoration-none">Books</Link>
            <Link to="/authors" onClick={() => setIsNavOpen(false)} className="custom-link text-decoration-none">Authors</Link>
            {user && (
              <Link to="/favorites" onClick={() => setIsNavOpen(false)} className="custom-link text-decoration-none">Favorites</Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
