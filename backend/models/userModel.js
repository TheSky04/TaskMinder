const db = require("../db");
const bcrypt = require("bcryptjs");

class User {
    constructor(id, name, email, password, role, created_at) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
        this.created_at = created_at;
    }

    static async getAll() {
        const [rows] = await db.query("SELECT * FROM users");
        return rows.map(row => new User(row.id, row.name, row.email, row.password, row.role, row.created_at));
    }

    static async getById(id) {
        const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [id]);
        if (!rows.length) return null;
        const row = rows[0];
        return new User(row.id, row.name, row.email, row.password, row.role, row.created_at);
    }

    static async getByEmail(email) {
        const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
        if (!rows.length) return null;
        const { id, name, password, role, created_at } = rows[0];
        return new User(id, name, email, password, role, created_at);
    }

    static async create({ name, email, password, role = "user" }) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await db.query(
            "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
            [name, email, hashedPassword, role]
        );
        return new User(result.insertId, name, email, hashedPassword, role);
    }

    static async update(id, { name, email, password, role }) {
        const hashedPassword = await bcrypt.hash(password, 10);
        await db.query(
            "UPDATE users SET name = ?, email = ?, password = ?, role = ? WHERE id = ?",
            [name, email, hashedPassword, role, id]
        );
        return new User(id, name, email, hashedPassword, role);
    }

    static async delete(id) {
        await db.query("DELETE FROM users WHERE id = ?", [id]);
        return { message: "User deleted" };
    }
}

module.exports = User;
