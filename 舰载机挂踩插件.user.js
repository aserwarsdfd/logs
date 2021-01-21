// ==UserScript==
// @icon          https://www.youtube.com/favicon.ico
// @name          舰载机挂踩插件
// @author        andy
// @description   开启此插件后，CV-6舰载机会在挂满挂踩时间后再切换频道。
// @match         *://www.youtube.com/*
// @version       1.0.0
// @grant         unsafeWindow
// ==/UserScript==

(function() {
    'use strict';
    unsafeWindow.waitForDownvote = true;
})();