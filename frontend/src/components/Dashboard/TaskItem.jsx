import React, { useState } from 'react';
import { Check, Edit3, Trash2, Clock, Save, X } from 'lucide-react';

export const TaskItem = ({ task, onToggle, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleSave = async () => {
    if (!editedTitle.trim() || editedTitle === task.title) {
      setIsEditing(false);
      setEditedTitle(task.title);
      return;
    }
    setIsSaving(true);
    await onUpdate(task._id, { title: editedTitle.trim() });
    setIsSaving(false);
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') {
      setEditedTitle(task.title);
      setIsEditing(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    await onDelete(task._id);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div
      className="card-panel"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.85rem 1rem',
        marginBottom: '0.5rem',
        gap: '0.75rem',
        backgroundColor: task.completed ? 'var(--bg-input)' : '#ffffff',
        borderColor: 'var(--border-color)',
        opacity: isDeleting ? 0.4 : 1,
      }}
    >
      {/* Left: Checkbox & Title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1, minWidth: 0 }}>
        <button
          onClick={() => onToggle(task._id, !task.completed)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          aria-label={task.completed ? "Mark task pending" : "Mark task completed"}
        >
          {task.completed ? (
            <div style={{
              width: '20px',
              height: '20px',
              borderRadius: '4px',
              backgroundColor: 'var(--success)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
            }}>
              <Check size={14} strokeWidth={3} />
            </div>
          ) : (
            <div style={{
              width: '20px',
              height: '20px',
              borderRadius: '4px',
              border: '1.5px solid #cbd5e1',
              backgroundColor: '#ffffff',
            }} />
          )}
        </button>

        {isEditing ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flex: 1 }}>
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
              className="input-field"
              style={{ padding: '0.35rem 0.65rem', fontSize: '0.9rem' }}
            />
            <button
              onClick={handleSave}
              className="btn btn-primary"
              style={{ padding: '0.35rem 0.55rem' }}
              disabled={isSaving}
              title="Save"
            >
              <Save size={15} />
            </button>
            <button
              onClick={() => { setIsEditing(false); setEditedTitle(task.title); }}
              className="btn btn-secondary"
              style={{ padding: '0.35rem 0.55rem' }}
              title="Cancel"
            >
              <X size={15} />
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
            <span
              style={{
                fontSize: '0.9rem',
                fontWeight: 500,
                color: task.completed ? 'var(--text-dim)' : 'var(--text-main)',
                textDecoration: task.completed ? 'line-through' : 'none',
                wordBreak: 'break-word',
              }}
            >
              {task.title}
            </span>
            {task.createdAt && (
              <span style={{
                fontSize: '0.7rem',
                color: 'var(--text-dim)',
                marginTop: '0.1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem'
              }}>
                <Clock size={10} />
                {formatDate(task.createdAt)}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Right: Edit & Delete Buttons */}
      {!isEditing && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
          <button
            onClick={() => setIsEditing(true)}
            className="btn-icon"
            title="Edit Task"
            aria-label="Edit Task"
          >
            <Edit3 size={15} />
          </button>
          <button
            onClick={handleDelete}
            className="btn-icon btn-danger-ghost"
            title="Delete Task"
            aria-label="Delete Task"
            disabled={isDeleting}
          >
            <Trash2 size={15} />
          </button>
        </div>
      )}
    </div>
  );
};
