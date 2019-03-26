class YouTubeData {
    constructor() {
        this.API_KEY = "YOUR_KEY_HERE";
        this.liveData = true;
        this.liveDataUpdateSpeed = 2.05; //seconds

        this.channels = [];

        return this;
    }

    start(updateSpeed = this.liveDataUpdateSpeed) {
        this.updateData();

        if (updateSpeed != this.liveDataUpdateSpeed) {
            this.liveDataUpdateSpeed = updateSpeed;
        }

        if (this.liveData) {
            this.updateIntervall = setInterval(this.updateData.bind(this), this.liveDataUpdateSpeed * 1000);
        }
        else {
            setTimeout(this.updateData.bind(this), this.liveDataUpdateSpeed * 1000);
        }
    }

    addChannel(Channel) {
        if (!(Channel in this.channels)) {
            if (this.channels.length < 2) {
                this.channels.push(Channel);
            }
        }

        return this;
    }

    removeChannel(Channel) {
        if (Channel in this.channels) {
            let index = this.channels.indexOf(Channel);
            this.channels.splice(index, 1);
        }
    }

    updateData() {
        // #region Update data only if we have 2 provided channels
        if (this.channels.length < 2) return;

        for (let i in this.channels) {
            if (this.channels[i] === undefined) return;
        }
        // #endregion

        let updateImages = false;
        // #region check if we need to update images
        for (let i in this.channels) {
            if (this.channels[i].bannerUrl === undefined || this.channels[i].thumbnailUrl === undefined) {
                updateImages = true;
                break;
            }
        }
        // #endregion

        // #region define URLs
        let channelOne = this.channels[0].id;
        let channelTwo = this.channels[1].id;

        let ytThumbnailUrl = `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelOne},${channelTwo}&key=${this.API_KEY}`;
        let ytBannerUrl = `https://www.googleapis.com/youtube/v3/channels?part=brandingSettings&id=${channelOne},${channelTwo}&key=${this.API_KEY}`;
        let ytSubCountUrl = `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelOne},${channelTwo}&key=${this.API_KEY}`;
        // #endregion

        if (updateImages) {

            // #region GET thumbnail and channelName
            $.ajax({
                url: ytThumbnailUrl,
                error: this.handleError
            }).done((result) => {
                for (let i in result.items) {
                    if (result.items[i].id == this.channels[i].id) {
                        this.channels[i].setThumbnail(result.items[i].snippet.thumbnails.high.url);
                        this.channels[i].setChannelName(result.items[i].snippet.title);
                    }
                }
            });
            // #endregion

            // #region GET banner
            $.ajax({
                url: ytBannerUrl,
                error: this.handleError
            }).done((result) => {
                for (let i in result.items) {
                    if (result.items[i].id == this.channels[i].id) {
                        this.channels[i].setBanner(result.items[i].brandingSettings.image.bannerImageUrl);
                    }
                }
            });
            // #endregion
        }

        // #region GET subCount
        $.ajax({
            url: ytSubCountUrl,
            error: this.handleError
        }).done((result) => {
            for (let i in result.items) {
                if (result.items[i].id == this.channels[i].id) {
                    this.channels[i].setSubCount(result.items[i].statistics.subscriberCount);
                }
            }

            // Update sub-difference
            $(this.channels[0].htmlElements.subDiff)
                .html(Math.abs(this.channels[0].subCount - this.channels[1].subCount));
        });
        // #endregion   
    }

    handleError(request, status, error) {
        console.log("### AJAX ERROR ###");
        console.log(`${request} | ${status} | ${error}`);
        console.log("#################");
    }
}
