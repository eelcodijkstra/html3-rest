
// model of todo-element and todo-list

var todos  = [];           // start as empty list

var renderTodos = function (todos) {}; // signal view(s)
var saveList = function (todos) {};    // save model

function nextId() {
  max = -1;
  todos.forEach(function(todo) {
    if (todo.id > max) {
      max = todo.id;
    }
  });
  return max + 1;
}

function createTodo(done, text) {
  todos.push({id: nextId(), done: done, text: text});
  saveList(todos);
  renderTodos(todos);
}

function todoElt(id) {
  var i = todos.findIndex(function (elt) {
    return elt.id === id;
  });
  return todos[i];
}

function updateTodo(id, done, text) {
  var todo = todoElt(id);
  todo.done = done;
  todo.text = text;
  saveList(todos);
  renderTodos(todos);
}

function updateTodoDone(id, done) {
  todoElt(id).done = done;
  saveList(todos);
  renderTodos(todos);
}

function updateTodoText(id, text) {
  todoElt(id).text = text;
  saveList(todos);
  renderTodos(todos);
}

function removeTodoItem(id) {
  todos = todos.filter(function (item) {
    return item.id !== id;
  });
  saveList(todos);
  renderTodos(todos);
}

// Persistence

function initList() {
  if (localStorage.todoList && localStorage.todoList !== "undefined") {
    todos = JSON.parse(localStorage.todoList);
    renderTodos(todos);
  } else {
    testTodoList();
  }
}

saveList = function (todoList) {
  localStorage.todoList = JSON.stringify(todoList);
};

// server

function getUser(username, cont) {
  var data = new FormData();
  data.append("username", username);
  data.append("password", "geheim");
  var req = new XMLHttpRequest();
  req.addEventListener("load", cont);
  req.open("GET", "users?" + "username=" + username +"&password=" + "geheim");
  req.send(data);
}

function createUser(username, password, cont) {
  var data = new FormData();
  data.append("username", username);
  data.append("password", "geheim");
  var req = new XMLHttpRequest();
  req.addEventListener("load", cont);
  req.open("GET", "users?" + "username=" + username +"&password=" + "geheim");
  req.send(data);
}

function getServerList(userid) {
}

function createServerItem() {
}

// test

function testTodoList() {
  createTodo(false, "Boodschappen bij Jumbo");
  createTodo(false, "Rekening elektra betalen");
  createTodo(true, "Huiswerk maken");
}

// rendering/view

function mkElt(tag, attrs, content) {
  var html = "<" + tag + " " + attrs + ">" + content + "</" + tag + ">";
  return html;
}

function mkInputElt(type, attrs, name, value) {
  var html = '<input type="' + type + '" ' +
      attrs +
      '" name="' + name +
      '" value="' + value + '">';
  return html;
}

function mkTodoItem(todo) {
  var checked = (todo.done) ? ' checked ' : '';
  var decoration = (todo.done) ? 'style="text-decoration: line-through;"' : '';
  var contents =
      mkInputElt('checkbox', checked + ' data-id="' + todo.id + '"',
                 'done', 'True') +
      mkElt('span', decoration + ' data-id="' + todo.id + '"', todo.text) +
      mkElt('button', 'data-id="' + todo.id + '"', 'x');
  return mkElt('div', 'class="todo-item" data-id="' + todo.id + '"', contents);
}

function mkTodos(todoList) {
  var html = "";
  for (var i = 0; i < todoList.length; i++) {
    html = html + mkTodoItem(todoList[i]);
  }
  return html;
}

var todoDiv = document.getElementById("todoDiv");
todoDiv.innerHTML = mkTodos(todos);

renderTodos = function (todoList) {
  todoDiv.innerHTML = mkTodos(selectedItems(todoList));
};

function todoClickHandler(evt) {
  if (evt.target.nodeName == 'INPUT' && evt.target.type == 'checkbox') {
    updateTodoDone(parseInt(evt.target.dataset.id), evt.target.checked);
  } else if (evt.target.nodeName == 'BUTTON') {
    removeTodoItem(parseInt(evt.target.dataset.id));
  }
}

todoDiv.onclick = todoClickHandler;

var createItemInput = document.getElementById("createItemInput");

function createItemHandler () {
  createTodo(false, createItemInput.value);
  createItemInput.value = "";
  createItemInput.placeholder = "what to do?";
}

createItemInput.onchange = createItemHandler;

function allItems(todoList) {
  return todoList;
}

function openItems(todoList) {
  return todoList.filter(function (item) {
    return !item.done;
  });
}

function doneItems(todoList) {
  return todoList.filter(function (item) {
    return item.done;
  });
}

var selectedItems = allItems;

var selectAllButton = document.getElementById("selectAllButton");
var selectDoneButton = document.getElementById("selectDoneButton");
var selectOpenButton = document.getElementById("selectOpenButton");

selectAllButton.onclick = function () {
  selectedItems = allItems;
  renderTodos(todos);
};

selectDoneButton.onclick = function () {
  selectedItems = doneItems;
  renderTodos(todos);
};

selectOpenButton.onclick = function () {
  selectedItems = openItems;
  renderTodos(todos);
};

initList();

getUser("henk", function (resp) {
  alert(this.responseText);
});
