const express = require('express');
const { createTask, getTasks } = require('../controllers/taskController');
const verifyToken = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', verifyToken, createTask);
router.get('/', verifyToken, getTasks);

module.exports = router;
