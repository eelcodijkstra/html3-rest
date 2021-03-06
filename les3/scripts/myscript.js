/*global document, alert, localStorage, FormData, XMLHttpRequest, jQuery, $
*/

var par1Input = document.getElementById("par1Input");
var par2Input = document.getElementById("par2Input");

function handleAjaxResponse(data, status, xhr) {
  alert(xhr.responseText + " resultaatcode: " + status);
}

function handleAjaxError(xhr, status, error) {
  alert(xhr.responseText + " resultaatcode: " + status);
}

function handleGet() {
  var par1 = par1Input.value;
  var par2 = par2Input.value;
  $.ajax({method: "GET", url: "echo" + "?par1=" + par1 + "&par2=" + par2
    })
      .done(handleAjaxResponse)
      .fail(handleAjaxError);
}

document.getElementById("getButton").onclick = handleGet;

function handlePost() {
  var par1 = par1Input.value;
  var par2 = par2Input.value;
//  req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  $.ajax({
    method: "POST",
    url: "echo",
    contentType: "application/json",
    data: JSON.stringify({par1: par1, par2: par2})
  })
    .done(handleAjaxResponse)
    .fail(handleAjaxError);
}

document.getElementById("postButton").onclick = handlePost;

function handlePut() {
  $.ajax({
    method: "PUT",
    url: "echo",
    data: {par1: par1Input.value, par2: par2Input.value}
  })
    .done(handleAjaxResponse)
    .fail(handleAjaxError);
}

document.getElementById("putButton").onclick = handlePut;

$("#deleteButton").on("click", function (evt) {
  var par1 = par1Input.value;
  var par2 = par2Input.value;
  $.ajax({
    url: "echo" + "?par1=" + par1 + "&par2=" + par2,
    method: "DELETE"
  }).done(handleAjaxResponse)
    .fail(handleAjaxError);
});

$("#notFoundButton").on("click", function (evt) {
  $.ajax({
    url: "scripts/nothing.js",
    method: "GET"
  }).done(function (data, status, xhr) {
    alert("OK: " + JSON.stringify(data) + " - status: " + status);
  }).fail(function (xhr, status, error) {
    alert("Error " + xhr.responseText + " - status: " + error + " " + xhr.status);
  });
});
