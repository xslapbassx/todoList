let draggedItem = null;


function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('li:not(.dragging)')];

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;


        if (offset < 0 && offset > closest.offset) {
            return { offset, element: child };
            } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}


export function makeDraggable(li, taskList, onDrop) {
    li.draggable = true;

    li.addEventListener('dragstart', (e) => {
        draggedItem = li;
        li.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';
});


    li.addEventListener('dragend', () => {
        li.classList.remove('dragging');
        draggedItem = null;
        onDrop();
    });


    taskList.addEventListener('dragover', (e) => {
        e.preventDefault();
        if (!draggedItem) return;

        const afterElement = getDragAfterElement(taskList, e.clientY);
        if (afterElement == null) {
            taskList.appendChild(draggedItem);
        } else {
            taskList.insertBefore(draggedItem, afterElement);
        }
    });
}