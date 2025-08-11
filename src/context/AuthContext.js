import { createContext, useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: localStorage.getItem('token'),
    user: null,
  });

  useEffect(() => {
    if (auth.token) {
      const decoded = jwtDecode(auth.token);
      setAuth((prev) => ({ ...prev, user: decoded }));
    }
  }, [auth.token]);

  const logout = () => {
    localStorage.removeItem('token');
    setAuth({ token: null, user: null });
    // Optionally redirect to login page
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
