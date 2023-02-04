const tbody = document.querySelector('tbody');
const addForm = document.querySelector('.add-form');
const inputTask = document.querySelector('.input-task');

const fetchTasks = async () => {
  const response = await fetch('http://localhost:3333/tasks');
  const data = await response.json();

  return data;
};

const addTask = async (e) => {
  e.preventDefault();

  const task = {
    title: inputTask.value,
  };

  await fetch('http://localhost:3333/tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });

  loadTasks();
  inputTask.value = '';
};

const deleteTask = async (id) => {
  await fetch(`http://localhost:3333/tasks/${id}`, {
    method: 'DELETE',
  });

  loadTasks();
};

const updateTask = async ({ id, title, status }) => {
  await fetch(`http://localhost:3333/tasks/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, status }),
  });

  loadTasks();
};

const editTask = (tdTitle, title, id) => {
  tdTitle.innerText = '';

  const editForm = createElement('form');
  const editInput = createElement('input');

  editForm.addEventListener('submit', (e) => {
    e.preventDefault();

    updateTask({ id, title: editInput.value, status: 'pendente' });
  });

  editInput.value = title;
  editForm.appendChild(editInput);
  tdTitle.appendChild(editForm);
};

const createElement = (tag, innerText = '', innerHTML = '') => {
  const element = document.createElement(tag);

  if (innerText) {
    element.innerText = innerText;
  }

  if (innerHTML) {
    element.innerHTML = innerHTML;
  }

  return element;
};

const createSelect = (value) => {
  const options = `
    <option value="pendente">Pendente</option>
    <option value="em andamento">Em andamento</option>
    <option value="concluida">Concluída</option>
  `;

  const select = createElement('select', '', options);
  select.value = value;

  return select;
};

const formatDate = (dateUTC) => {
  const options = { dateStyle: 'long', timeStyle: 'short' };
  const date = new Date(dateUTC).toLocaleString('pt-br', options);
  return date;
};

const createTask = (task) => {
  const { id, title, created_at, status } = task;

  const tr = createElement('tr');
  const tdTitle = createElement('td', title);
  const tdCreatedAt = createElement('td', formatDate(created_at));
  const tdStatus = createElement('td');
  const select = createSelect(status);
  tdStatus.appendChild(select);

  const tdActions = createElement('td');
  const editButton = createElement(
    'button',
    '',
    '<i class="ri-pencil-line"></i>'
  );
  editButton.classList.add('btn-action');

  const deleteButton = createElement(
    'button',
    '',
    '<i class="ri-delete-bin-line"></i>'
  );
  deleteButton.classList.add('btn-action');

  tdActions.appendChild(editButton);
  tdActions.appendChild(deleteButton);

  tr.appendChild(tdTitle);
  tr.appendChild(tdCreatedAt);
  tr.appendChild(tdStatus);
  tr.appendChild(tdActions);

  if (status === 'concluida') {
    tdTitle.classList.add('done');
  }

  select.addEventListener('change', ({ target }) =>
    updateTask({ ...task, status: target.value })
  );

  editButton.addEventListener('click', () =>
    editTask(tdTitle, title, id, status)
  );

  deleteButton.addEventListener('click', () => {
    deleteTask(id);
  });

  return tr;
};

const loadTasks = async () => {
  const tasks = await fetchTasks();
  tbody.innerHTML = '';

  tasks.map((task) => {
    const tr = createTask(task);
    tbody.appendChild(tr);
  });
};

addForm.addEventListener('submit', addTask);

loadTasks();
