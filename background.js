// background.js

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function (tab) {
    // Send a message to the active tab
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
    });
});

chrome.runtime.onMessage.addListener(send);

// This block is new!
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.message === "open_new_tab") {
            chrome.tabs.create({"url": request.url});
        }
    }
);

function send(message, sender, sendResponse) {
    if (!sender.tab)
        return;
    sendAsAPI(message);
    getToolboxURN("idea", "git@github.com:tgvdinesh/java-cp.git");
}

function sendAsAPI(message) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:4243', true);
    xhr.setRequestHeader('Content-type', 'text/plain');
    xhr.send(message);
    window.setTimeout(reload, 500);
}

/**
 * This method requires JetBrains ToolBox to be pre-installed in user's machine.
 * This method will open jetbrains and open dialog box to clone into workspace.
 * Source :- https://github.com/JetBrains/toolbox-browser-extension
 * @param tool JetBrains project to be opened. Ex: idea, clion,..
 * @param cloneUrl URL to be cloned form GitHub. Ex: git@github.com:tgvdinesh/java-cp.git
 * @author Dinesh V
 */
var getToolboxURN = function (tool, cloneUrl) {
    var url = 'jetbrains://' + tool + '/checkout/git?checkout.repo=' + cloneUrl + '&idea.required.plugins.id=Git4Idea';
    chrome.tabs.create({"url": url});
};

function reload() {
    window.location.reload();
}