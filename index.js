const list = document.getElementById("list");
const form = document.getElementById("create-form");
const summary = document.getElementById("summary");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function formatDate(date) {
  return new Date(date).toLocaleDateString("pt-BR");
}

function renderTasks() {
  list.innerHTML = "";
  tasks.forEach(task => {
    const li = document.createElement("li");
    li.className = "task-card";
    li.id = `task-${task.id}`;

    const info = document.createElement("div");
    info.className = "task-info" + (task.done ? " done" : "");
    info.innerHTML = `
      <span>${task.description}</span>
      <div class="task-meta">
        <span class="task-tag">${task.tag}</span>
        Criado em: ${formatDate(task.createdAt)}
      </div>
    `;

    // Botão Concluir
    const completeBtn = document.createElement("button");
    completeBtn.textContent = task.done ? "Concluído" : "Concluir";
    completeBtn.className = "complete-btn " + (task.done ? "done" : "");
    completeBtn.onclick = () => toggleTask(task.id);

    // Botão Lixeira
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
    <path d="M9 3v1H4v2h16V4h-5V3H9zm1 5v11h2V8h-2zm4 0v11h2V8h-2z"/>
    </svg>
    `;
deleteBtn.onclick = () => deleteTask(task.id);

    // Container de ações
    const actions = document.createElement("div");
    actions.className = "task-actions";
    actions.appendChild(completeBtn);
    actions.appendChild(deleteBtn);

    li.appendChild(info);
    li.appendChild(actions);
    list.appendChild(li);
  });

  updateSummary();
}

function updateSummary() {
  const doneCount = tasks.filter(t => t.done).length;
  summary.textContent = `${doneCount} tarefa(s) concluída(s)`;
}

function toggleTask(id) {
  tasks = tasks.map(t => t.id === id ? {...t, done: !t.done} : t);
  saveTasks();
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  saveTasks();
  renderTasks();
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const description = document.getElementById("description").value;
  const tag = document.getElementById("tag").value;
  

  const newTask = {
    id: Date.now(),
    description,
    tag,
    done: false,
    createdAt: new Date()
  };


  tasks.push(newTask);
  saveTasks();
  renderTasks();

  form.reset();
});

renderTasks();