# How to record vector field videos?

In physics, the **observer effect** is the fact that simply observing a situation or phenomenon
necessarily changes that phenomenon.

Similarly, when I tried to record what's happening on the screen, things were loosing
their appeal. Video recording software quite often dropped frames or impacted overall performance.

So, how can we observe the system without affecting the system? - Let's become part of the system!

I built in video recorder into the website. It can only be started from developer's console
in your browser. When frame is rendered, a screenshot is sent to the server to build a movie.

Unfortunately I don't have spare capacity to host the server, so if you want to record a video,
you'll need to follow these instructions

**Step 1:** Make sure you have [node.js](https://nodejs.org/) installed. 

**Step 2:** Install the video recording service
```
git clone https://github.com/greggman/ffmpegserver.js.git
cd ffmpegserver.js
npm install
```

**Step 3:** Start the server `node start.js --allow-arbitrary-ffmpeg-arguments`. Note: The ffmpeg-arguments
is required because I [request higher screen capturing bitrate](https://github.com/anvaka/fieldplay/blob/e128f580bc9495189e5e56015f00650d75f44a38/src/lib/nativeMain.js#L69) than
what is available by default.

**Step 4:** In the developer tools console of your browser type `startRecord()`. If you see a `Mixed Content error`,
make sure to make an exception for the screen recording (it is safe, as all communication happens between your
browser and your local host - requests should not go to external network).

This will make application seem unresponsive, but in the console you'll notice video recording log. After
a while type in the console `stopRecord()`. This will "commit" video recording. When video is processed, it can be
found in the `output` of your `ffmpegserver.js` server. E.g. `ffmpegserver.js/output/fieldplay-6.mp4`