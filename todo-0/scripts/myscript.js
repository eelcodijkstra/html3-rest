/*global document, alert, localStorage, FormData, XMLHttpRequest
*/

// model of todo-element and todo-list

var todos  = [];           // start as empty list

var renderTodos = function (todos) {}; // signal view(s)

function addTodo(id, done, text) {
  todos.push({id: id, done: done, text: text});
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
  renderTodos(todos);
}

function updateTodoDone(id, done) {
  todoElt(id).done = done;
  renderTodos(todos);
}

function updateTodoText(id, text) {
  todoElt(id).text = text;
  renderTodos(todos);
}

function removeTodoItem(id) {
  todos = todos.filter(function (item) {
    return item.id !== id;
  });
  renderTodos(todos);
}

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
  req.open("POST", "users?" + "username=" + username + "&password=" + "geheim");
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

function deleteTodoItem(userid, eltid, cont) {
  var req = new XMLHttpRequest();
  req.addEventListener("load", cont);
  req.open("DELETE", "users/" + userid + "/todos/" + eltid);
  req.send()
}

function updateTodoItem(userid, eltid, done, text, cont) {
  var data = new FormData();
  var req = new XMLHttpRequest();
  data.append("descr", text);
  if (done) {
    data.append("done", done);
  }
  req.addEventListener("load", cont);
  req.open("POST", "users/" + userid + "/todos/" + eltid);
  req.send(data)
}

function updateTodoItemDone(userid, eltid, done, cont) {
  var elt = todoElt(eltid);
  updateTodoItem(userid, eltid, done, elt.text, cont);
}

// rendering/view

function mkElt(tag, attrs, content) {
  var html = "<" + tag + " " + attrs + ">" + content + "</" + tag + ">";
  return html;
}

function mkInputElt(type, attrs, name, value) {
  var html = '<input type="' + type + '" ' +
      attrs +
      ' name="' + name +
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

function handleUpdateItem() {
  alert("Update: " + this.responseText);
  var res = JSON.parse(this.responseText);
  updateTodo(res.id, res.done, res.descr);
}

function handleDeleteItem() {
  alert(this.responseText);
  var res = JSON.parse(this.responseText);
  removeTodoItem(res.eltid);
}

var todoDiv = document.getElementById("todoDiv");
todoDiv.innerHTML = mkTodos(todos);

function todoClickHandler(evt) {
  if (evt.target.nodeName === 'INPUT' && evt.target.type === 'checkbox') {
    updateTodoItemDone(localStorage.userid, evt.target.dataset.id,
                       evt.target.checked, handleUpdateItem);
  } else if (evt.target.nodeName === 'BUTTON') {
    alert("delete");
    deleteTodoItem(localStorage.userid, evt.target.dataset.id, handleDeleteItem);
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

function handleUserList() {
  alert("list from server: " + this.responseText);
  var data = JSON.parse(this.responseText);
  var userid = data.userid;
  todos = [];
  renderTodos(todos);
  data.todos.forEach(function (elt) {
    addTodo(elt._id, elt.done, elt.description);
  });
}

function loginResponseHandler() {
  var resp = JSON.parse(this.responseText);
  alert("user OK: " + this.responseText);
  if (resp.username !== "") {
    localStorage.username = resp.username;
    localStorage.userid = resp.userid;
    getServerList(resp.userid, handleUserList);
  }
}

function loginHandler(evt) {
  var username = evt.target.username.value;
  var passwd = evt.target.passwd.value;
  // alert("username: " + username + " password: " + passwd);
  getUser(username, passwd, loginResponseHandler);
  return false; // prevent further form action
}

var loginElt = document.getElementById("loginElt");

loginElt.onsubmit = loginHandler;

function checkUser() {
  if (localStorage.userid === null || localStorage.userid === undefined ||
      localStorage.userid === "") {
    loginElt.style.display = "block";
    todos = [];
    renderTodos(todos);
  } else {
    getServerList(localStorage.userid, handleUserList);
    // loginElt.style.display = "none";
  }
}

checkUser();
