// API client utility for Smart ToDo API

const API_BASE = '/api';

/**
 * Helper to make HTTP requests with automatic Authorization header
 */
async function request(endpoint, options = {}) {
  const token = localStorage.getItem('smart_todo_token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    // If unauthorized / token expired, trigger custom event to log out
    if (response.status === 401 && token) {
      window.dispatchEvent(new CustomEvent('auth:expired'));
    }
    const error = new Error(data.message || 'Something went wrong');
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

export const authApi = {
  login: async (credentials) => {
    return request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  register: async (userData) => {
    return request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },
};

export const taskApi = {
  getTasks: async () => {
    return request('/tasks');
  },

  createTask: async (taskData) => {
    return request('/tasks', {
      method: 'POST',
      body: JSON.stringify(taskData),
    });
  },

  updateTask: async (id, updateData) => {
    return request(`/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updateData),
    });
  },

  deleteTask: async (id) => {
    return request(`/tasks/${id}`, {
      method: 'DELETE',
    });
  },
};
