const db = require('../db');

class Task {
    constructor(projectName, taskName, progress, totalProgress, date, userId) {
        this.projectName = projectName;
        this.taskName = taskName;
        this.progress = progress;
        this.totalProgress = totalProgress;
        this.date = date;
        this.userId = userId;
    }

    async save() {
        try {
            const [result] = await db.execute(
                `INSERT INTO tasks (projectName, taskName, progress, totalProgress, date, userId)
                 VALUES (?, ?, ?, ?, ?, ?)`,
                [
                    this.projectName,
                    this.taskName,
                    this.progress,
                    this.totalProgress,
                    this.date,
                    this.userId
                ]
            );
            return result;
        } catch (err) {
            console.error('Task save error:', err);
            throw err;
        }
    }

    static async findAllByUser(userId) {
        try {
            const [rows] = await db.execute(
                'SELECT * FROM tasks WHERE userId = ?',
                [userId]
            );
            return rows;
        } catch (err) {
            console.error('Find tasks error:', err);
            throw err;
        }
    }

    static async findById(taskId) {
        try {
            const [rows] = await db.execute(
                'SELECT * FROM tasks WHERE id = ?',
                [taskId]
            );
            return rows[0];
        } catch (err) {
            console.error('Find task by ID error:', err);
            throw err;
        }
    }
}

module.exports = Task;
