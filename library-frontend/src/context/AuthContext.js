// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Check for a token in local storage on load
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      
      setUser({ token });
    }
  }, []);

  const login = (token) => {
    localStorage.setItem('accessToken', token);
    setUser({ token });
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
