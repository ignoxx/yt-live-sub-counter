class Channel {
    constructor(channelId, htmlElementAppendix) {
        this.id = channelId;
        this.name;
        this.bannerUrl;
        this.thumbnailUrl;
        this.subCount;

        this.htmlElements = {
            bannerId: `.mdl-card__title.channel-${htmlElementAppendix}`,
            thumbnailId: `.thumbnail.channel-${htmlElementAppendix}`,
            channelNameId: `.page-title.channel-${htmlElementAppendix}`,
            subCountId: `.odometer.channel-${htmlElementAppendix}`,
            subDiff: `#subdiff`
        };
        
        this.chart = new SubChart(`chart-${htmlElementAppendix}`);
    }

    setBanner(bannerUrl) {
        this.bannerUrl = bannerUrl;
        $(this.htmlElements.bannerId).css("background", `url(${bannerUrl}) center / cover`);
    }

    setThumbnail(thumbnailUrl) {
        this.thumbnailUrl = thumbnailUrl;
        $(this.htmlElements.thumbnailId).attr("src", thumbnailUrl);
    }

    setSubCount(subCount) {
        this.subCount = subCount;
        this.chart.updateChartValue(subCount);
        $(this.htmlElements.subCountId).html(subCount);
        
    }

    setChannelName(channelName) {
        this.name = channelName;
        $(this.htmlElements.channelNameId).html(channelName);
    }
}