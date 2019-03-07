var createCharts;
var updateChartValue;
var charts = {};

var live_subcount = true;
var live_subcount_update_speed = 2.05; //sec.

const API_KEY = "AIzaSyBKcTPclrtFQXyhPCvktDC1q4Mujohohok";//"AIzaSyDMUVWhfuOeYGIQblbESVaK1FOcDiIc4XE" //"AIzaSyBKcTPclrtFQXyhPCvktDC1q4Mujohohok";
const CHANNEL_ONE = "UCiye1pHfrRQjIM-93Oe9wNw"; //potato analytics
const CHANNEL_TWO = "UCq-Fj5jknLsUf-MWSy4_brA"; //t-series


$(() => {
    // Init app
    charts["potato"] = new SubChart('chart1');
    charts["t-series"] = new SubChart('chart2');

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
                charts["potato"].updateChartValue(currentSubCount);
            } 

            if(result.items[1].id == CHANNEL_TWO){
                let currentSubCount = result.items[1].statistics.subscriberCount;
                $(".odometer.channel-two").html(currentSubCount);
                charts["t-series"].updateChartValue(currentSubCount);
            }

            //Update subdifference
            $("#subdiff").html(Math.abs(result.items[0].statistics.subscriberCount - result.items[1].statistics.subscriberCount));
            
            if(!live_subcount){
                clearInterval(subInterval);
            }
        });
    }, live_subcount_update_speed * 1000);
    

});