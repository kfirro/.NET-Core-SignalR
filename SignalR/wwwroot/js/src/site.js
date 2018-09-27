"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chart_js_1 = require("chart.js");
var speed = 250;
var maxLiveResults = 10;
var isLive = false;
//TODO: Remove it to external ts file (with webpack build/bundle config)
var Utils;
(function (Utils) {
    function injectHtmlResult(encodedMsg, index) {
        console.log("injectHtmlResult");
        var li = document.createElement("li");
        li.textContent = encodedMsg;
        li.id = "messagesList_" + index;
        if (document.getElementById(li.id) === null)
            document.getElementById("messagesList").appendChild(li);
        else
            document.getElementById(li.id).textContent = encodedMsg;
        highlightFor(li.id, 'yellow', 2);
    }
    Utils.injectHtmlResult = injectHtmlResult;
    function cyclicPush(arr, maxLength, index, obj) {
        if (index >= maxLength) {
            index = 0;
        }
        arr[index] = obj;
        return index + 1;
    }
    Utils.cyclicPush = cyclicPush;
    function displayResults(site, actionName, errorCode, message) {
        console.log("displayResults");
        var msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        var encodedMsg = "Action: " + actionName + ", Status Code: " + errorCode + ", Message:" + msg;
        site.index = cyclicPush(site.liveViewArr, maxLiveResults, site.index, encodedMsg);
        injectHtmlResult(encodedMsg, site.index);
        for (var i = 0; i < site.chartsIdArr.length; i++) {
            CreateOrUpdateDataSet(site, actionName, errorCode);
        }
    }
    Utils.displayResults = displayResults;
    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    Utils.getRandomColor = getRandomColor;
    function highlightFor(id, color, seconds) {
        var element = document.getElementById(id);
        var origcolor = element.style.backgroundColor;
        element.style.backgroundColor = color;
        var t = setTimeout(function () {
            element.style.backgroundColor = origcolor;
        }, (seconds * 1000));
    }
    Utils.highlightFor = highlightFor;
    function CreateOrUpdateDataSet(site, actionName, errorCode) {
        console.log("site.labels == " + site.labels);
        if (site.labels.indexOf(actionName) === -1) { //It's a new one 
            site.labels.push(actionName);
            var color = getRandomColor();
            site.barChartData.datasets.push({
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
    Utils.CreateOrUpdateDataSet = CreateOrUpdateDataSet;
})(Utils = exports.Utils || (exports.Utils = {}));
var Site = /** @class */ (function () {
    function Site() {
        this.liveViewArr = [];
        this.index = 0;
        //General
        this.speed = speed;
        this.maxLiveResults = maxLiveResults;
        this.isLive = isLive;
        //Charts
        this.chartsIdArr = ['chart'];
        this.barChartData = { datasets: [] };
        this.labels = [];
        this.createGraph();
    }
    Site.prototype.createGraph = function () {
        console.log("Creating chart?!");
        this.chart = new chart_js_1.Chart(document.getElementById("chart"), {
            type: 'bar',
            labels: this.labels,
            data: this.barChartData,
            options: {
                responsive: true,
                animation: {
                    duration: speed * 1.5,
                    easing: 'linear'
                },
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'API Actions'
                },
                scales: {
                    yAxes: [
                        {
                            ticks: {
                                beginAtZero: true,
                                steps: 10,
                                stepValue: 5,
                            }
                        }
                    ]
                }
            }
        });
    };
    return Site;
}());
exports.Site = Site;
//# sourceMappingURL=site.js.map