class SubChart {
    historyLength = 6; // How much points can we look back? 

    templateData = {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            labels: [],//[0, 0, 0, 0, 0, 0, 0],
            datasets: [{
                label: "Subscribers",
                backgroundColor: 'rgba(255, 0, 0, 0.1)',
                borderColor: 'rgb(255, 0, 0)',
                data: [],
            }]
        },
    }

    constructor(elementId) {
        this.htmlElement = $(`#${elementId}`);
        let ctx = document.getElementById(elementId).getContext('2d');

        this.chart = new Chart(ctx, templateData);
        this.chart.subHistory = [];
    }

    updateChartValue(newValue) {
        this.chart.subHistory.push(newValue);
        this.chart.data.labels.push(this.getCurrentTime());

        if(this.chart.subHistory.length > historyLength) {
            this.chart.subHistory.shift();
            this.chart.data.labels.shift();
        }
        
        this.chart.data.datasets[0].data = this.chart.subHistory;

        this.chart.update();
    }

    getCurrentTime() {
        // HH:MM:SS is the returned format
        let date = new Date;
        return ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2) + ":" + ("0" + date.getSeconds()).slice(-2);
    }
}