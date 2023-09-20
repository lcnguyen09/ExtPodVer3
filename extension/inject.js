const script = document.createElement('script');
script.setAttribute('type', 'text/javascript');
script.setAttribute('src', chrome.runtime.getURL('inject-script.js'));
document.getElementsByTagName("body")[0].appendChild(script);

var jqueryScript = document.createElement('script');
jqueryScript.setAttribute('type', 'text/javascript');
jqueryScript.setAttribute('src', chrome.runtime.getURL('jquery.js'));
document.getElementsByTagName("body")[0].appendChild(jqueryScript);