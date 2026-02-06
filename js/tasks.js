import { saveTasks } from './storage.js';
import { makeDraggable } from './drag.js';
import { applyFilter } from './filters.js';

// Add task
export function addTaskFactory({ input, taskList }) {
    return function addTask(taskText = input.value.trim(), completed = false) {
        if (!taskText) return;

        // Create task
        const li = document.createElement('li');
        li.classList.add('task');

        // Create checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('checkbox');
        checkbox.checked = completed;

        // Create span
        const span = document.createElement('span');
        span.textContent = taskText;
        if (completed) span.classList.add('completed');

        // Delete button
        const deleteButton = document.createElement('button');
        deleteButton.type = 'button';
        deleteButton.textContent = '🗑️';

        // Delete task
        deleteButton.addEventListener('click', () => {
            li.remove();
            saveTasks(taskList);
            applyFilter(taskList, localStorage.getItem('filter') || 'all');
        });

        // Complete task
        checkbox.addEventListener('change', () => {
            span.classList.toggle('completed', checkbox.checked);
            saveTasks(taskList);
            applyFilter(taskList, localStorage.getItem('filter') || 'all');
        });

        
        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteButton);

        // Make task draggable
        makeDraggable(li, taskList, () => {
            saveTasks(taskList);
            applyFilter(taskList, localStorage.getItem('filter') || 'all');
        });

        
        taskList.appendChild(li);

        // Clear input
        input.value = '';
        saveTasks(taskList);
        applyFilter(taskList, localStorage.getItem('filter') || 'all');
    };
}

// Edit task
export function initEditing(taskList) {
    taskList.addEventListener('click', (event) => {
        if (event.target.tagName !== 'SPAN') return;

        // Get span
        const span = event.target;
        const li = span.closest('li');
        const originalText = span.textContent;
        // Create edit input
        const editInput = document.createElement('input');
        editInput.type = 'text';
        editInput.value = originalText;
        editInput.classList.add('task-input-edit');

        // Replace span with edit input
        li.replaceChild(editInput, span);
        editInput.focus();
        editInput.select();

        // Save task
        editInput.addEventListener('blur', () => {
            const newText = editInput.value.trim();
            span.textContent = newText || originalText;
            li.replaceChild(span, editInput);
            saveTasks(taskList);
            applyFilter(taskList, localStorage.getItem('filter') || 'all');
        });

        // Cancel edit
        editInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') editInput.blur();
            if (e.key === 'Escape') {
                span.textContent = originalText;
                li.replaceChild(span, editInput);
            }
        });
    });
}
