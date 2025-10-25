const input = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');

function addTask() {
    const taskText = input.value.trim(); // Remove leading/trailing spaces
    if (taskText !== '') {
        // Create the task item
        const li = document.createElement('li');
        li.classList.add('task');

        // Create the checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('checkbox');

        // Create the text span
        const span = document.createElement('span');
        span.textContent = taskText;

        // Add delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = '🗑️';
        deleteButton.addEventListener('click', () => {
            li.style.opacity = '0'; // Fade out the task item
            setTimeout(() => li.remove(), 300); // Remove the task item after a short delay        
        });
        
        // Toggle completed class when checkbox changes
        checkbox.addEventListener('change', () => {
            span.classList.toggle('completed');
        });

        // Build the task item
        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteButton);
        taskList.appendChild(li);

        // Clear input field
        input.value = '';
    }
};

// Add task when the "Add Task" button is clicked
addTaskButton.addEventListener('click', addTask);

// Add task when Enter key is pressed
input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        addTask();
    }
});

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
        if (checkbox.checked) {
            task.style.display = 'none'; // Hide completed tasks
        } else {
            task.style.display = 'flex'; // Show active tasks
        }
    });
});

showCompletedButton.addEventListener('click', () => {
    taskList.querySelectorAll('li').forEach((task) => {
        const checkbox = task.querySelector('.checkbox');
        if (checkbox.checked) {
            task.style.display = 'flex'; // Show completed tasks
        } else {
            task.style.display = 'none'; // Hide active tasks
        }
    });
});


