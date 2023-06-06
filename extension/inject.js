const script = document.createElement('script');
script.setAttribute('type', 'text/javascript');
script.setAttribute('src', chrome.runtime.getURL('inject-script.js'));
document.getElementsByTagName("body")[0].appendChild(script);