"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var site_1 = require("../site");
var hub_1 = require("../hub");
var sendButton = document.querySelector("#sendButton");
var liveViewToggle = document.getElementById("cbLiveView");
sendButton.addEventListener("click", function (e) {
    var message = document.getElementById("messageInput").value;
    if (hub_1.Hub.connection != null) {
        hub_1.Hub.connection.invoke("SendMessage", "Site", 200, message).catch(function (err) {
            return console.error(err.toString());
        });
    }
    e.preventDefault();
});
liveViewToggle.addEventListener("change", function (e) {
    site_1.SiteInstance.isLive = _this.checked;
});
//# sourceMappingURL=indexPages.js.map