const connection = require('./connection');

const getTasks = async () => {
  try {
    const [tasks] = await connection.execute('SELECT * FROM tasks');
    return tasks;
  } catch (error) {
    console.log(error);
  }
};

const createTask = async (task) => {
  try {
    const { title } = task;

    const dateUTC = new Date(Date.now()).toUTCString();
    const query = 'INSERT INTO tasks(title, status, created_at) VALUES (?,?,?)';

    const [createdTask] = await connection.execute(query, [
      title,
      'pendente',
      dateUTC,
    ]);

    return { insetId: createdTask.insertId };
  } catch (error) {
    console.log(error);
  }
};

const deleteTask = async (id) => {
  try {
    const removedTask = await connection.execute(
      'DELETE FROM tasks WHERE id = ?',
      [id]
    );

    return removedTask;
  } catch (error) {
    console.log(error);
  }
};

const updateTask = async (id, task) => {
  try {
    const query = 'UPDATE tasks SET title = ?, status = ? WHERE id = ?';
    const { title, status } = task;

    const [updatedTask] = await connection.execute(query, [title, status, id]);

    return updatedTask;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getTasks,
  createTask,
  deleteTask,
  updateTask,
};
