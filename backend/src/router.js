const express = require('express');
const {
  validateFieldTitle,
  validateFieldStatus,
} = require('./middlewares/tasks.middleware');
const {
  getAllTasks,
  createOneTask,
  deleteOneTask,
  updateOneTask,
} = require('./controllers/tasks.controller');

const router = express.Router();

router.get('/tasks', getAllTasks);
router.post('/tasks', validateFieldTitle, createOneTask);
router.delete('/tasks/:id', deleteOneTask);
router.put(
  '/tasks/:id',
  validateFieldTitle,
  validateFieldStatus,
  updateOneTask
);

module.exports = router;
