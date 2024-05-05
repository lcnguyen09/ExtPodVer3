console.log('Extension Ver30 loaded');
try {
	window.addEventListener('message', (event) => {
		const storageKey = event?.data?.request?.key;
		if (typeof storageKey !== 'undefined') {
			switch (event?.data?.action) {
				case 'storageGetRequest':
					chrome.storage.local.get([storageKey]).then((result) => {
						window.postMessage(
							{
								action: 'storageGetResponse',
								response: {
									key: storageKey,
									value: result[storageKey] || '',
								},
							},
							'*'
						);
					});
					break;
				case 'storageSetRequest':
					chrome.storage.local.set({
						[storageKey]: event?.data?.request?.value ? event?.data?.request?.value : '',
					});
					break;
				case 'extLog':
					console.log(event?.data?.request);
					break;
				default:
					break;
			}
		}
	});
	const jqueryScript = document.createElement('script');
	jqueryScript.setAttribute('type', 'text/javascript');
	jqueryScript.setAttribute('src', chrome.runtime.getURL('jquery.js'));
	document.getElementsByTagName('body')[0].appendChild(jqueryScript);
	const script = document.createElement('script');
	script.setAttribute('type', 'text/javascript');
	script.setAttribute('src', chrome.runtime.getURL('inject-script.js'));
	document.getElementsByTagName('body')[0].appendChild(script);
} catch (err) {
	console.log('err: ', err);
}
