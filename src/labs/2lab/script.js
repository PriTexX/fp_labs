const append = (tasks, text) => [
  ...tasks,
  { id: Date.now(), text, completed: false },
];

const toggle = (tasks, id) =>
  tasks.map((task) =>
    task.id === id ? { ...task, completed: !task.completed } : task,
  );

const deleteT = (tasks, id) => tasks.filter((task) => task.id !== id);

const filter = (tasks, filter) => {
  switch (filter) {
    case "pending":
      return tasks.filter((task) => !task.completed);
    case "completed":
      return tasks.filter((task) => task.completed);
    default:
      return tasks;
  }
};

let tasks = [];
let currentFilter = "all";

const renderTask = (task) => `
        <li class="task ${task.completed ? "completed" : ""}">
            <input type="checkbox" ${task.completed ? "checked" : ""} 
                   onchange="toggleTask(${task.id})" />
            <span>${task.text}</span>
            <button class="delete" onclick="deleteTask(${task.id})">Удалить</button>
        </li>
    `;

const renderTasks = (tasks) => {
  const tasksList = document.getElementById("tasks");

  const renderedTasks = filter(tasks, currentFilter).map(renderTask).join("");

  tasksList.innerHTML = renderedTasks;
};

const addTask = () => {
  const input = document.getElementById("taskInput");

  if (input.value.trim()) {
    tasks = append(tasks, input.value.trim());
    input.value = "";
    renderTasks(tasks);
  }
};

const toggleTask = (id) => {
  tasks = toggle(tasks, id);
  renderTasks(tasks);
};

const deleteTask = (id) => {
  tasks = deleteT(tasks, id);
  renderTasks(tasks);
};

const setFilter = (filter) => {
  currentFilter = filter;
  document
    .querySelectorAll(".filter-btn")
    .forEach((btn) => btn.classList.remove("active"));
  event.target.classList.add("active");
  renderTasks(tasks);
};

document.getElementById("taskInput").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});

renderTasks(tasks);
