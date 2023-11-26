window.addEventListener("load", () => {
  const form = document.querySelector("#new-task-form");
  const input = document.querySelector("#new-task-input");
  const list_el = document.querySelector("#tasks");
  const clearAllButton = document.querySelector("#clear-all-button");

  // Load tasks from local storage on page load
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // Populate tasks from local storage
  savedTasks.forEach((task) => {
    createTaskElement(task);
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const task = input.value;
    createTaskElement(task);
    saveTasksToLocalStorage();
    input.value = "";
  });

  // Function to create a new task element
  function createTaskElement(task) {
    const task_el = document.createElement("div");
    task_el.classList.add("task");

    const task_content_el = document.createElement("div");
    task_content_el.classList.add("content");

    task_el.appendChild(task_content_el);

    const task_input_el = document.createElement("input");
    task_input_el.classList.add("text");
    task_input_el.type = "text";
    task_input_el.value = task;
    task_input_el.setAttribute("readonly", "readonly");

    task_content_el.appendChild(task_input_el);

    const task_actions_el = document.createElement("div");
    task_actions_el.classList.add("actions");

    const task_edit_el = document.createElement("button");
    task_edit_el.classList.add("edit");
    task_edit_el.innerText = "Edit";

    const task_delete_el = document.createElement("button");
    task_delete_el.classList.add("delete");
    task_delete_el.innerText = "Delete";

    task_actions_el.appendChild(task_edit_el);
    task_actions_el.appendChild(task_delete_el);

    task_el.appendChild(task_actions_el);

    list_el.appendChild(task_el);

    // Add event listeners for edit and delete actions
    task_edit_el.addEventListener("click", () =>
      handleEditTask(task_edit_el, task_input_el)
    );
    task_delete_el.addEventListener("click", () => handleDeleteTask(task_el));

    // Save tasks to local storage after adding a new task
    saveTasksToLocalStorage();
  }

  // Function to handle the edit action for a task
  function handleEditTask(editButton, inputElement) {
    if (editButton.innerText.toLowerCase() === "edit") {
      editButton.innerText = "Save";
      inputElement.removeAttribute("readonly");
      inputElement.focus();
    } else {
      editButton.innerText = "Edit";
      inputElement.setAttribute("readonly", "readonly");
      // Save tasks to local storage after editing
      saveTasksToLocalStorage();
    }
  }

  // Function to handle the delete action for a task
  function handleDeleteTask(taskElement) {
    list_el.removeChild(taskElement);
    // Save tasks to local storage after deleting
    saveTasksToLocalStorage();
  }

  // Function to save tasks to local storage
  function saveTasksToLocalStorage() {
    const tasks = Array.from(list_el.children).map(
      (taskEl) => taskEl.querySelector(".text").value
    );
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // Add event listener for the Clear All button
  clearAllButton.addEventListener("click", () => {
    list_el.innerHTML = ""; // Clear all tasks
    saveTasksToLocalStorage(); // Save empty task list to local storage
  });
});



												// THE END
