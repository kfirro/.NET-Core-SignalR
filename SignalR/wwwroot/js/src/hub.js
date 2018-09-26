"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var site_1 = require("./site");
var signalR = require("@aspnet/signalr");
var HubConnection = /** @class */ (function () {
    function HubConnection() {
        this.connection = null;
        this.serverUrl = "http://localhost:1749/hub";
        this.connection = new signalR.HubConnectionBuilder().withUrl(this.serverUrl).build();
        this.connection.on("ReceiveMessage", function (actionName, errorCode, message) {
            if (site_1.SiteInstance.isLive) {
                site_1.Utils.displayResults(site_1.SiteInstance, actionName, errorCode, message);
            }
        });
        this.connection.start().catch(function (err) { return console.log(err); });
    }
    return HubConnection;
}());
exports.Hub = new HubConnection();
//# sourceMappingURL=hub.js.map