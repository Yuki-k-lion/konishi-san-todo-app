const taskInput = document.getElementById("new-task");
const addButton = document.getElementsByTagName("button")[0];
let incompleteTaskHolder = document.getElementById("incomplete-tasks");
let completedTasksHolder = document.getElementById("completed-tasks");

const createNewTaskElement = newTask => {
    const listItem = document.createElement("li");
    const checkBox = document.createElement("input");
    const label = document.createElement("label");
    const editInput = document.createElement("input");
    const editButton = document.createElement("button");
    const deleteButton = document.createElement("button");
    label.innerText = newTask;

    checkBox.type = "checkbox";
    editInput.type = "text";
    editButton.innerText = "Edit";
    editButton.className = "edit";
    deleteButton.innerText = "Delete";
    deleteButton.className = "delete";

    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    return listItem;
};

const bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
    const checkBox = taskListItem.querySelector("input[type=checkbox]");
    const editButton = taskListItem.querySelector("button.edit");
    const deleteButton = taskListItem.querySelector("button.delete");
    editButton.onclick = editTask;
    deleteButton.onclick = deleteTask;
    checkBox.onchange = checkBoxEventHandler;
};

const taskIncomplete = function () {
    const listItem = this.parentNode;
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
    storeValue();
};

const taskCompleted = function () {
    const listItem = this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
    storeValue();
};

const addTask = function () {
    const listItem = createNewTaskElement(taskInput.value);
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
    taskInput.value = "";
    storeValue();
};

const editTask = function () {
    const listItem = this.parentNode;
    const editInput = listItem.querySelector('input[type=text]');
    const label = listItem.querySelector("label");
    const isEditMode = listItem.classList.contains("editMode");

    if (isEditMode) {
        label.innerText = editInput.value;
    } else {
        editInput.value = label.innerText;
    }
    listItem.classList.toggle("editMode");
    storeValue();
};

const deleteTask = function () {
    const listItem = this.parentNode;
    const ul = listItem.parentNode;
    ul.removeChild(listItem);
    storeValue();
};

const storeValue = function () {
    this.window.localStorage.compleatedTask = completedTasksHolder.innerHTML;
    this.window.localStorage.incompleateTask = incompleteTaskHolder.innerHTML;
    console.log("saved");
};

const readValue = function () {
    console.log("reading...");
    if (!!this.window.localStorage.compleatedTask || this.window.localStorage.incompleateTask) {
        completedTasksHolder.innerHTML = this.window.localStorage.compleatedTask;
        incompleteTaskHolder.innerHTML = this.window.localStorage.incompleateTask;
        console.log("complete");
    }
};

// set functions
addButton.onclick = addTask;
readValue();

let i;
for (i = 0; i < incompleteTaskHolder.children.length; i++) {
    bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

for (i = 0; i < completedTasksHolder.children.length; i++) {
    bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}
