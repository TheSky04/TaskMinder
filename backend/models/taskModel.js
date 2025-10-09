const db = require('../db');

class Task {
    constructor(projectName, taskName, progress, date, responsiblePerson, priority, userId) {
        this.projectName = projectName;
        this.taskName = taskName;
        this.progress = progress;
        this.date = date;
        this.responsiblePerson = responsiblePerson; // userId
        this.priority = priority;
        this.userId = userId; // görevi oluşturan kullanıcı ID’si
    }

    // Yeni görev oluşturma
    async save() {
        try {
            const [result] = await db.execute(
                `INSERT INTO tasks (projectName, taskName, progress, date, responsiblePerson, priority, userId)
                 VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [
                    this.projectName,
                    this.taskName,
                    this.progress,
                    this.date,
                    this.responsiblePerson,
                    this.priority,
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
        const [rows] = await db.execute(
            `SELECT t.*, u.name AS responsiblePersonName
            FROM tasks t
            LEFT JOIN users u ON t.responsiblePerson = u.id
            WHERE t.userId = ?`,
            [userId]
        );
        return rows;
    }


    // Tek görev çekme
    static async findById(taskId) {
        try {
            const [rows] = await db.execute(
                `SELECT t.*, u.username AS responsiblePersonName
                 FROM tasks t
                 LEFT JOIN users u ON t.responsiblePerson = u.id
                 WHERE t.id = ?`,
                [taskId]
            );
            return rows[0];
        } catch (err) {
            console.error('Find task by ID error:', err);
            throw err;
        }
    }

    // Görev güncelleme
    async update(taskId) {
        try {
            const sql = `
                UPDATE tasks 
                SET projectName = ?, taskName = ?, progress = ?, date = ?, responsiblePerson = ?, priority = ?
                WHERE id = ? AND userId = ?`;
            const values = [
                this.projectName,
                this.taskName,
                this.progress,
                this.date,
                this.responsiblePerson,
                this.priority,
                taskId,
                this.userId
            ];
            return db.execute(sql, values);
        } catch (err) {
            console.error('Task update error:', err);
            throw err;
        }
    }

    // Görev silme
    static async delete(taskId, userId) {
        try {
            const [result] = await db.execute(
                'DELETE FROM tasks WHERE id = ? AND userId = ?',
                [taskId, userId]
            );
            return result;
        } catch (err) {
            console.error('Task delete error:', err);
            throw err;
        }
    }
}

module.exports = Task;
