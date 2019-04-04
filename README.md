# YouTube real-time subcounter
Compare the subscriber count of two channels in real-time and see how many subscribers they are apart!

# Requirments
-  [Google API Key for YouTube Data v3](https://console.cloud.google.com/)

- The channel id of both channels you want to compare with.
  - Note: channel name and **channel id** are two different things! Feel free to implement some kind of _channel name to channel id converter_ by making a pull request.


# Code example
Initial code to get started [(src/script.js)](https://github.com/IgnasKavaliauskas/yt-live-sub-counter/blob/master/yt-sub-counter/js/script.js)
```
const CHANNEL_ONE = "UC-lHJZR3Gqxm24_Vd_AJ5Yw"; //pewdiepie
const CHANNEL_TWO = "UCq-Fj5jknLsUf-MWSy4_brA"; //t-series


$(() => {
    // Init app
    new YouTubeData()
        .addChannel(new Channel(CHANNEL_ONE, 'one'))
        .addChannel(new Channel(CHANNEL_TWO, 'two'))
        .start();
});
```
# Screenshot(s)
![Screenshot](https://github.com/IgnasKavaliauskas/yt-live-sub-counter/blob/master/screenshots/screenshot.jpg)
