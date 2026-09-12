import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const Toast = ({ toasts, onDismiss }) => {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container" role="status" aria-live="polite">
      {toasts.map((toast) => {
        const icons = {
          success: <CheckCircle2 size={20} color="#10b981" />,
          error: <AlertCircle size={20} color="#ef4444" />,
          info: <Info size={20} color="#6366f1" />
        };

        return (
          <div
            key={toast.id}
            className={`toast toast-${toast.type || 'info'}`}
          >
            {icons[toast.type] || icons.info}
            <span style={{ flex: 1 }}>{toast.message}</span>
            <button
              onClick={() => onDismiss(toast.id)}
              className="btn-icon"
              style={{ padding: '2px', color: 'var(--text-dim)' }}
              aria-label="Close notification"
            >
              <X size={16} />
            </button>
          </div>
        );
      })}
    </div>
  );
};
