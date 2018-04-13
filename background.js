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
    "htmlBody": "<html><head></head><body></body></html>"
};