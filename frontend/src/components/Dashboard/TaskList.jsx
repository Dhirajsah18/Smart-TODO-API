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
  onDelete,
}) => {
  if (isLoading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="card-panel"
            style={{
              padding: '1.25rem',
              height: '56px',
              opacity: 0.6,
              backgroundColor: '#F1F5F9',
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
          backgroundColor: '#FFFFFF',
          border: '1.5px solid var(--border-color)',
        }}
      >
        <div
          style={{
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            backgroundColor: 'var(--primary-light)',
            border: '1px solid rgba(252, 163, 17, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--c-amber)',
            marginBottom: '0.85rem',
          }}
        >
          {activeFilter === 'completed' ? (
            <CheckCircle size={24} color="var(--success)" />
          ) : searchQuery ? (
            <Inbox size={24} color="var(--c-amber)" />
          ) : (
            <ListTodo size={24} color="var(--c-amber)" />
          )}
        </div>

        <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.25rem' }}>
          {searchQuery
            ? `No tasks matching "${searchQuery}"`
            : activeFilter === 'completed'
            ? 'No completed tasks yet'
            : activeFilter === 'pending'
            ? 'No pending tasks'
            : 'No tasks yet'}
        </h3>

        <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', maxWidth: '300px', lineHeight: 1.4 }}>
          {searchQuery
            ? 'Try searching with another keyword or adjust filters.'
            : activeFilter === 'completed'
            ? 'Tasks marked done will show up here.'
            : activeFilter === 'pending'
            ? 'Great job! You have cleared all pending items.'
            : 'Add your first task above with a priority and due date to get started.'}
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
