const {
  getTasks,
  createTask,
  deleteTask,
  updateTask,
} = require('../models/tasks.model');

const getAllTasks = async (req, res) => {
  const tasks = await getTasks();

  return res.status(200).json(tasks);
};

const createOneTask = async (req, res) => {
  const createdTask = await createTask(req.body);
  return res.status(201).json(createdTask);
};

const deleteOneTask = async (req, res) => {
  const { id } = req.params;

  await deleteTask(id);

  return res.status(204).json();
};

const updateOneTask = async (req, res) => {
  const { id } = req.params;
  const task = req.body;

  await updateTask(id, task);

  return res.status(204).json();
};

module.exports = {
  getAllTasks,
  createOneTask,
  deleteOneTask,
  updateOneTask,
};
