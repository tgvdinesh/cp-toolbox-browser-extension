// content.js
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.message === "clicked_browser_action") {
            var body = $("html").html();
            console.clear();
            console.log("Sending data which is being listened in plugin!");
            chrome.runtime.sendMessage({"message": "open_new_tab", "url": body});
        }
    }
);