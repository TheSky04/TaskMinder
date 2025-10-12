const Task = require('../models/taskModel');

const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.findAll();

        res.status(200).json(tasks);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

const getTasksCreatedByMe = async (req, res) => {
    try {
        const userId = req.user.id;
        const tasks = await Task.findTasksCreatedByMe(userId);

        res.status(200).json(tasks);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

const getTasksOfUser = async (req, res) => {
    try {
        const userId = req.user.id;
        const tasks = await Task.findAllByUser(userId);

        res.status(200).json(tasks);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};


// Yeni görev oluşturma
const createTask = async (req, res) => {
    try {
        const { projectName, taskName, progress, date, responsiblePerson, priority } = req.body;
        const userId = req.user.id; // Görev yaratan kişi

        if (!projectName || !taskName || !progress || !date || !responsiblePerson || !priority) {
            return res.status(400).json({ message: "All fields except progress are required" });
        }

        const task = new Task(projectName, taskName, progress, date, responsiblePerson, priority, userId);
        const result = await task.save();

        res.status(201).json({ message: "Task created successfully", taskId: result.insertId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

// Tek görev çekme
const getTaskById = async (req, res) => {
    try {
        const taskId = req.params.taskId;
        const task = await Task.findById(taskId);

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json(task);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

// Görev güncelleme
const updateTask = async (req, res) => {
    try {
        const { projectName, taskName, progress, date, responsiblePerson, priority } = req.body;
        const userId = req.user.id;
        const taskId = req.params.taskId;

        if (!projectName || !taskName || !progress || !date || !responsiblePerson || !priority) {
            return res.status(400).json({ message: "All fields except progress are required" });
        }

        const task = new Task(projectName, taskName, progress, date, responsiblePerson, priority, userId);
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

// Görev silme
const deleteTask = async (req, res) => {
    try {
        const userId = req.user.id;
        const taskId = req.params.taskId;

        const result = await Task.delete(taskId, userId);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Task not found or not authorized" });
        }

        res.status(200).json({ message: "Task deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = {
    createTask,
    getAllTasks,
    getTasksOfUser,
    getTasksCreatedByMe,
    getTaskById,
    updateTask,
    deleteTask
};
