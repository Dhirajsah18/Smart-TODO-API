import Task from "../models/Task.js";

export const createTask = async (req, res) => {
    try {
        const { title, dueDate, priority } = req.body;
        if (!title || !title.trim()) {
            return res.status(400).json({ message: "Task title is required" });
        }

        const validPriorities = ["low", "medium", "high"];
        const taskPriority = validPriorities.includes(priority) ? priority : "medium";

        const task = await Task.create({
            title: title.trim(),
            completed: req.body.completed || false,
            dueDate: dueDate ? new Date(dueDate) : null,
            priority: taskPriority,
            user: req.user.userId
        });
        res.status(201).json(task);
    } catch (error) {
        console.error("Create Task Error:", error);
        res.status(500).json({ message: error.message || "Failed to create task" });
    }
};

export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user.userId }).sort({ createdAt: -1 });
        res.json(tasks);
    } catch (error) {
        console.error("Get Tasks Error:", error);
        res.status(500).json({ message: error.message || "Failed to fetch tasks" });
    }
};

export const updateTask = async (req, res) => {
    try {
        const updateData = { ...req.body };
        if (updateData.title !== undefined) {
            updateData.title = updateData.title.trim();
        }
        if (updateData.dueDate !== undefined) {
            updateData.dueDate = updateData.dueDate ? new Date(updateData.dueDate) : null;
        }
        if (updateData.priority !== undefined) {
            const validPriorities = ["low", "medium", "high"];
            if (!validPriorities.includes(updateData.priority)) {
                updateData.priority = "medium";
            }
        }

        const task = await Task.findOneAndUpdate(
            { _id: req.params.id, user: req.user.userId },
            updateData,
            { new: true, runValidators: true }
        );

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.json(task);
    } catch (error) {
        console.error("Update Task Error:", error);
        res.status(500).json({ message: error.message || "Failed to update task" });
    }
};

export const deleteTask = async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({
            _id: req.params.id,
            user: req.user.userId
        });

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.json({ message: "Task deleted successfully" });
    } catch (error) {
        console.error("Delete Task Error:", error);
        res.status(500).json({ message: error.message || "Failed to delete task" });
    }
};
