"use strict";

var liveViewArr = [];
var isLive = false;
var maxLiveResults = 10;
var index = 0;

//Charts
var chartsIdArr = ['chart'];
var barChartData = { datasets: [] };
var speed = 250;
var labels = [];

var chart = new Chart(document.getElementById("chart"),
    {
        type: 'bar',
        labels: labels,
        data: barChartData,
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
                        ticks:
                        {
                            beginAtZero: true,
                            steps: 10,
                            stepValue: 5,
                        }
                    }
                ]
            }
        }
    });

function injectHtmlResult(encodedMsg, index) {
    var li = document.createElement("li");
    li.textContent = encodedMsg;
    li.id = "messagesList_" + index;
    if (document.getElementById(li.id) === null)
        document.getElementById("messagesList").appendChild(li);
    else
        document.getElementById(li.id).textContent = encodedMsg;
    highlightFor(li.id, 'yellow', 2);
}
function cyclicPush(arr, maxLength, index, obj) {
    if (index >= maxLength) {
        index = 0;
    }
    arr[index] = obj;
    return index + 1;
}
function displayResults(actionName, errorCode, message) {
    var msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    var encodedMsg = "Action: " + actionName + ", Status Code: " + errorCode + ", Message:" + msg;
    index = cyclicPush(liveViewArr, maxLiveResults, index, encodedMsg);
    injectHtmlResult(encodedMsg, index);
    for (var i = 0; i < chartsIdArr.length; i++) {
        CreateOrUpdateDataSet(chart, actionName, errorCode);
    }
}
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function highlightFor(id, color, seconds) {
    var element = document.getElementById(id)
    var origcolor = element.style.backgroundColor
    element.style.backgroundColor = color;
    var t = setTimeout(function () {
        element.style.backgroundColor = origcolor;
    }, (seconds * 1000));
}
function CreateOrUpdateDataSet(chart, actionName, errorCode) {
    if (labels.indexOf(actionName) === -1) { //It's a new one 
        labels.push(actionName);
        var color = getRandomColor();
        barChartData.datasets.push(
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
        for (var i = 0; i < barChartData.datasets.length; i++) {
            if (barChartData.datasets[i].label === actionName) {
                barChartData.datasets[i].data[0] = barChartData.datasets[i].data[0] + 1; //Increment method's hit count
                break;
            }
        }
    }
    chart.update();
}

