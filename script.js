let tasks = [];

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('addTaskBtn').addEventListener('click', addTask);
});

function addTask() {
  const taskText = document.getElementById('taskText').value.trim();
  const taskDateTime = document.getElementById('taskDateTime').value;
  
  if (!taskText) {
    alert('Please enter a task');
    return;
  }

  const task = {
    id: Date.now(),
    text: taskText,
    datetime: taskDateTime,
    completed: false
  };

  tasks.push(task);
  document.getElementById('taskText').value = '';
  document.getElementById('taskDateTime').value = '';
  renderTasks();
}

function renderTasks() {
  const list = document.getElementById('taskList');
  list.innerHTML = '';

  tasks.forEach(task => {
    const li = document.createElement('li');
    li.className = task.completed ? 'completed' : '';

    const taskText = document.createElement('span');
    taskText.textContent = `${task.text} (${task.datetime ? formatDateTime(task.datetime) : 'No date'})`;
    li.appendChild(taskText);

    const actions = document.createElement('div');
    actions.className = 'task-actions';

    const editBtn = document.createElement('button');
    editBtn.className = 'action edit';
    editBtn.textContent = 'Edit';
    editBtn.onclick = () => editTask(task.id);

    const doneBtn = document.createElement('button');
    doneBtn.className = 'action done';
    doneBtn.textContent = task.completed ? 'Undo' : 'Done';
    doneBtn.onclick = () => toggleComplete(task.id);

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'action delete';
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = () => deleteTask(task.id);

    actions.appendChild(editBtn);
    actions.appendChild(doneBtn);
    actions.appendChild(deleteBtn);
    li.appendChild(actions);
    list.appendChild(li);
  });
}

function editTask(id) {
  const task = tasks.find(t => t.id === id);
  const newText = prompt('Edit your task:', task.text);
  if (newText !== null && newText.trim() !== '') {
    task.text = newText.trim();
    renderTasks();
  }
}

function toggleComplete(id) {
  const task = tasks.find(t => t.id === id);
  task.completed = !task.completed;
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  renderTasks();
}

function formatDateTime(dateTimeStr) {
  const date = new Date(dateTimeStr);
  return date.toLocaleString();
}