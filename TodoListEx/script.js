let todos = [
  {
    id: "abc",
    todo: "read a book",
    status: true,
  },
];

function generateId() {
  return Math.random().toString(16).slice(2) + Date.now().toString();
}

document.addEventListener("DOMContentLoaded", () => {
  const addTodoBtn = document.getElementById("addTodoBtn");

  addTodoBtn.addEventListener("click", () => {
    const input = document.getElementById("todo-input");
    const inputVal = input.value;
    if (inputVal.trim() != "") {
      addTodo(generateId(), inputVal, false);
    }
    input.value = "";
  });
  readFromLocal();
  refreshVisual();
});

function saveToLocal() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function readFromLocal() {
  todos = JSON.parse(localStorage.getItem("todos"));
}

function addTodo(id, todo, status) {
  newTodo = { id, todo, status };
  todos.push(newTodo);
  saveToLocal();

  // update visual
  addToVisual(newTodo);
}

function refreshVisual() {
  const table = document.getElementsByTagName("table")[0];
  //copy headers of table
  const headers = document.createElement("tr");
  headers.innerHTML = table.firstElementChild.innerHTML;

  table.innerHTML = "";
  table.append(headers);

  todos.forEach((element) => {
    addToVisual(element);
  });
}

function addToVisual(todo) {
  const table = document.getElementsByTagName("table")[0];

  const newTr = document.createElement("tr");
  newTr.id = todo.id;

  const idTd = document.createElement("td");
  idTd.textContent = todo.id.substring(0, 3) + "...";

  const todoTd = document.createElement("td");
  todoTd.textContent = todo.todo;
  if (todo.status) todoTd.style.textDecoration = "line-through";
  const statusTd = document.createElement("td");
  statusTd.textContent = todo.status ? "Done" : "Active";
  if (todo.status) statusTd.style.color = "green";
  const actionsTd = document.createElement("td");

  const [changeStatusBtn, editBtn, deleteBtn] = createBtns(todo.status);
  addListenersBtns(changeStatusBtn, editBtn, deleteBtn, todo.id);
  actionsTd.append(changeStatusBtn, editBtn, deleteBtn);

  newTr.append(idTd, todoTd, statusTd, actionsTd);
  table.append(newTr);
}

function createBtns(status = false) {
  const changeStatusBtn = document.createElement("button");
  changeStatusBtn.textContent = "Mark as Done";

  changeStatusBtn.disabled = status;

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit todo";

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete todo";

  return [changeStatusBtn, editBtn, deleteBtn];
}

function addListenersBtns(changeStatusBtn, editBtn, deleteBtn, id) {
  changeStatusBtn.addEventListener("click", () => {
    todos.find((t) => t.id == id).status = true;
    saveToLocal();
    refreshVisual();
  });
  editBtn.addEventListener("click", () => {
    const input = document.getElementById("todo-input").value;
    if (input.trim() != "") {
      todos.find((t) => t.id == id).todo = input;
      saveToLocal();
      refreshVisual();
    }
  });
  deleteBtn.addEventListener("click", () => {
    const idx = todos.findIndex((t) => t.id == id);
    todos.splice(idx, 1);
    saveToLocal();
    refreshVisual();
  });
}
