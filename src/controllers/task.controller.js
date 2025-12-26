import Task from "../models/Task.js";

export const createTask = async (req, res) => {
    const task = await Task.create({
        ...req.body,
        user: req.user.userId
    });
    res
    .status(201)
    .json(task);
    };

    export const getTasks = async (req, res) => {
    const tasks = await Task.find({ user: req.user.userId });
    res.json(tasks);
    };

    export const updateTask = async (req, res) => {
    const task = await Task.findOneAndUpdate(
        { _id: req.params.id, user: req.user.userId },
        req.body,
        { new: true }
    );
    res.json(task);
    };

    export const deleteTask = async (req, res) => {
    await Task.findOneAndDelete({
        _id: req.params.id,
        user: req.user.userId
    });
    res.json({ message: "Task deleted" });
};
