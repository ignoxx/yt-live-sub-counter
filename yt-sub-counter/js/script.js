const CHANNEL_ONE = "UC-lHJZR3Gqxm24_Vd_AJ5Yw"; //pewdiepie
const CHANNEL_TWO = "UCq-Fj5jknLsUf-MWSy4_brA"; //t-series


$(() => {
    // Init app
    new YouTubeData()
        .addChannel(new Channel(CHANNEL_ONE, 'one'))
        .addChannel(new Channel(CHANNEL_TWO, 'two'))
        .start();
});