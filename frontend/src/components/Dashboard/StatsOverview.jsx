import React from 'react';
import { ListTodo, CheckCircle2, Clock, Flame, AlertCircle } from 'lucide-react';

export const StatsOverview = ({ tasks = [] }) => {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const pending = total - completed;
  const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

  // High priority pending tasks
  const highPriorityCount = tasks.filter(
    (t) => !t.completed && t.priority === 'high'
  ).length;

  // Overdue pending tasks
  const todayMidnight = new Date();
  todayMidnight.setHours(0, 0, 0, 0);

  const overdueCount = tasks.filter((t) => {
    if (t.completed || !t.dueDate) return false;
    const due = new Date(t.dueDate);
    due.setHours(0, 0, 0, 0);
    return due < todayMidnight;
  }).length;

  return (
    <div
      className="card-panel"
      style={{
        padding: '1.25rem',
        marginBottom: 0,
        backgroundColor: 'var(--bg-card)',
        border: '1.5px solid var(--border-color)',
      }}
    >
      {/* Metrics Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
          gap: '0.85rem',
          marginBottom: '1.15rem',
        }}
      >
        {/* Total Card */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)',
            padding: '0.9rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
          }}
        >
          <div
            style={{
              padding: '0.55rem',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'var(--navy-light)',
              color: 'var(--navy)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ListTodo size={20} />
          </div>
          <div>
            <div style={{ fontSize: '0.74rem', fontWeight: 600, color: 'var(--text-muted)' }}>Total Tasks</div>
            <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-main)' }}>{total}</div>
          </div>
        </div>

        {/* Pending Card */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)',
            padding: '0.9rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
          }}
        >
          <div
            style={{
              padding: '0.55rem',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'var(--warning-bg)',
              color: 'var(--warning-text)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Clock size={20} />
          </div>
          <div>
            <div style={{ fontSize: '0.74rem', fontWeight: 600, color: 'var(--text-muted)' }}>Pending</div>
            <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--warning-text)' }}>{pending}</div>
          </div>
        </div>

        {/* High Priority Card */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)',
            padding: '0.9rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
          }}
        >
          <div
            style={{
              padding: '0.55rem',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'var(--danger-bg)',
              color: 'var(--danger-text)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Flame size={20} />
          </div>
          <div>
            <div style={{ fontSize: '0.74rem', fontWeight: 600, color: 'var(--text-muted)' }}>High Priority</div>
            <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--danger-text)' }}>{highPriorityCount}</div>
          </div>
        </div>

        {/* Done / Overdue Card */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)',
            padding: '0.9rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
          }}
        >
          <div
            style={{
              padding: '0.55rem',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: overdueCount > 0 ? 'var(--danger-bg)' : 'var(--success-bg)',
              color: overdueCount > 0 ? 'var(--danger-text)' : 'var(--success-text)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {overdueCount > 0 ? <AlertCircle size={20} /> : <CheckCircle2 size={20} />}
          </div>
          <div>
            <div style={{ fontSize: '0.74rem', fontWeight: 600, color: 'var(--text-muted)' }}>
              {overdueCount > 0 ? 'Overdue' : 'Completed'}
            </div>
            <div
              style={{
                fontSize: '1.3rem',
                fontWeight: 800,
                color: overdueCount > 0 ? 'var(--danger-text)' : 'var(--success-text)',
              }}
            >
              {overdueCount > 0 ? overdueCount : completed}
            </div>
          </div>
        </div>
      </div>

      {/* Completion Progress Bar */}
      <div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '0.45rem',
            fontSize: '0.84rem',
            color: 'var(--text-muted)',
          }}
        >
          <span style={{ fontWeight: 600 }}>Overall Completion</span>
          <span style={{ fontWeight: 800, color: 'var(--text-main)' }}>
            {completed} of {total} done ({progress}%)
          </span>
        </div>
        <div
          style={{
            width: '100%',
            height: '8px',
            backgroundColor: '#E2E8F0',
            borderRadius: 'var(--radius-full)',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: '100%',
              backgroundColor: progress === 100 ? 'var(--success)' : 'var(--primary)',
              borderRadius: 'var(--radius-full)',
              transition: 'width 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          />
        </div>
      </div>
    </div>
  );
};
