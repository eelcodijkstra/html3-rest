/*global document, alert, localStorage, FormData, XMLHttpRequest, jQuery, $
*/

var par1Input = document.getElementById("par1Input");
var par2Input = document.getElementById("par2Input");

function handleAjaxResponse() {
  alert(this.responseText);
}

function handleGet(cont) {
  var par1 = par1Input.value;
  var par2 = par2Input.value;
  var req = new XMLHttpRequest();
  req.addEventListener("load", handleAjaxResponse);
  req.open("GET", "echo" + "?par1=" + par1 + "&par2=" + par2);
  req.send();
}

 document.getElementById("getButton").onclick = handleGet;

function handlePost(cont) {
  var par1 = par1Input.value;
  var par2 = par2Input.value;
  var req = new XMLHttpRequest();
  req.addEventListener("load", handleAjaxResponse);
  req.open("POST", "echo");
  req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  req.send("par1=" + par1 + "&par2=" + par2);
}

document.getElementById("postButton").onclick = handlePost;

function handlePut(cont) {
  var par1 = par1Input.value;
  var par2 = par2Input.value;
  var req = new XMLHttpRequest();
  req.addEventListener("load", handleAjaxResponse);
  req.open("PUT", "echo");
  req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  req.send("par1=" + par1 + "&par2=" + par2);
}

document.getElementById("putButton").onclick = handlePut;

function handleDelete(cont) {
  var par1 = par1Input.value;
  var par2 = par2Input.value;
  var req = new XMLHttpRequest();
  req.addEventListener("load", handleAjaxResponse);
  req.open("DELETE", "echo" + "?par1=" + par1 + "&par2=" + par2);
  req.send();
}

document.getElementById("deleteButton").onclick = handleDelete;
