import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { CheckSquare, LogOut, UserCircle } from 'lucide-react';

export const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header
      className="card-panel"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.95rem 1.35rem',
        marginBottom: 0,
        backgroundColor: 'var(--bg-card)',
        border: '1.5px solid var(--border-color)',
      }}
    >
      {/* Brand Identity */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            backgroundColor: 'var(--primary)',
            color: 'var(--navy)',
            boxShadow: '0 2px 8px rgba(252, 163, 17, 0.35)',
          }}
        >
          <CheckSquare size={22} strokeWidth={2.5} />
        </div>
        <div>
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.35rem',
              fontWeight: 800,
              lineHeight: 1.15,
              color: 'var(--text-main)',
              letterSpacing: '-0.02em',
            }}
          >
            Smart ToDo
          </h2>
        </div>
      </div>

      {/* User Info & Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: 'var(--bg-input)',
              border: '1.5px solid var(--border-color)',
              color: 'var(--navy)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: '0.9rem',
            }}
          >
            {user?.name ? user.name.charAt(0).toUpperCase() : <UserCircle size={20} />}
          </div>
          <div style={{ display: 'none', flexDirection: 'column', textAlign: 'left' }} className="user-text-details">
            <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-main)' }}>
              {user?.name || 'User'}
            </span>
          </div>
        </div>

        <button
          onClick={logout}
          className="btn btn-secondary"
          style={{ padding: '0.45rem 0.9rem', fontSize: '0.82rem' }}
          title="Sign Out"
        >
          <LogOut size={14} />
          <span>Logout</span>
        </button>
      </div>

      <style>{`
        @media (min-width: 600px) {
          .user-text-details {
            display: flex !important;
          }
        }
      `}</style>
    </header>
  );
};
