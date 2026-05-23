import { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../lib/axios';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Check for mock user first
        const mockUser = localStorage.getItem('mockUser');
        if (mockUser) {
          setUser(JSON.parse(mockUser));
          setLoading(false);
          return;
        }
        
        const { data } = await api.get('/auth/me');
        setUser(data);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = async (credentials) => {
    const { data } = await api.post('/auth/login', credentials);
    setUser(data);
  };

  const register = async (credentials) => {
    const { data } = await api.post('/auth/register', credentials);
    setUser(data);
  };

  const logout = async () => {
    // Clear mock user if exists
    localStorage.removeItem('mockUser');
    try {
      await api.post('/auth/logout');
    } catch (error) {
      // Ignore logout errors
    }
    setUser(null);
  };

  const googleLogin = async (credential) => {
    const { data } = await api.post('/auth/google', { credential });
    setUser(data);
  };

  // Mock Google login - uses existing backend credentials for quick access
  const mockGoogleLogin = async () => {
    const { data } = await api.post('/auth/login', {
      email: 'jm@ph.com',
      password: 'Drive123',
    });
    setUser(data);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, googleLogin, mockGoogleLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};