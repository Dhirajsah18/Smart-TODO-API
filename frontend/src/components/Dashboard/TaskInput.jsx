import React, { useState } from 'react';
import { Plus, Calendar, Flag, X } from 'lucide-react';

export const TaskInput = ({ onAddTask, isCreating }) => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');
  const [showOptions, setShowOptions] = useState(false);

  const getLocalDateString = (offsetDays = 0) => {
    const d = new Date();
    d.setDate(d.getDate() + offsetDays);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const todayStr = getLocalDateString(0);
  const tomorrowStr = getLocalDateString(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || isCreating) return;

    onAddTask({
      title: title.trim(),
      priority,
      dueDate: dueDate || null,
    });

    setTitle('');
    setPriority('medium');
    setDueDate('');
    setShowOptions(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="card-panel"
      style={{
        padding: '0.95rem 1.15rem',
        marginBottom: 0,
        backgroundColor: 'var(--bg-card)',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.85rem',
        border: '1.5px solid var(--border-color)',
      }}
    >
      {/* Top row: Input & Add Button */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <input
          type="text"
          placeholder="What needs to be done? (e.g. Prepare quarterly report)"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (!showOptions && e.target.value.trim()) {
              setShowOptions(true);
            }
          }}
          onFocus={() => setShowOptions(true)}
          disabled={isCreating}
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: 'var(--text-main)',
            fontFamily: 'var(--font-primary)',
            fontSize: '0.96rem',
            fontWeight: 500,
            padding: '0.35rem 0.25rem',
          }}
        />

        <button
          type="submit"
          className="btn btn-primary"
          disabled={!title.trim() || isCreating}
          style={{
            padding: '0.55rem 1.25rem',
            borderRadius: 'var(--radius-md)',
            whiteSpace: 'nowrap',
          }}
        >
          <Plus size={18} strokeWidth={2.8} />
          <span>{isCreating ? 'Adding...' : 'Add Task'}</span>
        </button>
      </div>

      {/* Due Date & Priority controls */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0.75rem',
          paddingTop: '0.75rem',
          borderTop: '1px solid var(--border-color)',
          fontSize: '0.84rem',
        }}
      >
        {/* Priority Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'var(--text-muted)', fontWeight: 600 }}>
            <Flag size={13} color="var(--c-amber)" />
            Priority:
          </span>
          <div style={{ display: 'inline-flex', gap: '0.35rem' }}>
            {[
              { id: 'low', label: 'Low', color: '#14213D', bg: '#EEF2F6' },
              { id: 'medium', label: 'Medium', color: '#C2410C', bg: '#FFF7ED' },
              { id: 'high', label: 'High', color: '#DC2626', bg: '#FEF2F2' },
            ].map((p) => {
              const isSelected = priority === p.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setPriority(p.id)}
                  style={{
                    border: isSelected ? `1.5px solid ${p.color}` : '1px solid var(--border-color)',
                    backgroundColor: isSelected ? p.bg : '#FFFFFF',
                    color: isSelected ? p.color : 'var(--text-dim)',
                    fontWeight: isSelected ? 700 : 500,
                    padding: '0.22rem 0.65rem',
                    borderRadius: 'var(--radius-sm)',
                    cursor: 'pointer',
                    fontSize: '0.78rem',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {p.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Due Date Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', flexWrap: 'wrap' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'var(--text-muted)', fontWeight: 600 }}>
            <Calendar size={13} color="var(--c-amber)" />
            Due:
          </span>

          <button
            type="button"
            onClick={() => setDueDate(todayStr)}
            style={{
              border: dueDate === todayStr ? '1.5px solid var(--c-amber)' : '1px solid var(--border-color)',
              backgroundColor: dueDate === todayStr ? 'var(--primary-light)' : '#FFFFFF',
              color: dueDate === todayStr ? 'var(--primary-text)' : 'var(--text-secondary)',
              fontWeight: dueDate === todayStr ? 700 : 500,
              padding: '0.22rem 0.65rem',
              borderRadius: 'var(--radius-sm)',
              cursor: 'pointer',
              fontSize: '0.78rem',
              transition: 'all 0.15s ease',
            }}
          >
            Today
          </button>

          <button
            type="button"
            onClick={() => setDueDate(tomorrowStr)}
            style={{
              border: dueDate === tomorrowStr ? '1.5px solid #3B82F6' : '1px solid var(--border-color)',
              backgroundColor: dueDate === tomorrowStr ? '#EFF6FF' : '#FFFFFF',
              color: dueDate === tomorrowStr ? '#1E40AF' : 'var(--text-secondary)',
              fontWeight: dueDate === tomorrowStr ? 700 : 500,
              padding: '0.22rem 0.65rem',
              borderRadius: 'var(--radius-sm)',
              cursor: 'pointer',
              fontSize: '0.78rem',
              transition: 'all 0.15s ease',
            }}
          >
            Tomorrow
          </button>

          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              style={{
                border: dueDate && dueDate !== todayStr && dueDate !== tomorrowStr ? '1.5px solid var(--c-amber)' : '1px solid var(--border-color)',
                backgroundColor: '#FFFFFF',
                color: dueDate ? 'var(--text-main)' : 'var(--text-dim)',
                padding: '0.18rem 0.5rem',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.78rem',
                cursor: 'pointer',
                outline: 'none',
              }}
            />
            {dueDate && (
              <button
                type="button"
                onClick={() => setDueDate('')}
                title="Clear due date"
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '2px',
                  marginLeft: '0.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  color: 'var(--text-dim)',
                }}
              >
                <X size={13} />
              </button>
            )}
          </div>
        </div>
      </div>
    </form>
  );
};
