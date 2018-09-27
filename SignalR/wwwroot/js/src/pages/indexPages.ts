"use strict";
import { HubConnection } from "../hub";
import site from "../hub";

const sendButton: HTMLButtonElement = document.querySelector("#sendButton");
const liveViewToggle: HTMLInputElement = <HTMLInputElement>document.getElementById("cbLiveView");
const Hub: HubConnection = new HubConnection();

sendButton.addEventListener("click", (e: KeyboardEvent) => {
    const message = (<HTMLInputElement>document.getElementById("messageInput")).value;
    Hub.connection.invoke("SendMessage", "Site", 200, message).catch((err: any) => {
        return console.error(err.toString());
    });
    e.preventDefault();
});
liveViewToggle.addEventListener("change", (e: KeyboardEvent) => {
    site.isLive = liveViewToggle.checked;
});

