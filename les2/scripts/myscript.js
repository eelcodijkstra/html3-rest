/*global document, alert, localStorage, FormData, XMLHttpRequest, jQuery, $
*/

var par1Input = document.getElementById("par1Input");
var par2Input = document.getElementById("par2Input");

function handleAjaxResponse() {
  alert("OK: " + this.responseText + " resultaatcode: " + this.status);
}

function handleErrorResponse() {
  alert("Error: " + this.responseText + " resultaatcode: " + this.status);
}

function handleGet() {
  var par1 = par1Input.value;
  var par2 = par2Input.value;
  var req = new XMLHttpRequest();
  req.addEventListener("load", handleAjaxResponse);
  req.open("GET", "echo" + "?par1=" + par1 + "&par2=" + par2);
  req.send();
}

document.getElementById("getButton").onclick = handleGet;

function handlePost() {
  var par1 = par1Input.value;
  var par2 = par2Input.value;
  var req = new XMLHttpRequest();
  req.addEventListener("load", handleAjaxResponse);
  req.open("POST", "echo");
  req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  req.send("par1=" + par1 + "&par2=" + par2);
}

document.getElementById("postButton").onclick = handlePost;

function handlePut() {
  var data = new FormData();
  data.append("par1", par1Input.value);
  data.append("par2", par2Input.value);
  var req = new XMLHttpRequest();
  req.addEventListener("load", handleAjaxResponse);
  req.open("PUT", "echo");
  req.send(data);
}

document.getElementById("putButton").onclick = handlePut;

function handleDelete() {
  var par1 = par1Input.value;
  var par2 = par2Input.value;
  var req = new XMLHttpRequest();
  req.addEventListener("load", handleAjaxResponse);
  req.open("DELETE", "echo" + "?par1=" + par1 + "&par2=" + par2);
  req.send();
}

document.getElementById("deleteButton").onclick = handleDelete;

function handleNotFoundButton() {
  var req = new XMLHttpRequest();
  req.addEventListener("load", handleAjaxResponse);
  req.addEventListener("error", handleErrorResponse);
  req.open("GET", "scripts/nothing.js");
  req.send();
}

document.getElementById("notFoundButton").onclick = handleNotFoundButton;
