import { Site } from "./site";

export module Utils {
    export function injectHtmlResult(title: string, encodedMsg: string, index: number) {
        var div = document.createElement("div");
        div.setAttribute('data-badger', title);
        div.classList.add('badger-left');
        div.classList.add('badger-warning');
        div.classList.add('divBadger');
        div.textContent = encodedMsg;
        div.id = "messagesList_" + index;
        if (document.getElementById(div.id) === null)
            document.getElementById("messagesList").appendChild(div);
        else
            document.getElementById(div.id).textContent = encodedMsg;
        highlightFor(div.id, 'yellow', 2);
    }
    export function cyclicPush(arr: Array<any>, maxLength: number, index: number, obj: any): number {
        if (index >= maxLength) {
            index = 0;
        }
        arr[index] = obj;
        return index + 1;
    }
    export function displayResults(site: Site, actionName: string, errorCode: number, message: string) {
        var msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        var encodedMsg = "Action: " + actionName + ", Status Code: " + errorCode + ", Message:" + msg;
        site.index = cyclicPush(site.liveViewArr, site.maxLiveResults, site.index, encodedMsg);
        injectHtmlResult(actionName, encodedMsg, site.index);
        for (var i = 0; i < site.chartsIdArr.length; i++) {
            CreateOrUpdateDataSet(site, actionName, errorCode);
        }
    }
    export function getRandomColor(): string {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    export function highlightFor(id: string, color: string, seconds: number) {
        var element = document.getElementById(id)
        var origcolor = element.style.backgroundColor
        element.style.backgroundColor = color;
        var t = setTimeout(function () {
            element.style.backgroundColor = origcolor;
        }, (seconds * 1000));
    }
    export function CreateOrUpdateDataSet(site: Site, actionName: string, errorCode: number) {
        if (site.labels.indexOf(actionName) === -1) { //It's a new one 
            site.labels.push(actionName);
            var color = getRandomColor();
            site.barChartData.datasets.push(
                {
                    label: actionName,
                    fill: false,
                    backgroundColor: color,
                    borderColor: color,
                    borderWidth: 1,
                    data: [
                        1 //Initial value
                    ]
                });
        }
        else { //Update only the data
            var obj = undefined;
            for (var i = 0; i < site.barChartData.datasets.length; i++) {
                if (site.barChartData.datasets[i].label === actionName) {
                    site.barChartData.datasets[i].data[0] = site.barChartData.datasets[i].data[0] + 1; //Increment method's hit count
                    break;
                }
            }
        }
        site.chart.update();
    }
}