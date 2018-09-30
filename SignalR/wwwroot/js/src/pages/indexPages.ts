"use strict";
import { HubConnection } from "../hub";
import site from "../hub";
import * as $ from "jquery";

const sendButton: HTMLButtonElement = document.querySelector("#sendButton");
const liveViewToggle: JQuery<HTMLElement> = $(".btn-group");
const Hub: HubConnection = new HubConnection();

sendButton.addEventListener("click", (e: KeyboardEvent) => {
    const message = (<HTMLInputElement>document.getElementById("messageInput")).value;
    Hub.connection.invoke("SendMessage", "Site", 200, message).catch((err: any) => {
        return console.error(err.toString());
    });
    e.preventDefault();
});
liveViewToggle.click({}, () => {
    event.preventDefault();
    event.stopPropagation();
    const cb: HTMLInputElement = <HTMLInputElement>liveViewToggle.children().children()[0];
    cb.checked = !cb.checked;
    if (cb.checked)
        $(".btn.btn-danger").removeClass("btn-danger").addClass("btn-success").addClass("active");
    else
        $(".btn.btn-success").removeClass("btn-success").removeClass("active").addClass("btn-danger");
    site.isLive = cb.checked;    
});

