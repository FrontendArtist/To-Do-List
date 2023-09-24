const todoInput = document.querySelector(".todo_input");
const addButton = document.querySelector(".todo_button");
const todoList = document.querySelector(".todo_list");
const filterTodos = document.querySelector(".filter-todo");
addButton.addEventListener("click", addTodo);
filterTodos.addEventListener("click", filtering);

savedTodos();
function savedTodos(event) {
  const todos = JSON.parse(localStorage.getItem("todos"));
  console.log(todos);
  todos.forEach((item) => {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todoDiv");

    const newTodo = document.createElement("li");
    newTodo.innerText = item.task;
    newTodo.classList.add("todo-item");

    const completedButton = document.createElement("Button");
    completedButton.innerText = "complete";
    completedButton.classList.add("complete-btn");
    completedButton.addEventListener("click", completedTodo);

    const trashButton = document.createElement("Button");
    trashButton.innerText = "delete";
    trashButton.classList.add("trash-btn");
    trashButton.addEventListener("click", deleteTodo);

    todoDiv.appendChild(newTodo);
    todoDiv.appendChild(completedButton);
    todoDiv.appendChild(trashButton);
    todoList.appendChild(todoDiv);
  });
}

function addTodo(e) {
  e.preventDefault();
  if (todoInput.value == "") {
    alert("enter your todo");
  } else {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todoDiv");

    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");

    const completedButton = document.createElement("Button");
    completedButton.innerText = "complete";
    completedButton.classList.add("complete-btn");
    completedButton.addEventListener("click", completedTodo);

    const trashButton = document.createElement("Button");
    trashButton.innerText = "delete";
    trashButton.classList.add("trash-btn");
    trashButton.addEventListener("click", deleteTodo);

    todoDiv.appendChild(newTodo);
    todoDiv.appendChild(completedButton);
    todoDiv.appendChild(trashButton);
    todoList.appendChild(todoDiv);

    saveLocalTodos(todoInput.value);

    todoInput.value = "";
  }
}

function deleteTodo(event) {
  item = event.target.parentElement;
  item.remove();
  removeLocalTodos(item);
}

function completedTodo(event) {
  //this is one way ♥
  // event.target.parentElement.classList.toggle("completed")
  if (event.target.parentElement.className == "todoDiv completed") {
    event.target.parentElement.classList.remove("completed");
    event.target.innerText = "Complete";
  } else {
    event.target.parentElement.classList.add("completed");
    event.target.innerText = "unComplete";
  }
}
function saveLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}
function removeLocalTodos(todo) {
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  console.log(todoIndex);
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
function filtering(event) {
  const todos = todoList.childNodes;

  todos.forEach(function (todo) {
    switch (event.target.value) {
      case "completed":
        console.log(todo);
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;

      case "uncompleted":
        if (todo.classList.contains("completed")) {
          todo.style.display = "none";
        } else {
          todo.style.display = "flex";
        }

        break;
      case "all":
        todo.style.display = "flex";

        break;
    }
  });
}
