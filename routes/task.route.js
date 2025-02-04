const express = require('express');
const router = express.Router();
const { createTask, getTasks, getTaskById, deleteTaskById, updateTask, deleteTasks } = require('../controllers/task.controller');

router.post('/create-task', createTask);
router.get('/tasks', getTasks);
router.get('/get-task/:id', getTaskById);
router.put('/update-tasks/:id', updateTask);
router.delete('/delete-task/:id', deleteTaskById);
router.delete('/delete-tasks', deleteTasks);

module.exports = router;