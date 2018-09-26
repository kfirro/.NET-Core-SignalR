"use strict";
import { SiteInstance } from "../site";
import { Hub } from "../hub";

const sendButton: HTMLButtonElement = document.querySelector("#sendButton");
const liveViewToggle: HTMLInputElement = <HTMLInputElement>document.getElementById("cbLiveView");

sendButton.addEventListener("click", (e: KeyboardEvent) => {
    const message = (<HTMLInputElement>document.getElementById("messageInput")).value;
    if (Hub.connection != null) {
        Hub.connection.invoke("SendMessage", "Site", 200, message).catch((err: any) => {
            return console.error(err.toString());
        });
    }
    e.preventDefault();
});
liveViewToggle.addEventListener("change", (e: KeyboardEvent) => {
    SiteInstance.isLive = this.checked;
});

