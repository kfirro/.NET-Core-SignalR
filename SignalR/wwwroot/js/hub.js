"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("http://localhost:1749/hub").build();

connection.on("ReceiveMessage", function (actionName, errorCode, message) {
    if (isLive) {
        displayResults(actionName, errorCode, message);
    }
});

connection.start().catch(function (err) {
    return console.error(err.toString());
});