var ytData;
const CHANNEL_ONE = "UCiye1pHfrRQjIM-93Oe9wNw"; //potato analytics
const CHANNEL_TWO = "UCq-Fj5jknLsUf-MWSy4_brA"; //t-series


$(() => {
    // Init app
    ytData = new YouTubeData();
    ytData.addChannel(new Channel(CHANNEL_ONE, 'one'));
    ytData.addChannel(new Channel(CHANNEL_TWO, 'two'));
    ytData.start();
});