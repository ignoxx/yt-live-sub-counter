var createCharts;
var updateChartValue;
var charts = {};

var live_subcount = true;
var live_subcount_update_speed = 3; //sec.

const API_KEY = "AIzaSyDMUVWhfuOeYGIQblbESVaK1FOcDiIc4XE" //"AIzaSyBKcTPclrtFQXyhPCvktDC1q4Mujohohok";
const CHANNEL_ONE = "UCiye1pHfrRQjIM-93Oe9wNw"; //potato analytics
const CHANNEL_TWO = "UCq-Fj5jknLsUf-MWSy4_brA"; //t-series


$(() => {
    // Chart functions
    createCharts = function (chartId, data) {
        let ctx = document.getElementById(chartId).getContext('2d');
        let myChart = new Chart(ctx, data);
        myChart.subHistory = [0, 0, 0, 0, 0, 0, 0];

        return myChart;
    }

    updateChartValue = function (chart, newValue) {
        chart.subHistory.push(newValue);
        chart.subHistory.shift();
        chart.data.datasets[0].data = chart.subHistory;


        let date = new Date;

        let newlabel = ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2) + ":" + ("0" + date.getSeconds()).slice(-2);

        chart.data.labels.shift()
        chart.data.labels.push(newlabel);

        chart.update();
    }

    // Init app
    charts["potato"] = createCharts("chart1", {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            labels: [0, 0, 0, 0, 0, 0, 0],
            datasets: [{
                label: "Subscribers",
                backgroundColor: 'rgba(255, 0, 0, 0.1)',
                borderColor: 'rgb(255, 0, 0)',
                data: [],
            }]
        },
    });

    charts["t-series"] = createCharts("chart2", {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            labels: [0, 0, 0, 0, 0, 0, 0],
            datasets: [{
                label: "Subscribers",
                backgroundColor: 'rgba(255, 0, 0, 0.1)',
                borderColor: 'rgb(255, 0, 0)',
                data: [],
            }]
        },
    });

    //Youtube data api v3
    updateChannelBanner = function(channelId, channelBannerUrl){
        if(channelId == CHANNEL_ONE) {
            $(".mdl-card__title.channel-one").css("background", `url(${channelBannerUrl}) center / cover`);
        }
        else if(channelId == CHANNEL_TWO) {
            $(".mdl-card__title.channel-two").css("background", `url(${channelBannerUrl}) center / cover`);
        }
    }

    updateChannelThumbnail = function(channelId, channelName, channelThumbnailUrl){
        if(channelId == CHANNEL_ONE) {
            $(".page-title.channel-one").html(channelName);
            $(".thumbnail.channel-one").attr("src", channelThumbnailUrl);
        }
        else if(channelId == CHANNEL_TWO) {
            $(".page-title.channel-two").html(channelName);
            $(".thumbnail.channel-two").attr("src", channelThumbnailUrl);
        }
    }

    // GET Thumbnail of channel (profile picture)
    $.ajax({
        url: `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${CHANNEL_ONE},${CHANNEL_TWO}&key=${API_KEY}`
    }).done((result)=>{
            if(result.items[0].id == CHANNEL_ONE){
                let thumbnailUrl = result.items[0].snippet.thumbnails.high.url;
                let channelName = result.items[0].snippet.title;
                updateChannelThumbnail(CHANNEL_ONE, channelName, thumbnailUrl);
            } 

            if(result.items[1].id == CHANNEL_TWO){
                let thumbnailUrl = result.items[1].snippet.thumbnails.high.url;
                let channelName = result.items[1].snippet.title;
                updateChannelThumbnail(CHANNEL_TWO, channelName, thumbnailUrl);
            }
    });

    // GET Chanel banner
    $.ajax({
        url: `https://www.googleapis.com/youtube/v3/channels?part=brandingSettings&id=${CHANNEL_ONE},${CHANNEL_TWO}&key=${API_KEY}`
    }).done((result)=>{
            if(result.items[0].id == CHANNEL_ONE){
                let bannerUrl = result.items[0].brandingSettings.image.bannerImageUrl;
                updateChannelBanner(CHANNEL_ONE, bannerUrl);
            } 

            if(result.items[1].id == CHANNEL_TWO){
                let bannerUrl = result.items[1].brandingSettings.image.bannerImageUrl;
                updateChannelBanner(CHANNEL_TWO, bannerUrl);
            }
    });
    


    

    //Live update subscriber count
    
    var subInterval = setInterval(() => {
        $.ajax({
            url: `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${CHANNEL_ONE},${CHANNEL_TWO}&key=${API_KEY}`
        }).done((result) => {
            if(result.items[0].id == CHANNEL_ONE){
                let currentSubCount = result.items[0].statistics.subscriberCount;
                $(".odometer.channel-one").html(currentSubCount);
                updateChartValue(charts["potato"], currentSubCount);
            } 

            if(result.items[1].id == CHANNEL_TWO){
                let currentSubCount = result.items[1].statistics.subscriberCount;
                $(".odometer.channel-two").html(currentSubCount);
                updateChartValue(charts["t-series"], currentSubCount);
            }

            //Update subdifference
            $("#subdiff").html(Math.abs(result.items[0].statistics.subscriberCount - result.items[1].statistics.subscriberCount));
            
            if(!live_subcount){
                clearInterval(subInterval);
            }
        });
    }, live_subcount_update_speed * 1000);
    

});