/*global document, alert, localStorage, FormData, XMLHttpRequest
*/

// model of todo-element and todo-list

var todos  = [];           // start as empty list

var renderTodos = function (todos) {}; // signal view(s)
var saveList = function (todos) {};    // save model

function nextId() {
  var max = -1;
  todos.forEach(function (todo) {
    if (todo.id > max) {
      max = todo.id;
    }
  });
  return max + 1;
}

function addTodo(id, done, text) {
  todos.push({id: id, done: done, text: text});
  saveList(todos);
  renderTodos(todos);
}

function createTodo(id, done, text) {
  todos.push({id: id, done: done, text: text});
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

function getUser(username, passwd, cont) {
  var data = new FormData();
  var req = new XMLHttpRequest();
  req.addEventListener("load", cont);
  req.open("GET", "users?" + "username=" + username + "&password=" + passwd);
  req.send();
}

function createUser(username, password, cont) {
  var data = new FormData();
  data.append("username", username);
  data.append("password", "geheim");
  var req = new XMLHttpRequest();
  req.addEventListener("load", cont);
  req.open("GET", "users?" + "username=" + username + "&password=" + "geheim");
  req.send(data);
}

function getLogin(username, passwd, cont) {
  var req = new XMLHttpRequest();
  req.addEventListener("load", cont);
  req.open("GET", "login?" + "username=" + username + "&password=" + passwd);
  req.send();
}
function getServerList(userid, cont) {
  var req = new XMLHttpRequest();
  req.addEventListener("load", cont);
  req.open("GET", "users/" + userid + "/todos");
  req.send();
}

function createTodoItem(userid, text, cont) {
  var data = new FormData();
  var req = new XMLHttpRequest();
  data.append("descr", text);
  req.addEventListener("load", cont);
  req.open("POST", "users/" + userid + "/todos");
  req.send(data);
}

// test

function testTodoList() {
  createTodo("0a", false, "Boodschappen bij Jumbo");
  createTodo("0b", false, "Rekening elektra betalen");
  createTodo("0c", true, "Huiswerk maken");
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
  var i = 0;
  for (i = 0; i < todoList.length; i += 1) {
    html = html + mkTodoItem(todoList[i]);
  }
  return html;
}

var todoDiv = document.getElementById("todoDiv");
todoDiv.innerHTML = mkTodos(todos);

function todoClickHandler(evt) {
  if (evt.target.nodeName === 'INPUT' && evt.target.type === 'checkbox') {
    updateTodoDone(evt.target.dataset.id, evt.target.checked);
  } else if (evt.target.nodeName === 'BUTTON') {
    removeTodoItem(evt.target.dataset.id);
  }
}

todoDiv.onclick = todoClickHandler;

var createItemInput = document.getElementById("createItemInput");

function handleCreatedItem() {
  var item = JSON.parse(this.responseText);
  addTodo(item.id, item.done, item.descr);
}

function createItemHandler() {
  createTodoItem(localStorage.userid, createItemInput.value, handleCreatedItem);
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

renderTodos = function (todoList) {
  todoDiv.innerHTML = mkTodos(selectedItems(todoList));
};

initList();

function handleUserList() {
  alert("list from server: " + this.responseText);
  var data = JSON.parse(this.responseText);
  var userid = data.userid;
  todos = [];
  data.todos.forEach(function (elt) {
    createTodo(elt._id, elt.done, elt.description);
  });
}

function loginResponseHandler() {
  var resp = JSON.parse(this.responseText);
  alert("user OK: " + this.responseText);
  if (resp.username !== null) {
    localStorage.username = resp.username;
    localStorage.userid = resp.userid;
    getServerList(resp.userid, handleUserList);
  }
}

function loginHandler(evt) {
  var username = evt.target.username.value;
  var passwd = evt.target.passwd.value;
  alert("username: " + username + " password: " + passwd);
  getUser(username, passwd, loginResponseHandler);
  return false; // prevent further form action
}

var loginElt = document.getElementById("loginElt");

loginElt.onsubmit = loginHandler;

function checkUser() {
  if (localStorage.username === null) {
    loginElt.style.display = "block";
  } else {
    // loginElt.style.display = "none";
  }
}

checkUser();
