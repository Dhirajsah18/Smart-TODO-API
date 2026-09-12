import React, { useState, useEffect, useMemo } from 'react';
import { taskApi } from '../../services/api';
import { Header } from './Header';
import { StatsOverview } from './StatsOverview';
import { TaskInput } from './TaskInput';
import { TaskFilters } from './TaskFilters';
import { TaskList } from './TaskList';

export const DashboardView = ({ addToast }) => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  // Load tasks on mount
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setIsLoading(true);
    try {
      const data = await taskApi.getTasks();
      setTasks(Array.isArray(data) ? data : []);
    } catch (err) {
      addToast(err.message || 'Failed to load tasks', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddTask = async (title) => {
    setIsCreating(true);
    try {
      const newTask = await taskApi.createTask({ title });
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
      if (sortBy === 'alphabetical') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });

    return result;
  }, [tasks, activeFilter, searchQuery, sortBy]);

  const counts = useMemo(() => ({
    all: tasks.length,
    pending: tasks.filter((t) => !t.completed).length,
    completed: tasks.filter((t) => t.completed).length,
  }), [tasks]);

  return (
    <div className="main-content">
      <Header />
      <StatsOverview tasks={tasks} />
      <TaskInput onAddTask={handleAddTask} isCreating={isCreating} />
      <TaskFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
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
  );
};
