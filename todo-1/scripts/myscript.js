/*global document, alert, localStorage, FormData, XMLHttpRequest, jQuery, $
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
  jQuery.getJSON("users", {username: username, password: passwd}, cont);
}

function createUser(username, passwd, cont) {
  jQuery.post("users", {username: username, password: passwd}, cont, "json");
}

function getLogin(username, passwd, cont) {
  jQuery.getJSON("login", {username: username, password: passwd}, cont);
}

function getServerList(userid, cont) {
  jQuery.getJSON("users/" + userid + "/todos", cont);
}

function createTodoItem(userid, text, cont) {
  jQuery.post("users/" + userid + "/todos", {descr: text}, cont);
}

function deleteTodoItem(userid, eltid, cont) {
  jQuery.ajax({
    url: "users/" + userid + "/todos/" + eltid,
    method: "DELETE",
    success: cont
  });
}

function updateTodoItem(userid, eltid, done, text, cont) {
  jQuery.post("users/" + userid + "/todos/" + eltid,
              {descr: text, done: done},
              cont, "json");
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

function handleUpdateItem(res) {
  alert("Update: " + JSON.stringify(res));
  updateTodo(res.id, res.done, res.descr);
}

function handleDeleteItem(res) {
  alert("deleted: " + JSON.stringify(res));
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

var createItemInput = $("#createItemInput");

createItemInput.on("change", function () {
  createTodoItem(localStorage.userid, createItemInput.val(), function (item) {
    addTodo(item.id, item.done, item.descr);
  });
  createItemInput.val("");
});

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

var selectItems = allItems;

$("#selectAllButton").on("click", function () {
  selectItems = allItems;
  renderTodos(todos);
});

$("#selectDoneButton").on("click", function () {
  selectItems = doneItems;
  renderTodos(todos);
});

$("#selectOpenButton").on("click", function () {
  selectItems = openItems;
  renderTodos(todos);
});

renderTodos = function (todoList) {
  todoDiv.innerHTML = mkTodos(selectItems(todoList));
};

function handleUserList(data) {
  alert("list from server: " + JSON.stringify(data));
  var userid = data.userid;
  todos = [];
  renderTodos(todos);
  data.todos.forEach(function (elt) {
    addTodo(elt._id, elt.done, elt.description);
  });
}

function loginResponseHandler(data) {
  alert("user OK: " + JSON.stringify(data));
  if (data.username !== "") {
    localStorage.username = data.username;
    localStorage.userid = data.userid;
    getServerList(data.userid, handleUserList);
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
