import React, { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('smart_todo_token') || null);
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('smart_todo_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [isLoading, setIsLoading] = useState(false);

  // Listen for session expiry event
  useEffect(() => {
    const handleAuthExpired = () => {
      logout();
    };

    window.addEventListener('auth:expired', handleAuthExpired);
    return () => window.removeEventListener('auth:expired', handleAuthExpired);
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const data = await authApi.login({ email, password });
      
      const authToken = data.token;
      const userInfo = data.user || { email, name: email.split('@')[0] };

      localStorage.setItem('smart_todo_token', authToken);
      localStorage.setItem('smart_todo_user', JSON.stringify(userInfo));

      setToken(authToken);
      setUser(userInfo);
      return { success: true };
    } catch (err) {
      return { success: false, message: err.message || 'Login failed' };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name, email, password) => {
    setIsLoading(true);
    try {
      const data = await authApi.register({ name, email, password });
      // Automatically attempt login after successful registration
      const loginRes = await login(email, password);
      if (loginRes.success) {
        return { success: true, message: data.message || 'Account created successfully!' };
      }
      return { success: true, message: 'Account created! Please log in.' };
    } catch (err) {
      return { success: false, message: err.message || 'Registration failed' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('smart_todo_token');
    localStorage.removeItem('smart_todo_user');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated: !!token,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
