"use strict";

document.getElementById("sendButton").addEventListener("click", function (event) {
    var message = document.getElementById("messageInput").value;
    debugger;
    connection.invoke("SendMessage", "Site", 200, message).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});
document.getElementById("cbLiveView").addEventListener("change", function (event) {
    isLive = this.checked;
});


