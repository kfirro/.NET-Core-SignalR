"use strict";
import { Chart } from "chart.js";

const speed: number = 250;
const maxLiveResults: number = 5;
const isLive: boolean = false;

export class Site {
    liveViewArr: Array<string> = [];
    index: number = 0;
    //General
    speed: number = speed;
    maxLiveResults: number = maxLiveResults;
    isLive: boolean = isLive;
    //Charts
    chartsIdArr: Array<string> = ['chart'];
    barChartData: any = { datasets: [] };
    labels: Array<string> = [];
    chart: any;
    constructor() {
        this.createGraph();
    }
    private createGraph() {
        this.chart = new Chart(document.getElementById("chart"),
            {
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
    }
}



