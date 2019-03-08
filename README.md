# YouTube real-time subcounter
Compare the subscriber number of two channels in real-time and see how many subscribers they are apart!

# Requirments
-  [Google API Key for YouTube Data v3](https://console.cloud.google.com/)

- The channel id of both channels you want to compare with.
  - Note: channel name and **channel id** are two different things! Feel free to implement some kind of _channel name to channel id converter_ by making a pull request.


# Code example
Initial code to get started
```
const CHANNEL_ONE = "UCiye1pHfrRQjIM-93Oe9wNw"; //potato analytics
const CHANNEL_TWO = "UCq-Fj5jknLsUf-MWSy4_brA"; //t-series

$(() => {
    // Init app
    new YouTubeData()
    .addChannel(new Channel(CHANNEL_ONE, 'one'))
    .addChannel(new Channel(CHANNEL_TWO, 'two'))
    .start();
});
```