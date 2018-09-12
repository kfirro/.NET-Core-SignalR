"use strict";

var liveViewArr = [];
var isLive = false;
var maxLiveResults = 10;
var index = 0;
var connection = new signalR.HubConnectionBuilder().withUrl("http://localhost:1749/hub").build();

connection.on("ReceiveMessage", function (actionName, errorCode, message) {
    if (isLive) {
        displayResults(actionName, errorCode, message);
    }
});

connection.start().catch(function (err) {
    return console.error(err.toString());
});

document.getElementById("sendButton").addEventListener("click", function (event) {
    var message = document.getElementById("messageInput").value;
    connection.invoke("SendMessage", "Site", 200, message).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});
document.getElementById("cbLiveView").addEventListener("change", function (event) {
    isLive = this.checked;
});

function injectHtmlResult(encodedMsg, index) {
    var li = document.createElement("li");
    li.textContent = encodedMsg;
    li.id = "messagesList_" + index;
    if (document.getElementById(li.id) === null)
        document.getElementById("messagesList").appendChild(li);
    else
        document.getElementById(li.id).textContent = encodedMsg;
    highlightFor(li.id, 'yellow', 2);
}
function cyclicPush(arr, maxLength, index, obj) {
    if (index >= maxLength) {
        index = 0;
    }
    arr[index] = obj;
    return index + 1;
}
function displayResults(actionName, errorCode, message) {
    var msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    var encodedMsg = "Action: " + actionName + " Status Code: " + errorCode + " Message:" + msg;
    index = cyclicPush(liveViewArr, maxLiveResults, index, encodedMsg);
    injectHtmlResult(encodedMsg, index);
}
function highlightFor(id, color, seconds) {
    var element = document.getElementById(id)
    var origcolor = element.style.backgroundColor
    element.style.backgroundColor = color;
    var t = setTimeout(function () {
        element.style.backgroundColor = origcolor;
    }, (seconds * 1000));
}