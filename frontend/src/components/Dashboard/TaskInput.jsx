import React, { useState } from 'react';
import { Plus, CornerDownLeft } from 'lucide-react';

export const TaskInput = ({ onAddTask, isCreating }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || isCreating) return;
    onAddTask(title.trim());
    setTitle('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="card-panel"
      style={{
        padding: '0.6rem 0.85rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        marginBottom: '1.25rem',
      }}
    >
      <div style={{ position: 'relative', flex: 1, display: 'flex', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Add a new task... (press Enter)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={isCreating}
          style={{
            width: '100%',
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: 'var(--text-main)',
            fontFamily: 'var(--font-primary)',
            fontSize: '0.95rem',
            padding: '0.5rem 0.6rem',
          }}
        />
        {title.trim() && (
          <span style={{
            position: 'absolute',
            right: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.2rem',
            fontSize: '0.75rem',
            color: 'var(--text-dim)',
            backgroundColor: 'var(--bg-input)',
            border: '1px solid var(--border-color)',
            padding: '0.15rem 0.35rem',
            borderRadius: '4px'
          }}>
            <CornerDownLeft size={12} /> Enter
          </span>
        )}
      </div>

      <button
        type="submit"
        className="btn btn-primary"
        disabled={!title.trim() || isCreating}
        style={{
          padding: '0.55rem 1rem',
          borderRadius: 'var(--radius-sm)',
          whiteSpace: 'nowrap'
        }}
      >
        <Plus size={16} />
        <span>{isCreating ? 'Adding...' : 'Add'}</span>
      </button>
    </form>
  );
};
