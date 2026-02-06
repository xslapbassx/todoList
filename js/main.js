import { loadTasks } from './storage.js';
import { initFilters } from './filters.js';
import { addTaskFactory, initEditing } from './tasks.js';

// Get DOM elements
const input = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');

// Get filter buttons
const showAll = document.getElementById('showAll');
const showActive = document.getElementById('showActive');
const showCompleted = document.getElementById('showCompleted');

// Add task
const addTask = addTaskFactory({ input, taskList });

// Event listeners
addTaskButton.addEventListener('click', () => addTask());
input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') addTask();
});

// Initialize
initEditing(taskList);
initFilters(taskList, { showAll, showActive, showCompleted });

// Load tasks
window.addEventListener('load', () => {
    loadTasks(addTask);
});