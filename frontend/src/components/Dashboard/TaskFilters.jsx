import React from 'react';
import { Search, X, ArrowDownUp } from 'lucide-react';

export const TaskFilters = ({
  searchQuery,
  onSearchChange,
  activeFilter,
  onFilterChange,
  sortBy,
  onSortChange,
  counts
}) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '0.85rem',
      marginBottom: '1rem'
    }}>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '0.65rem'
      }}>
        {/* Search Bar */}
        <div style={{ position: 'relative', flex: '1 1 220px', minWidth: '180px' }}>
          <Search
            size={15}
            style={{
              position: 'absolute',
              left: '0.75rem',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-dim)'
            }}
          />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            style={{
              width: '100%',
              backgroundColor: '#ffffff',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              padding: '0.5rem 2rem 0.5rem 2.2rem',
              color: 'var(--text-main)',
              fontSize: '0.875rem',
              outline: 'none',
            }}
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              style={{
                position: 'absolute',
                right: '0.5rem',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                color: 'var(--text-dim)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                padding: '2px'
              }}
              title="Clear search"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Sort Select */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          backgroundColor: '#ffffff',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-md)',
          padding: '0.15rem 0.5rem'
        }}>
          <ArrowDownUp size={14} color="var(--text-dim)" />
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-main)',
              fontSize: '0.85rem',
              fontWeight: 500,
              outline: 'none',
              cursor: 'pointer',
              padding: '0.35rem 0'
            }}
          >
            <option value="newest" style={{ background: '#ffffff', color: '#0f172a' }}>Newest First</option>
            <option value="oldest" style={{ background: '#ffffff', color: '#0f172a' }}>Oldest First</option>
            <option value="alphabetical" style={{ background: '#ffffff', color: '#0f172a' }}>Alphabetical</option>
          </select>
        </div>
      </div>

      {/* Filter Tabs */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.4rem',
        borderBottom: '1px solid var(--border-color)',
        paddingBottom: '0.4rem'
      }}>
        <button
          onClick={() => onFilterChange('all')}
          style={{
            background: 'none',
            border: 'none',
            padding: '0.35rem 0.75rem',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.85rem',
            fontWeight: 600,
            cursor: 'pointer',
            color: activeFilter === 'all' ? 'var(--primary-text)' : 'var(--text-dim)',
            backgroundColor: activeFilter === 'all' ? 'var(--primary-light)' : 'transparent',
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
          }}
        >
          <span>All</span>
          <span className="badge badge-primary">{counts.all}</span>
        </button>

        <button
          onClick={() => onFilterChange('pending')}
          style={{
            background: 'none',
            border: 'none',
            padding: '0.35rem 0.75rem',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.85rem',
            fontWeight: 600,
            cursor: 'pointer',
            color: activeFilter === 'pending' ? 'var(--warning-text)' : 'var(--text-dim)',
            backgroundColor: activeFilter === 'pending' ? 'var(--warning-bg)' : 'transparent',
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
          }}
        >
          <span>Pending</span>
          <span className="badge badge-warning">{counts.pending}</span>
        </button>

        <button
          onClick={() => onFilterChange('completed')}
          style={{
            background: 'none',
            border: 'none',
            padding: '0.35rem 0.75rem',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.85rem',
            fontWeight: 600,
            cursor: 'pointer',
            color: activeFilter === 'completed' ? 'var(--success-text)' : 'var(--text-dim)',
            backgroundColor: activeFilter === 'completed' ? 'var(--success-bg)' : 'transparent',
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
          }}
        >
          <span>Done</span>
          <span className="badge badge-success">{counts.completed}</span>
        </button>
      </div>
    </div>
  );
};
