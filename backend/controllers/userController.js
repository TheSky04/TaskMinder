const User = require("../models/userModel");

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.getAll();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateUserRole = async (req, res) => {
    const { id } = req.params;
    const { role } = req.body;

    if (!role) return res.status(400).json({ message: "Role is required" });

    try {
        const user = await User.getById(id);
        if (!user) return res.status(404).json({ message: "User not found" });

        await User.update(id, { name: user.name, email: user.email, password: user.password, role });
        res.json({ message: "User role updated successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

