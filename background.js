/**
 * All Background activity is carried out by Background.js
 */
/**
 * Will be called when user click's on the chrome extension. This method will be invoked from content.js
 */
chrome.browserAction.onClicked.addListener(function (tab) {
    // Send a message to the active tab
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        payLoad.url = tabs[0].url;
        payLoad.sender = parseTask(tabs[0]);
        chrome.tabs.sendMessage(tabs[0].id, {"message": "clicked_browser_action"});
    });
});

chrome.runtime.onMessage.addListener(send);

function send(message, sender, sendResponse) {
    if (!sender.tab)
        return;
    payLoad.htmlBody = message;
    sendAsAPI(payLoad);
}

function sendAsAPI(message) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', URL, true);
    xhr.setRequestHeader('Content-type', 'text/plain');
    xhr.send(JSON.stringify(message));
    window.setTimeout(reload, 500);
}

function reload() {
    window.location.reload();
}

const URL = "http://127.0.0.1:4243";
var payLoad = {
    "url": "https://www.hackerrank.com/challenges/30-bitwise-and/problem",
    "sender": "",
    "htmlBody": "<html><head></head><body></body></html>"
};

function parseTask(tab) {
    if (/^https:\/\/.*contest2?[.]yandex[.](ru|com)\/.*contest\/\d*\/problems.*$/.test(tab.url)) {
        return 'yandex';
    } else if (/^http:\/\/codeforces[.](ru|com)\/(contest|problemset|gym)\/(\d*\/problem|problem\/\d*)\/.+$/.test(tab.url)) {
        return 'codeforces';
    } else if (/^https:\/\/(www[.])?hackerrank[.]com.*$/.test(tab.url)) {
        return 'hackerrank';
    } else if (/^https:\/\/www[.]facebook[.]com\/hackercup\/problem\/\d+\/$/.test(tab.url)) {
        return 'facebook';
    } else if (/^http:\/\/(www[.])?usaco[.]org\/(current\/)?index[.]php[?]page[=]viewproblem.*$/.test(tab.url)) {
        return 'usaco';
    } else if (/^https:\/\/code[.]google[.]com\/codejam\/contest\/\d*\/dashboard.*$/.test(tab.url)) {
        return 'gcj';
    } else if (/^http:\/\/contest[.]bayan[.]ir\/en\/contest\/.*\/problem\/[A-Z]\/$/.test(tab.url)) {
        return 'bayan';
    } else if (/^https:\/\/.*[.]kattis[.]com\/(contests\/.+\/)?problems\/.*$/.test(tab.url)) {
        return 'kattis';
    } else if (/^https:\/\/(www[.])?codechef[.]com.*$/.test(tab.url)) {
        return 'codechef';
    } else if (/^https?:\/\/(www[.])?hackerearth[.]com\/(.*\/)?(algorithm|approximate)\/.*$/.test(tab.url)) {
        return 'hackerearth';
    } else if (/^http:\/\/.*[.]contest[.]atcoder[.]jp\/tasks\/.*$/.test(tab.url)) {
        return 'atcoder';
    } else if (/^https:\/\/csacademy[.]com\/contest\/.*\/task\/.*$/.test(tab.url)) {
        return 'csacademy';
    }
}