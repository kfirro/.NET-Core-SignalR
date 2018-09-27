"use strict";
import { Site, Utils } from "./site";
import * as signalR from "@aspnet/signalr";

const site: Site = new Site();
export default site;

export class HubConnection {
    connection: signalR.HubConnection = null;
    private serverUrl: string = "http://localhost:1749/hub";
    constructor() {
        this.connection = new signalR.HubConnectionBuilder().withUrl(this.serverUrl).build();
        this.connection.on("ReceiveMessage", function (actionName: string, errorCode: number, message: string) {
            if (site.isLive) {
                Utils.displayResults(site, actionName, errorCode, message);
            }
        });
        this.connection.start().catch(err => console.log(err));
    }
}
