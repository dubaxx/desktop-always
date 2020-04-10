/************************ REDIRECT CODE ***********************/
chrome.webRequest.onBeforeRequest.addListener(function(details) {
    return detectRedirect(details);
}, {
    urls : ["<all_urls>"],
    types: ["main_frame","sub_frame"]
}, ["blocking"]);


function detectRedirect(details) {
    var url = details.url;

    if (url == null) {
        return;
    }

    var domain = url_domain(url);
    var wikipediaurl = "www.m.wikipedia.com";
    var country = "com";
    if (domain.includes("wikipedia.de")) {
    	wikipediaurl = "www.m.wikipedia.de";
    	country = "de";
    } else if (domain.includes("wikipedia.co.uk")) {
      wikipediaurl = "www.m.wikipedia.co.uk";
      country = "uk";
    }

    var https = "https://";

    return redirectToDesktop(https, wikipediaurl, url, country);
}

function redirectToDesktop(scheme, wikipediaurl, url, country) {
    var desktopurl = "wikipedia.com";
    if (country === "de") {
    	desktopurl = "wikipedia.de";
    } else if (country === "uk") {
      desktopurl = "wikipedia.co.uk";
    }
    return {
        // redirect to desktop wikipedia and append the rest of the url
        redirectUrl : scheme + desktopurl + getRelativeRedirectUrl(wikipediaurl, url)
    };
}

function getRelativeRedirectUrl(desktopurl, url) {
    var relativeUrl = url.split(desktopurl)[1];
    var noRedirectIndicator = "da-no-redirect=1";
    var paramStart = "?";
    var paramStartRegex = "\\" + paramStart;
    var newurl = null;

    // check to see if there are already GET variables in the url
    if (relativeUrl.match(paramStartRegex) != null) {
        newurl = relativeUrl + "&" + noRedirectIndicator;
    } else {
        newurl = relativeUrl + paramStart + noRedirectIndicator;
    }
    return newurl;
}

function url_domain(data) {
  var    a      = document.createElement('a');
         a.href = data;
  return a.hostname;
}
