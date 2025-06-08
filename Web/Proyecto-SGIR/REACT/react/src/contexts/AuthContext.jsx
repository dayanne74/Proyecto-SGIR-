import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import api from './api'; // si optas por la instancia

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: localStorage.getItem('token'),
    roles: JSON.parse(localStorage.getItem('roles') || '[]'),
    user: null,
  });

  // Decodifica y establece user + axios header al arrancar
  useEffect(() => {
    const token = auth.token;
    if (token) {
      // inject header
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // decode payload
      try {
        const payload = JSON.parse(
          decodeURIComponent(
            atob(token.split('.')[1])
              .split('')
              .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
              .join('')
          )
        );
        setAuth(a => ({ ...a, user: payload }));
      } catch {
        logout();
      }
    }
  }, []);

  const login = (token, roles) => {
    localStorage.setItem('token', token);
    localStorage.setItem('roles', JSON.stringify(roles));
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    const payload = JSON.parse(
      decodeURIComponent(
        atob(token.split('.')[1])
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      )
    );
    setAuth({ token, roles, user: payload });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('roles');
    delete axios.defaults.headers.common['Authorization'];
    delete api.defaults.headers.common['Authorization'];
    setAuth({ token: null, roles: [], user: null });
  };

  return (
    <AuthContext.Provider
      value={{
        ...auth,
        login,
        logout,
        isAuthenticated: Boolean(auth.token),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);


