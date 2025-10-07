const Task = require('../models/taskModel');

const createTask = async (req, res) => {
    try {
        const { projectName, taskName, progress, totalProgress, date } = req.body;
        const userId = req.user.id; // JWT’den gelen kullanıcı ID

        const task = new Task(projectName, taskName, progress, totalProgress, date, userId);
        const result = await task.save();

        res.status(201).json({ message: "Task created successfully", taskId: result.insertId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

const getTasks = async (req, res) => {
    try {
        const userId = req.user.id;
        const tasks = await Task.findAllByUser(userId);
        res.status(200).json(tasks);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

const updateTask = async (req, res) => {
    try {
        const { projectName, taskName, progress, totalProgress, date } = req.body;
        const userId = req.user.id;
        const taskId = req.params.taskId;

        const task = new Task(projectName, taskName, progress, totalProgress, date, userId);

        const result = await task.update(taskId);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Task not found or not authorized" });
        }

        res.status(200).json({ message: "Task updated successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { createTask, getTasks, updateTask };
