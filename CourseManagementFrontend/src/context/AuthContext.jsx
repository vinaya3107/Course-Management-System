import { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Verify token and get user info
      api.get('/auth/me').then(response => {
        setUser(response.data);
      }).catch(() => {
        localStorage.removeItem('token');
      }).finally(() => {
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    const { token, id, name, role, email: userEmail } = response.data;
    const userData = { id, name, role, email: userEmail };
    localStorage.setItem('token', token);
    setUser(userData);
    return userData;
  };

  const register = async (userData) => {
    const response = await api.post('/auth/register', userData);
    const { token, id, name, role, email: userEmail } = response.data;
    const newUser = { id, name, role, email: userEmail };
    localStorage.setItem('token', token);
    setUser(newUser);
    return newUser;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  );
};