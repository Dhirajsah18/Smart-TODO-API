import React, { useState, useCallback } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AuthView } from './components/Auth/AuthView';
import { DashboardView } from './components/Dashboard/DashboardView';
import { Toast } from './components/Common/Toast';

const AppContent = () => {
  const { isAuthenticated } = useAuth();
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'info') => {
    const id = Date.now() + Math.random().toString(36).substr(2, 4);
    setToasts((prev) => [...prev, { id, message, type }]);

    // Auto dismiss after 3.5 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <div className="app-container">
      {isAuthenticated ? (
        <DashboardView addToast={addToast} />
      ) : (
        <AuthView addToast={addToast} />
      )}
      <Toast toasts={toasts} onDismiss={removeToast} />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
