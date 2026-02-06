import { saveFilter, loadFilter } from './storage.js';

// Apply the filter
export function applyFilter(taskList, filter) {
    taskList.querySelectorAll('li').forEach(li => {
        const completed = li.querySelector('.checkbox').checked;


        if (filter === 'all') li.style.display = 'flex';
        if (filter === 'active') li.style.display = completed ? 'none' : 'flex';
        if (filter === 'completed') li.style.display = completed ? 'flex' : 'none';
    });
}

// Initialize the filters
export function initFilters(taskList, buttons) {
    const { showAll, showActive, showCompleted } = buttons;

    showAll.addEventListener('click', () => {
        applyFilter(taskList, 'all');
        saveFilter('all');
    });


    showActive.addEventListener('click', () => {
        applyFilter(taskList, 'active');
        saveFilter('active');
    });


    showCompleted.addEventListener('click', () => {
            applyFilter(taskList, 'completed');
            saveFilter('completed');
    });


    applyFilter(taskList, loadFilter());
}