const express = require('express');
const { createTask, getTasks,updateTask } = require('../controllers/taskController');
const verifyToken = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', verifyToken, createTask);
router.get('/', verifyToken, getTasks);
router.patch('/:taskId', verifyToken, updateTask);

module.exports = router;
