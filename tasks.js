import { saveTasks } from './storage.js';
import { makeDraggable } from './drag.js';
import { applyFilter } from './filters.js';


export function addTaskFactory({ input, taskList }) {
    return function addTask(taskText = input.value.trim(), completed = false) {
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


        deleteButton.addEventListener('click', () => {
            li.remove();
            saveTasks(taskList);
            applyFilter(taskList, localStorage.getItem('filter') || 'all');
        });


        checkbox.addEventListener('change', () => {
            span.classList.toggle('completed', checkbox.checked);
            saveTasks(taskList);
            applyFilter(taskList, localStorage.getItem('filter') || 'all');
        });


        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteButton);


        makeDraggable(li, taskList, () => {
            saveTasks(taskList);
            applyFilter(taskList, localStorage.getItem('filter') || 'all');
        });


        taskList.appendChild(li);


        input.value = '';
        saveTasks(taskList);
        applyFilter(taskList, localStorage.getItem('filter') || 'all');
    };
}


export function initEditing(taskList) {
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
            saveTasks(taskList);
            applyFilter(taskList, localStorage.getItem('filter') || 'all');
        });


        editInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') editInput.blur();
            if (e.key === 'Escape') {
                span.textContent = originalText;
                li.replaceChild(span, editInput);
            }
        });
    });
}
