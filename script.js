// Wait until the entire DOM is loaded before running the script
document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

     // Load tasks from Local Storage on page load
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // false = don't save again
    }

    // Function to add a new task
    function addTask(taskText, save = true) {
        // Get the trimmed value from the input field
        const taskText = taskInput.value ? taskInput.value.trim() : taskText;
        if (save) {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    storedTasks.push(taskText);
    localStorage.setItem('tasks', JSON.stringify(storedTasks));
}

        // If the input is empty, alert the user and exit the function
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        // Create a new list item (li) for the task
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create a remove button for the task
        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.className = 'remove-btn';

        // When remove button is clicked, remove this task item from the list
        removeBtn.onclick = () => {
            taskList.removeChild(li);
            if (save) {
                updateLocalStorage();
            }
        };

        // Append the remove button to the list item
        li.appendChild(removeBtn);

        // Append the new task item to the task list
        taskList.appendChild(li);

        // Clear the input field
        taskInput.value = '';

         // Save to Local Storage if requested
        if (save) {
            updateLocalStorage();
        }
    
    }

    // Update Local Storage based on current tasks in the DOM
    function updateLocalStorage() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(li => {
            // li.textContent includes "Remove" button text, so remove it:
            // Get only the task text without the button text
            const taskText = li.firstChild.textContent || li.textContent.replace('Remove', '').trim();
            tasks.push(taskText);
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }



    // Add event listener to the Add Task button
    addButton.addEventListener('click', addTask);

    // Add event listener to input field to add task on pressing Enter key
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask(taskInput.value);
        }

    });

    
    // Load saved tasks when the page loads
    loadTasks();
});
