import { loadTasks } from './storage.js';
import { initFilters } from './filters.js';
import { addTaskFactory, initEditing } from './tasks.js';


const input = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');


const showAll = document.getElementById('showAll');
const showActive = document.getElementById('showActive');
const showCompleted = document.getElementById('showCompleted');


const addTask = addTaskFactory({ input, taskList });


addTaskButton.addEventListener('click', () => addTask());
input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') addTask();
});


initEditing(taskList);
initFilters(taskList, { showAll, showActive, showCompleted });


window.addEventListener('load', () => {
    loadTasks(addTask);
});