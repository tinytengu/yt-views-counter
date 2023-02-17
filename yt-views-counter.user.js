// ==UserScript==
// @name         YT Views Counter
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Count how many times you watched YT video
// @author       tinytengu
// @match        https://www.youtube.com/watch*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @downloadURL  https://github.com/tinytengu/yt-views-counter/raw/main/yt-views-counter.user.js
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

(function() {
    'use strict';

    function getVideoURL() {
        return document.querySelector("meta[itemprop='videoId']").content;
    }

    setInterval(async () => {
        let el = document.querySelector("yt-formatted-string[id='info'] span");
        if (el === null || el.textContent.includes("(")) return;

        const videoURL = getVideoURL();
        const views = GM_getValue(videoURL, 0);
        GM_setValue(videoURL, views + 1);

        el.textContent = `${el.textContent} (${views})`;
        console.log(`[yt view count] Viewed ${videoURL} ${views} times`);
    }, 500);
})();
