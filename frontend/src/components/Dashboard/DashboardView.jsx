import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { taskApi } from '../../services/api';
import { Header } from './Header';
import { StatsOverview } from './StatsOverview';
import { TaskInput } from './TaskInput';
import { TaskFilters } from './TaskFilters';
import { TaskList } from './TaskList';

const PRIORITY_WEIGHT = {
  high: 3,
  medium: 2,
  low: 1,
};

export const DashboardView = ({ addToast }) => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [activePriority, setActivePriority] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const fetchTasks = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await taskApi.getTasks();
      setTasks(Array.isArray(data) ? data : []);
    } catch (err) {
      addToast(err.message || 'Failed to load tasks', 'error');
    } finally {
      setIsLoading(false);
    }
  }, [addToast]);

  // Load tasks on mount
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleAddTask = async (taskData) => {
    setIsCreating(true);
    try {
      // Support both string or object parameter
      const payload = typeof taskData === 'string' ? { title: taskData } : taskData;
      const newTask = await taskApi.createTask(payload);
      setTasks((prev) => [newTask, ...prev]);
      addToast('Task added successfully!', 'success');
    } catch (err) {
      addToast(err.message || 'Failed to create task', 'error');
    } finally {
      setIsCreating(false);
    }
  };

  const handleToggleTask = async (id, completed) => {
    // Optimistic update
    setTasks((prev) =>
      prev.map((t) => (t._id === id ? { ...t, completed } : t))
    );

    try {
      await taskApi.updateTask(id, { completed });
    } catch (err) {
      // Revert on error
      setTasks((prev) =>
        prev.map((t) => (t._id === id ? { ...t, completed: !completed } : t))
      );
      addToast(err.message || 'Failed to update task status', 'error');
    }
  };

  const handleUpdateTask = async (id, updateData) => {
    try {
      const updated = await taskApi.updateTask(id, updateData);
      setTasks((prev) =>
        prev.map((t) => (t._id === id ? { ...t, ...updated } : t))
      );
      addToast('Task updated!', 'success');
    } catch (err) {
      addToast(err.message || 'Failed to update task', 'error');
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await taskApi.deleteTask(id);
      setTasks((prev) => prev.filter((t) => t._id !== id));
      addToast('Task deleted', 'info');
    } catch (err) {
      addToast(err.message || 'Failed to delete task', 'error');
    }
  };

  // Filter & Sort Logic
  const filteredAndSortedTasks = useMemo(() => {
    let result = [...tasks];

    // Filter by status
    if (activeFilter === 'pending') {
      result = result.filter((t) => !t.completed);
    } else if (activeFilter === 'completed') {
      result = result.filter((t) => t.completed);
    }

    // Filter by priority
    if (activePriority !== 'all') {
      result = result.filter((t) => (t.priority || 'medium') === activePriority);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter((t) => t.title.toLowerCase().includes(q));
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      }
      if (sortBy === 'oldest') {
        return new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
      }
      if (sortBy === 'priority') {
        const weightA = PRIORITY_WEIGHT[a.priority || 'medium'] || 2;
        const weightB = PRIORITY_WEIGHT[b.priority || 'medium'] || 2;
        if (weightB !== weightA) return weightB - weightA;
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      }
      if (sortBy === 'dueDate') {
        // Tasks with due dates appear first, sorted by soonest date
        if (a.dueDate && b.dueDate) {
          return new Date(a.dueDate) - new Date(b.dueDate);
        }
        if (a.dueDate) return -1;
        if (b.dueDate) return 1;
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      }
      if (sortBy === 'alphabetical') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });

    return result;
  }, [tasks, activeFilter, activePriority, searchQuery, sortBy]);

  const counts = useMemo(
    () => ({
      all: tasks.length,
      pending: tasks.filter((t) => !t.completed).length,
      completed: tasks.filter((t) => t.completed).length,
      high: tasks.filter((t) => (t.priority || 'medium') === 'high').length,
      medium: tasks.filter((t) => (t.priority || 'medium') === 'medium').length,
      low: tasks.filter((t) => (t.priority || 'medium') === 'low').length,
    }),
    [tasks]
  );

  return (
    <div className="main-content">
      <div className="dashboard-master-container">
        <Header />
        <StatsOverview tasks={tasks} />
        <TaskInput onAddTask={handleAddTask} isCreating={isCreating} />
        <TaskFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          activePriority={activePriority}
          onPriorityChange={setActivePriority}
          sortBy={sortBy}
          onSortChange={setSortBy}
          counts={counts}
        />
        <TaskList
          tasks={filteredAndSortedTasks}
          isLoading={isLoading}
          activeFilter={activeFilter}
          searchQuery={searchQuery}
          onToggle={handleToggleTask}
          onUpdate={handleUpdateTask}
          onDelete={handleDeleteTask}
        />
      </div>
    </div>
  );
};
