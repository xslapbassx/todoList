// Elements
const input = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');

const showAllButton = document.getElementById('showAll');
const showActiveButton = document.getElementById('showActive');
const showCompletedButton = document.getElementById('showCompleted');

// ----------------------
// Save / Load Tasks
// ----------------------
function saveTasks() {
    const tasks = [];

    taskList.querySelectorAll('li').forEach(li => {
        tasks.push({
            text: li.querySelector('span').textContent,
            completed: li.querySelector('.checkbox').checked
        });
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const saved = JSON.parse(localStorage.getItem('tasks')) || [];
    saved.forEach(task => addTask(task.text, task.completed));
}

// ----------------------
// Add Task
// ----------------------
function addTask(taskText = input.value.trim(), completed = false) {
    if (!taskText) return;

    const li = document.createElement('li');
    li.classList.add('task');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('checkbox');
    checkbox.checked = completed;

    const span = document.createElement('span');
    span.textContent = taskText;
    if (completed) span.classList.add('completed');

    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.textContent = '🗑️';

    // Delete Task
    deleteButton.addEventListener('click', () => {
        li.remove();
        saveTasks();
        applyCurrentFilter();
    });

    // Toggle Completed
    checkbox.addEventListener('change', () => {
        span.classList.toggle('completed', checkbox.checked);

        if (checkbox.checked) {
            taskList.appendChild(li);
        } else {
            taskList.insertBefore(li, taskList.firstChild);
        }

        saveTasks();
        applyCurrentFilter();
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteButton);
    taskList.appendChild(li);

    input.value = '';
    saveTasks();
    applyCurrentFilter();
}

// ----------------------
// Edit Task (Click on Task)
// ----------------------
taskList.addEventListener('click', (event) => {
    if (event.target.tagName !== 'SPAN') return;

    const span = event.target;
    const li = span.closest('li');
    const originalText = span.textContent;

    const editInput = document.createElement('input');
    editInput.type = 'text';
    editInput.value = originalText;
    editInput.classList.add('task-input-edit');

    li.replaceChild(editInput, span);
    editInput.focus();
    editInput.select();

    editInput.addEventListener('blur', () => {
        const newText = editInput.value.trim();
        span.textContent = newText || originalText;
        li.replaceChild(span, editInput);
        saveTasks();
        applyCurrentFilter();
    });

    editInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') editInput.blur();
        if (e.key === 'Escape') {
            span.textContent = originalText;
            li.replaceChild(span, editInput);
        }
    });
});

// ----------------------
// Filtering Tasks
// ----------------------
showAllButton.addEventListener('click', () => {
    taskList.querySelectorAll('li').forEach(li => {
        li.style.display = 'flex';
    });
    localStorage.setItem('filter', 'all');
});

showActiveButton.addEventListener('click', () => {
    taskList.querySelectorAll('li').forEach(li => {
        li.style.display = li.querySelector('.checkbox').checked ? 'none' : 'flex';
    });
    localStorage.setItem('filter', 'active');
});

showCompletedButton.addEventListener('click', () => {
    taskList.querySelectorAll('li').forEach(li => {
        li.style.display = li.querySelector('.checkbox').checked ? 'flex' : 'none';
    });
    localStorage.setItem('filter', 'completed');
});

function applyCurrentFilter() {
    const filter = localStorage.getItem('filter') || 'all';

    if (filter === 'all') showAllButton.click();
    if (filter === 'active') showActiveButton.click();
    if (filter === 'completed') showCompletedButton.click();
}

function loadFilter() {
    applyCurrentFilter();
}

// ----------------------
// Input Handler
// ----------------------
addTaskButton.addEventListener('click', () => addTask());

input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') addTask();
});

// ----------------------
// Initialization
// ----------------------
window.addEventListener('load', () => {
    loadTasks();
    loadFilter();
});
