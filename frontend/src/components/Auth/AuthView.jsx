import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Mail, Lock, User, CheckSquare, ArrowRight, Eye, EyeOff } from 'lucide-react';

export const AuthView = ({ addToast }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login, register, isLoading } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password || (!isLogin && !name)) {
      setError('Please fill in all required fields');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    if (isLogin) {
      const res = await login(email, password);
      if (res.success) {
        addToast('Welcome back! Logged in successfully.', 'success');
      } else {
        setError(res.message);
        addToast(res.message, 'error');
      }
    } else {
      const res = await register(name, email, password);
      if (res.success) {
        addToast(res.message || 'Account created successfully!', 'success');
      } else {
        setError(res.message);
        addToast(res.message, 'error');
      }
    }
  };

  return (
    <div
      style={{
        minHeight: '85vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '420px',
          padding: '2.5rem 2.2rem',
          backgroundColor: '#FFFFFF',
          border: '2px solid var(--border-strong)',
          borderRadius: 'var(--radius-xl)',
          boxShadow: 'var(--shadow-container)',
        }}
      >
        {/* Brand Header */}
        <div style={{ textAlign: 'center', marginBottom: '1.85rem' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '54px',
              height: '54px',
              borderRadius: '12px',
              backgroundColor: 'var(--primary)',
              color: 'var(--navy)',
              marginBottom: '1rem',
              boxShadow: '0 4px 14px rgba(252, 163, 17, 0.4)',
            }}
          >
            <CheckSquare size={30} strokeWidth={2.5} />
          </div>
          <h1
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.85rem',
              fontWeight: 800,
              marginBottom: '0.35rem',
              color: 'var(--text-main)',
              letterSpacing: '-0.02em',
            }}
          >
            Smart ToDo
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
            {isLogin
              ? 'Sign in to manage tasks, due dates & priorities.'
              : 'Create your account to organize your tasks.'}
          </p>
        </div>

        {/* Toggle Mode Tabs */}
        <div
          style={{
            display: 'flex',
            backgroundColor: '#F1F5F9',
            padding: '4px',
            borderRadius: 'var(--radius-md)',
            marginBottom: '1.5rem',
            border: '1px solid var(--border-color)',
          }}
        >
          <button
            type="button"
            onClick={() => {
              setIsLogin(true);
              setError('');
            }}
            style={{
              flex: 1,
              padding: '0.55rem 0',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.88rem',
              fontWeight: 700,
              cursor: 'pointer',
              backgroundColor: isLogin ? '#FFFFFF' : 'transparent',
              color: isLogin ? 'var(--navy)' : 'var(--text-muted)',
              boxShadow: isLogin ? '0 1px 3px rgba(0, 0, 0, 0.08)' : 'none',
              transition: 'all 0.15s ease',
            }}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setIsLogin(false);
              setError('');
            }}
            style={{
              flex: 1,
              padding: '0.55rem 0',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.88rem',
              fontWeight: 700,
              cursor: 'pointer',
              backgroundColor: !isLogin ? '#FFFFFF' : 'transparent',
              color: !isLogin ? 'var(--navy)' : 'var(--text-muted)',
              boxShadow: !isLogin ? '0 1px 3px rgba(0, 0, 0, 0.08)' : 'none',
              transition: 'all 0.15s ease',
            }}
          >
            Sign Up
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div
            style={{
              backgroundColor: 'var(--danger-bg)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: 'var(--radius-sm)',
              padding: '0.7rem 0.95rem',
              color: 'var(--danger-text)',
              fontSize: '0.85rem',
              marginBottom: '1.25rem',
            }}
          >
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} autoComplete="off">
          {!isLogin && (
            <div className="input-group">
              <label className="input-label" htmlFor="name">
                Full Name
              </label>
              <div className="input-field-wrapper">
                <User size={16} className="input-field-icon" />
                <input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input-field with-icon"
                  autoComplete="off"
                  required={!isLogin}
                />
              </div>
            </div>
          )}

          <div className="input-group">
            <label className="input-label" htmlFor="email">
              Email Address
            </label>
            <div className="input-field-wrapper">
              <Mail size={16} className="input-field-icon" />
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field with-icon"
                autoComplete="off"
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label className="input-label" htmlFor="password">
              Password
            </label>
            <div className="input-field-wrapper">
              <Lock size={16} className="input-field-icon" />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field with-icon"
                style={{ paddingRight: '2.5rem' }}
                autoComplete={isLogin ? 'current-password' : 'new-password'}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '0.75rem',
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-dim)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                }}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={isLoading}
            style={{ width: '100%', marginTop: '0.75rem', padding: '0.8rem', fontSize: '0.95rem' }}
          >
            {isLoading ? (
              <span>Processing...</span>
            ) : (
              <>
                <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                <ArrowRight size={16} strokeWidth={2.8} />
              </>
            )}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.65rem' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
          </span>
          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
            }}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--navy)',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer',
              textDecoration: 'underline',
              marginLeft: '0.25rem',
            }}
          >
            {isLogin ? 'Sign up' : 'Sign in'}
          </button>
        </div>
      </div>
    </div>
  );
};
