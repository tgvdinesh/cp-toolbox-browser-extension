/**
 * All Background activity is carried out by Background.js
 */
/**
 * Will be called when user click's on the chrome extension. This method will be invoked from content.js
 */
chrome.browserAction.onClicked.addListener(function (tab) {
    // Send a message to the active tab
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
    });
});

chrome.runtime.onMessage.addListener(send);

function send(message, sender, sendResponse) {
    if (!sender.tab)
        return;
    sendAsAPI(message);
}

function sendAsAPI(message) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:4243', true);
    xhr.setRequestHeader('Content-type', 'text/plain');
    xhr.send(message);
    window.setTimeout(reload, 500);
}

function reload() {
    window.location.reload();
}