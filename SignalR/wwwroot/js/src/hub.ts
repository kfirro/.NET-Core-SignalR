"use strict";
import { SiteInstance, Utils } from "./site";
import * as signalR from "@aspnet/signalr";


class HubConnection {
    connection: signalR.HubConnection = null;
    private serverUrl: string = "http://localhost:1749/hub";
    constructor() {
        this.connection = new signalR.HubConnectionBuilder().withUrl(this.serverUrl).build();
        this.connection.on("ReceiveMessage", function (actionName: string, errorCode: number, message: string) {
            if (SiteInstance.isLive) {
                Utils.displayResults(SiteInstance, actionName, errorCode, message);
            }
        });
        this.connection.start().catch(err => console.log(err));
    }
}
export let Hub: HubConnection = new HubConnection();