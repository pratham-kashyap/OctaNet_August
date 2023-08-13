// script.js
function addTask() {
    const taskText = document.getElementById('newTask').value;
    if (taskText.trim() === '') return;

    const taskList = document.querySelector('.task-list');

    const taskElement = document.createElement('div');
    taskElement.className = 'task';
    taskElement.innerHTML = `
        <input type="checkbox" onchange="toggleCompleted(this)">
        <label>${taskText}</label>
        <button class = "deleteButton", onclick="deleteTask(this)"><i class="fas fa-trash"></i></button>
    `;

    taskList.appendChild(taskElement);

    document.getElementById('newTask').value = '';
    
    const noTasksMessage = document.querySelector('.no-tasks');
    noTasksMessage.style.display = 'none';

    filterTasks('all');
    console.log('Number of tasks:', taskList.children.length); // Debug statement

}

function toggleCompleted(checkbox) {
    const taskLabel = checkbox.nextElementSibling;
    taskLabel.classList.toggle('completed');
}

function deleteTask(button) {
    const taskElement = button.parentNode;
    taskElement.parentNode.removeChild(taskElement);

    // Show "No Tasks Added" message if tasks are empty
    const taskList = document.querySelector('.task-list');
    const noTasksMessage = document.querySelector('.no-tasks');
    
    if (taskList.children.length === 1) {
        noTasksMessage.style.display = 'block';
    } else {
        noTasksMessage.style.display = 'none';
    }
    console.log('Number of tasks:', taskList.children.length); // Debug statement
}

function filterTasks(filter) {
    const taskList = document.querySelector('.task-list');
    const tasks = taskList.querySelectorAll('.task');

    tasks.forEach(task => {
        const taskLabel = task.querySelector('label');
        if (filter === 'all' || (filter === 'active' && !taskLabel.classList.contains('completed')) || (filter === 'completed' && taskLabel.classList.contains('completed'))) {
            task.style.display = 'flex';
        } else {
            task.style.display = 'none';
        }
    });
}

function clearCompleted() {
    const taskList = document.querySelector('.task-list');
    const tasks = taskList.querySelectorAll('.task');

    tasks.forEach(task => {
        const taskLabel = task.querySelector('label');
        if (taskLabel.classList.contains('completed')) {
            taskList.removeChild(task);
        }
    });

    const noTasksMessage = document.querySelector('.no-tasks');
    
    if (taskList.children.length === 1) {
        noTasksMessage.style.display = 'block';
    } else {
        noTasksMessage.style.display = 'none';
    }
}

let activeFilter = 'all'; // Initialize active filter

function filterTasks(filter) {
    const taskList = document.querySelector('.task-list');
    const tasks = taskList.querySelectorAll('.task');

    tasks.forEach(task => {
        const taskLabel = task.querySelector('label');
        if (filter === 'all' || (filter === 'active' && !taskLabel.classList.contains('completed')) || (filter === 'completed' && taskLabel.classList.contains('completed'))) {
            task.style.display = 'flex';
        } else {
            task.style.display = 'none';
        }
    });

    // Remove active class from previous filter button and add to the clicked button
    const filterButtons = document.querySelectorAll('.filters button');
    filterButtons.forEach(button => {
        button.classList.remove('active');
    });
    const clickedButton = document.querySelector(`.filters button[data-filter="${filter}"]`);
    clickedButton.classList.add('active');

    activeFilter = filter; // Update active filter
}

// Set "All" filter as active by default
filterTasks('all');

function initialize() {
    const taskList = document.querySelector('.task-list');
    const noTasksMessage = document.createElement('div');
    noTasksMessage.className = 'no-tasks';
    noTasksMessage.textContent = 'No Tasks Added';
    taskList.appendChild(noTasksMessage);
}

initialize();

