const todoInput = document.getElementById("todo-input");
const addBtn = document.querySelector("#todo-button");
const todoUl = document.querySelector("#todo-ul");

let todoList = JSON.parse(localStorage.getItem("todoList")) || [];

window.addEventListener("load", () => {
  getTodoListFromLocalStorage();
});

const getTodoListFromLocalStorage = () => {
  //get todoList from localStorage and load to UI
  todoList.forEach((todo) => createTodo(todo));
};

addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (todoInput.value.trim() === "") {
    alert("enter a text");
    return; //? return önemli, else kullanmadan alttaki alerti devre dışı bırakıyor
  }
  console.log(todoInput.value);
  const newTodo = {
    id: new Date().getTime(),
    completed: false,
    task: todoInput.value,
  };

  createTodo(newTodo);
  todoList.push(newTodo);
  localStorage.setItem("todoList", JSON.stringify(todoList));
  e.target.closest("form").reset();
  todoInput.focus();
});

const createTodo = (newTodo) => {
  //* todo item creation
  const { id, completed, task } = newTodo;

  const li = document.createElement("li");
  li.setAttribute("id", id);
  completed && li.classList.add("checked");
  const icon = document.createElement("i");
  icon.setAttribute("class", "fas fa-check");
  li.append(icon);

  const p = document.createElement("p");
  p.innerText = task;
  li.appendChild(p);

  const removeIcon = document.createElement("i");
  removeIcon.setAttribute("class", "fas fa-trash");
  li.append(removeIcon);
  console.log(li);
  todoUl.append(li);
};

todoUl.addEventListener("click", (e) => {
  const idAttr = e.target.closest("li").getAttribute("id");
  if (e.target.classList.contains("fa-check")) {
    e.target.parentElement.classList.add("checked");
    todoList.map((todo) => {
      if (todo.id == idAttr) {
        todo.completed = !todo.completed;
      }
      localStorage.setItem("todoList", JSON.stringify(todoList));
    });
  } else if (e.target.classList.contains("fa-trash")) {
    e.target.parentElement.remove();
    todoList = todoList.filter((todo) => todo.id != idAttr);
    localStorage.setItem("todoList", JSON.stringify(todoList));
  } else {
    alert("other element");
  }
});
