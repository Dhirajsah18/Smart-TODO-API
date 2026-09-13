import React from 'react';
import { Search, X, ArrowDownUp, Flag } from 'lucide-react';

export const TaskFilters = ({
  searchQuery,
  onSearchChange,
  activeFilter,
  onFilterChange,
  activePriority = 'all',
  onPriorityChange,
  sortBy,
  onSortChange,
  counts,
}) => {
  return (
    <div
      className="card-panel"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.9rem',
        padding: '1rem 1.15rem',
        marginBottom: 0,
        backgroundColor: 'var(--bg-card)',
        border: '1.5px solid var(--border-color)',
      }}
    >
      {/* Search Bar & Sort Dropdown Row */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0.75rem',
        }}
      >
        {/* Search Bar */}
        <div style={{ position: 'relative', flex: '1 1 240px', minWidth: '190px' }}>
          <Search
            size={16}
            style={{
              position: 'absolute',
              left: '0.85rem',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-dim)',
            }}
          />
          <input
            type="text"
            placeholder="Search by title..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            style={{
              width: '100%',
              backgroundColor: '#FFFFFF',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              padding: '0.55rem 2rem 0.55rem 2.4rem',
              color: 'var(--text-main)',
              fontSize: '0.88rem',
              outline: 'none',
              transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
            }}
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              style={{
                position: 'absolute',
                right: '0.65rem',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                color: 'var(--text-dim)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                padding: '2px',
              }}
              title="Clear search"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Sort Select */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.45rem',
            backgroundColor: '#FFFFFF',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)',
            padding: '0.2rem 0.75rem',
          }}
        >
          <ArrowDownUp size={14} color="var(--navy)" />
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-main)',
              fontSize: '0.85rem',
              fontWeight: 600,
              outline: 'none',
              cursor: 'pointer',
              padding: '0.35rem 0',
            }}
          >
            <option value="newest" style={{ background: '#FFFFFF', color: '#14213D' }}>Newest First</option>
            <option value="oldest" style={{ background: '#FFFFFF', color: '#14213D' }}>Oldest First</option>
            <option value="dueDate" style={{ background: '#FFFFFF', color: '#14213D' }}>Due Date (Soonest)</option>
            <option value="priority" style={{ background: '#FFFFFF', color: '#14213D' }}>Priority (High to Low)</option>
            <option value="alphabetical" style={{ background: '#FFFFFF', color: '#14213D' }}>Alphabetical</option>
          </select>
        </div>
      </div>

      {/* Filter Tabs Row */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0.6rem',
          borderTop: '1px solid var(--border-color)',
          paddingTop: '0.65rem',
        }}
      >
        {/* Status Filters */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <button
            onClick={() => onFilterChange('all')}
            style={{
              background: 'none',
              border: 'none',
              padding: '0.35rem 0.8rem',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.85rem',
              fontWeight: 700,
              cursor: 'pointer',
              color: activeFilter === 'all' ? 'var(--navy)' : 'var(--text-dim)',
              backgroundColor: activeFilter === 'all' ? 'var(--navy-light)' : 'transparent',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              transition: 'all 0.15s ease',
            }}
          >
            <span>All</span>
            <span className="badge badge-navy">{counts.all}</span>
          </button>

          <button
            onClick={() => onFilterChange('pending')}
            style={{
              background: 'none',
              border: 'none',
              padding: '0.35rem 0.8rem',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.85rem',
              fontWeight: 700,
              cursor: 'pointer',
              color: activeFilter === 'pending' ? 'var(--warning-text)' : 'var(--text-dim)',
              backgroundColor: activeFilter === 'pending' ? 'var(--warning-bg)' : 'transparent',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              transition: 'all 0.15s ease',
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
              padding: '0.35rem 0.8rem',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.85rem',
              fontWeight: 700,
              cursor: 'pointer',
              color: activeFilter === 'completed' ? 'var(--success-text)' : 'var(--text-dim)',
              backgroundColor: activeFilter === 'completed' ? 'var(--success-bg)' : 'transparent',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              transition: 'all 0.15s ease',
            }}
          >
            <span>Done</span>
            <span className="badge badge-success">{counts.completed}</span>
          </button>
        </div>

        {/* Priority Filter Chips */}
        {onPriorityChange && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <Flag size={13} color="var(--navy)" style={{ marginRight: '0.1rem' }} />
            {['all', 'high', 'medium', 'low'].map((p) => {
              const isSelected = activePriority === p;
              const count = p === 'all' ? counts.all : counts[p] || 0;
              const label = p.charAt(0).toUpperCase() + p.slice(1);
              return (
                <button
                  key={p}
                  type="button"
                  onClick={() => onPriorityChange(p)}
                  style={{
                    border: isSelected ? '1.5px solid var(--navy)' : '1px solid transparent',
                    backgroundColor: isSelected ? 'var(--navy-light)' : 'transparent',
                    color: isSelected ? 'var(--navy)' : 'var(--text-dim)',
                    fontSize: '0.78rem',
                    fontWeight: isSelected ? 700 : 500,
                    padding: '0.22rem 0.55rem',
                    borderRadius: 'var(--radius-sm)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <span>{label}</span>
                  {count > 0 && <span style={{ opacity: 0.85 }}>({count})</span>}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
