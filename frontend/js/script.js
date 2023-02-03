const tbody = document.querySelector('tbody');

const getTasks = async () => {
  const response = await fetch('http://localhost:3333/tasks');
  const data = await response.json();

  return data;
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

const createSelect = () => {

}

const task = {
  id: 7,
  title: 'Estudar React',
  created_at: '02 de Janeiro de 2023 15:00',
  status: 'concluída',
};

const createTask = (task) => {
  const { id, title, created_at, status } = task;

  const tr = createElement('tr');
  const tdTitle = createElement('td', title);
  const tdCreatedAt = createElement('td', created_at);
  const tdStatus = createElement('td');
  const select = createElement('select');
  select.value = status
  const optionOne = createElement('option', 'Pendente');
  optionOne.value = 'pendente'
  const optionOTwo = createElement('option', 'Em Andamento');
  optionOTwo.value = 'em andamento'
  const optionTree = createElement('option', 'Concluida');
  optionTree.value = 'concluida'

  tdStatus.appendChild(select);
  select.appendChild(optionOne);
  select.appendChild(optionOTwo);
  select.appendChild(optionTree);

  const tdActions = createElement('td');
  const ButtonEdit = createElement(
    'button',
    '',
    '<i class="ri-pencil-line"></i>'
  );
  ButtonEdit.classList.add('btn-action');
  const ButtonDelete = createElement(
    'button',
    '',
    '<i class="ri-delete-bin-line"></i>'
  );
  ButtonDelete.classList.add('btn-action');

  tdActions.appendChild(ButtonEdit);
  tdActions.appendChild(ButtonDelete);

  tr.appendChild(tdTitle);
  tr.appendChild(tdCreatedAt);
  tr.appendChild(tdStatus);
  tr.appendChild(tdActions);

  tbody.appendChild(tr);
};

createTask(task);
