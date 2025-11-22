const input = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');

// Save tasks to local storage
function saveTasks() {
    const tasks = [];

    taskList.querySelectorAll('li').forEach((task) => {
        const checkbox = task.querySelector('.checkbox');
        const taskText = task.querySelector('span').textContent;
        tasks.push({ text: taskText, completed: checkbox.checked });
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
    window.dispatchEvent(new Event('save'));
}

// Load tasks from local storage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach((task) => {
        addTask(task.text, task.completed);
    });
}

function addTask(taskText , completed = false) {
    if (!taskText) {
        taskText = input.value.trim();
    }
        // Create the task item
    const li = document.createElement('li');
    li.classList.add('task');

    // Create the checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('checkbox');
    checkbox.checked = completed;

    // Create the text span
    const span = document.createElement('span');
    span.textContent = taskText;
    if (completed) span.classList.add('completed');

    // Add delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = '🗑️';
    
    deleteButton.addEventListener('click', () => {
        li.remove();            
        saveTasks();
    });
    
    // Toggle completed class when checkbox changes
    checkbox.addEventListener('change', () => {
        span.classList.toggle('completed', checkbox.checked);
        saveTasks();
    });

    // Build the task item
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteButton);
    taskList.appendChild(li);

    // Clear input field
    input.value = '';

    // Save tasks
    saveTasks();
}
        



// Add task when the "Add Task" button is clicked
addTaskButton.addEventListener('click', addTask);

// Add task when Enter key is pressed
input.addEventListener('keydown', (event) => {
if (event.key === 'Enter') {
    addTask();
    }
});

window.addEventListener('load', loadTasks);

// Show all tasks when the "All" button is clicked
const showAllButton = document.getElementById('showAll');
const showActiveButton = document.getElementById('showActive');
const showCompletedButton = document.getElementById('showCompleted');

showAllButton.addEventListener('click', () => {
    taskList.querySelectorAll('li').forEach((task) => {
        task.style.display = 'flex'; // Show all tasks
    });
});

showActiveButton.addEventListener('click', () => {
    taskList.querySelectorAll('li').forEach((task) => {
        const checkbox = task.querySelector('.checkbox');
        task.style.display = checkbox.checked ? 'none' : 'flex'; 
    });
});

showCompletedButton.addEventListener('click', () => {
    taskList.querySelectorAll('li').forEach((task) => {
        const checkbox = task.querySelector('.checkbox');
        task.style.display = checkbox.checked ? 'flex' : 'none'; 
    });
});


