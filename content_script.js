chrome.extension.onRequest.addListener(function (request, sender, sendResponse) {
    sendResponse(window.getSelection().toString());
});