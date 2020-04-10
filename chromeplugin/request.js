chrome.webRequest.onBeforeRequest.addListener(function(info){
        const desktopUrl = info.url.replace(".m.", ".");
        return {redirectUrl: desktopUrl};
    },
    {
        urls: [
            "*://*.m.wikipedia.org/*"
        ],
        types: ["main_frame", "sub_frame", "stylesheet", "script", "image", "object", "xmlhttprequest", "other"]
    },
    ["blocking"]);