const express = require('express');
const { createTask, getAllTasks,updateTask,deleteTask,getTasksOfUser,getTasksCreatedByMe } = require('../controllers/taskController');
const verifyToken = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', verifyToken, createTask);
router.get('/', verifyToken, getAllTasks);
router.get('/me', verifyToken, getTasksOfUser);
router.get('/create/me', verifyToken, getTasksCreatedByMe);
router.patch('/:taskId', verifyToken, updateTask);
router.delete('/:taskId', verifyToken, deleteTask);

module.exports = router;
