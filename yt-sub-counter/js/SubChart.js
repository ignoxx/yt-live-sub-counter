class SubChart {

    constructor(elementId) {
        this.historyLength = 6; // How much points can we look back? 

        this.templateData = {
            type: 'line',
    
            // The data for our dataset
            data: {
                labels: [],
                datasets: [{
                    label: "Subscribers",
                    backgroundColor: 'rgba(255, 0, 0, 0.1)',
                    borderColor: 'rgb(255, 0, 0)',
                    data: [],
                }]
            },
        }
        let ctx = document.getElementById(elementId).getContext('2d');

        this.chart = new Chart(ctx, this.templateData);
        console.log(this.templateData);
        this.chart.subHistory = [];
    }

    updateChartValue(newValue) {

        //Add new values to chart
        this.chart.subHistory.push(newValue);
        this.chart.data.labels.push(this.getCurrentTime());

        //Shift list if we reach our historyLength
        if(this.chart.subHistory.length > this.historyLength) {
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