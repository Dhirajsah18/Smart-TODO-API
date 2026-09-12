import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { CheckSquare, LogOut, UserCircle } from 'lucide-react';

export const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="card-panel" style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0.9rem 1.25rem',
      marginBottom: '1.5rem',
    }}>
      {/* Brand Identity */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '36px',
          height: '36px',
          borderRadius: 'var(--radius-sm)',
          backgroundColor: 'var(--primary)',
          color: '#ffffff'
        }}>
          <CheckSquare size={20} />
        </div>
        <div>
          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.2rem',
            fontWeight: 700,
            lineHeight: 1.1,
            color: 'var(--text-main)'
          }}>
            Smart ToDo
          </h2>
        </div>
      </div>

      {/* User Info & Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: 'var(--primary-light)',
            color: 'var(--primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 700,
            fontSize: '0.85rem',
          }}>
            {user?.name ? user.name.charAt(0).toUpperCase() : <UserCircle size={18} />}
          </div>
          <div style={{ display: 'none', flexDirection: 'column', textAlign: 'left' }} className="user-text-details">
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)' }}>
              {user?.name || 'User'}
            </span>
          </div>
        </div>

        <button
          onClick={logout}
          className="btn btn-secondary"
          style={{ padding: '0.45rem 0.8rem', fontSize: '0.8rem' }}
          title="Sign Out"
        >
          <LogOut size={15} />
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
