import React, { useState } from 'react';
import { Check, Edit3, Trash2, Calendar, Clock, Save, X, AlertCircle } from 'lucide-react';

export const TaskItem = ({ task, onToggle, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedPriority, setEditedPriority] = useState(task.priority || 'medium');
  const [editedDueDate, setEditedDueDate] = useState(
    task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : ''
  );
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleSave = async () => {
    if (!editedTitle.trim()) {
      setIsEditing(false);
      setEditedTitle(task.title);
      return;
    }
    setIsSaving(true);
    await onUpdate(task._id, {
      title: editedTitle.trim(),
      priority: editedPriority,
      dueDate: editedDueDate || null,
    });
    setIsSaving(false);
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') {
      cancelEdit();
    }
  };

  const cancelEdit = () => {
    setEditedTitle(task.title);
    setEditedPriority(task.priority || 'medium');
    setEditedDueDate(task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '');
    setIsEditing(false);
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    await onDelete(task._id);
  };

  const getDueDateInfo = (dueDateString) => {
    if (!dueDateString) return null;
    const due = new Date(dueDateString);
    if (isNaN(due.getTime())) return null;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const dueMidnight = new Date(due);
    dueMidnight.setHours(0, 0, 0, 0);

    const diffDays = Math.round((dueMidnight - today) / (1000 * 60 * 60 * 24));
    const formatted = due.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
    });

    if (diffDays < 0) {
      return {
        label: `Overdue (${formatted})`,
        className: 'badge-due-overdue',
        isOverdue: true,
      };
    }
    if (diffDays === 0) {
      return {
        label: 'Due Today',
        className: 'badge-due-today',
        isOverdue: false,
      };
    }
    if (diffDays === 1) {
      return {
        label: 'Tomorrow',
        className: 'badge-due-tomorrow',
        isOverdue: false,
      };
    }
    return {
      label: `Due ${formatted}`,
      className: 'badge-due-upcoming',
      isOverdue: false,
    };
  };

  const dueDateInfo = getDueDateInfo(task.dueDate);
  const priority = task.priority || 'medium';

  return (
    <div
      className="card-panel"
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '0.85rem 1.15rem',
        marginBottom: '0.65rem',
        gap: '0.5rem',
        backgroundColor: task.completed ? '#F8FAFC' : '#FFFFFF',
        borderColor: isEditing ? 'var(--primary)' : 'var(--border-color)',
        opacity: isDeleting ? 0.4 : 1,
        boxShadow: 'var(--shadow-sm)',
        transition: 'all 0.15s ease',
      }}
    >
      {/* Primary Row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.85rem' }}>
        {/* Left: Checkbox & Content */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem', flex: 1, minWidth: 0 }}>
          <button
            onClick={() => onToggle(task._id, !task.completed)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '2px 0 0 0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            aria-label={task.completed ? 'Mark task pending' : 'Mark task completed'}
          >
            {task.completed ? (
              <div
                style={{
                  width: '21px',
                  height: '21px',
                  borderRadius: '5px',
                  backgroundColor: 'var(--success)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                }}
              >
                <Check size={14} strokeWidth={3} />
              </div>
            ) : (
              <div
                style={{
                  width: '21px',
                  height: '21px',
                  borderRadius: '5px',
                  border: '2px solid #CBD5E1',
                  backgroundColor: '#FFFFFF',
                  transition: 'all 0.15s ease',
                }}
              />
            )}
          </button>

          {isEditing ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', flex: 1 }}>
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                onKeyDown={handleKeyDown}
                autoFocus
                className="input-field"
                style={{ padding: '0.45rem 0.75rem', fontSize: '0.94rem' }}
              />

              {/* Edit Priority & Due Date Inline */}
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <span style={{ fontSize: '0.76rem', fontWeight: 600, color: 'var(--text-muted)' }}>Priority:</span>
                  <select
                    value={editedPriority}
                    onChange={(e) => setEditedPriority(e.target.value)}
                    style={{
                      padding: '0.25rem 0.55rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-color)',
                      backgroundColor: '#FFFFFF',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      color: 'var(--text-main)',
                      outline: 'none',
                    }}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <span style={{ fontSize: '0.76rem', fontWeight: 600, color: 'var(--text-muted)' }}>Due:</span>
                  <input
                    type="date"
                    value={editedDueDate}
                    onChange={(e) => setEditedDueDate(e.target.value)}
                    style={{
                      padding: '0.2rem 0.5rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-color)',
                      backgroundColor: '#FFFFFF',
                      color: 'var(--text-main)',
                      fontSize: '0.78rem',
                      outline: 'none',
                    }}
                  />
                  {editedDueDate && (
                    <button
                      type="button"
                      onClick={() => setEditedDueDate('')}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: 'var(--text-dim)',
                        padding: '2px',
                      }}
                      title="Clear date"
                    >
                      <X size={13} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
              <span
                style={{
                  fontSize: '0.94rem',
                  fontWeight: 600,
                  color: task.completed ? 'var(--text-dim)' : 'var(--text-main)',
                  textDecoration: task.completed ? 'line-through' : 'none',
                  wordBreak: 'break-word',
                  lineHeight: 1.4,
                }}
              >
                {task.title}
              </span>

              {/* Tags & Metadata row */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '0.5rem',
                  marginTop: '0.35rem',
                }}
              >
                {/* Priority Chip */}
                <span className={`badge badge-priority-${priority}`}>
                  <span className={`priority-dot priority-dot-${priority}`} />
                  {priority}
                </span>

                {/* Due Date Chip */}
                {dueDateInfo && (
                  <span
                    className={`badge ${dueDateInfo.className}`}
                    style={{ textTransform: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}
                  >
                    {dueDateInfo.isOverdue ? (
                      <AlertCircle size={12} strokeWidth={2.5} />
                    ) : (
                      <Calendar size={12} />
                    )}
                    {dueDateInfo.label}
                  </span>
                )}

                {/* Created Date */}
                {task.createdAt && !dueDateInfo && (
                  <span
                    style={{
                      fontSize: '0.72rem',
                      color: 'var(--text-dim)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      marginLeft: '0.1rem',
                    }}
                  >
                    <Clock size={11} />
                    {new Date(task.createdAt).toLocaleDateString(undefined, {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right: Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', alignSelf: 'flex-start' }}>
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="btn btn-primary"
                style={{ padding: '0.35rem 0.65rem', fontSize: '0.8rem' }}
                disabled={isSaving}
                title="Save"
              >
                <Save size={14} />
                <span>Save</span>
              </button>
              <button
                onClick={cancelEdit}
                className="btn btn-secondary"
                style={{ padding: '0.35rem 0.6rem' }}
                title="Cancel"
              >
                <X size={14} />
              </button>
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};
