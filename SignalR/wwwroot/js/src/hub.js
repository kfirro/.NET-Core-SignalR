"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var site_1 = require("./site");
var signalR = require("@aspnet/signalr");
var site = new site_1.Site();
exports.default = site;
var HubConnection = /** @class */ (function () {
    function HubConnection() {
        this.connection = null;
        this.serverUrl = "http://localhost:1749/hub";
        this.connection = new signalR.HubConnectionBuilder().withUrl(this.serverUrl).build();
        this.connection.on("ReceiveMessage", function (actionName, errorCode, message) {
            console.log("Message Received: " + actionName + errorCode + message);
            if (site.isLive) {
                site_1.Utils.displayResults(site, actionName, errorCode, message);
            }
        });
        this.connection.start().catch(function (err) { return console.log(err); });
    }
    return HubConnection;
}());
exports.HubConnection = HubConnection;
//# sourceMappingURL=hub.js.map