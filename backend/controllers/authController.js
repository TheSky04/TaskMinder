const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Joi = require("joi");


exports.register = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        const existingUser = await User.getByEmail(email);
        if (existingUser) return res.status(400).json({ message: "Email already exists" });

        const user = await User.create({ name, email, password, role });
        res.status(201).json({ message: "User registered successfully", user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.getByEmail(email);
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
        const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN });

        res.json({ token, refreshToken });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.refreshToken = (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(401).json({ message: "Refresh token missing" });

    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        const token = jwt.sign({ id: decoded.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
        res.json({ token });
    } catch (err) {
        res.status(403).json({ message: "Invalid refresh token" });
    }
};
