// Save and load tasks
export function saveTasks(taskList) {
    const tasks = [];

    taskList.querySelectorAll('li').forEach(li => {
        tasks.push({
            text: li.querySelector('span').textContent,
            completed: li.querySelector('.checkbox').checked
        });
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}
// Load tasks
export function loadTasks(addTask) {
    const saved = JSON.parse(localStorage.getItem('tasks')) || [];
    saved.forEach(task => addTask(task.text, task.completed));
}
// Save and load filters
export function saveFilter(filter) {
    localStorage.setItem('filter', filter);
}
// Load filters
export function loadFilter() {
    return localStorage.getItem('filter') || 'all';
}