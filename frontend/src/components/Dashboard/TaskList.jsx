import React from 'react';
import { TaskItem } from './TaskItem';
import { CheckCircle, Inbox, ListTodo } from 'lucide-react';

export const TaskList = ({
  tasks,
  isLoading,
  activeFilter,
  searchQuery,
  onToggle,
  onUpdate,
  onDelete
}) => {
  if (isLoading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="card-panel"
            style={{
              padding: '1.25rem',
              height: '52px',
              opacity: 0.6,
              backgroundColor: '#f1f5f9'
            }}
          />
        ))}
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div
        className="card-panel"
        style={{
          padding: '3rem 1.5rem',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#ffffff'
        }}
      >
        <div style={{
          width: '46px',
          height: '46px',
          borderRadius: '50%',
          backgroundColor: 'var(--bg-input)',
          border: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--text-dim)',
          marginBottom: '0.85rem'
        }}>
          {activeFilter === 'completed' ? (
            <CheckCircle size={22} color="var(--success)" />
          ) : searchQuery ? (
            <Inbox size={22} />
          ) : (
            <ListTodo size={22} color="var(--primary)" />
          )}
        </div>

        <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.25rem' }}>
          {searchQuery
            ? `No tasks matching "${searchQuery}"`
            : activeFilter === 'completed'
            ? 'No completed tasks yet'
            : activeFilter === 'pending'
            ? 'No pending tasks'
            : 'No tasks yet'}
        </h3>

        <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', maxWidth: '280px' }}>
          {searchQuery
            ? 'Try searching with another keyword.'
            : activeFilter === 'completed'
            ? 'Completed tasks will show up here.'
            : activeFilter === 'pending'
            ? 'You have cleared all pending items.'
            : 'Add your first task above to get started.'}
        </p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          onToggle={onToggle}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
