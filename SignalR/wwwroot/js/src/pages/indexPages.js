"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var hub_1 = require("../hub");
var hub_2 = require("../hub");
var sendButton = document.querySelector("#sendButton");
var liveViewToggle = document.getElementById("cbLiveView");
var Hub = new hub_1.HubConnection();
sendButton.addEventListener("click", function (e) {
    var message = document.getElementById("messageInput").value;
    console.log("Hub.connection: " + Hub.connection);
    Hub.connection.invoke("SendMessage", "Site", 200, message).catch(function (err) {
        return console.error(err.toString());
    });
    e.preventDefault();
});
liveViewToggle.addEventListener("change", function (e) {
    console.log("site.isLive changed from: " + hub_2.default.isLive + " to: " + liveViewToggle.checked);
    hub_2.default.isLive = liveViewToggle.checked;
});
//# sourceMappingURL=indexPages.js.map