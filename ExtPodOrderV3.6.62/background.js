chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	console.log('Background called');
	const action = request?.action;

	if (action === 'enalbeCSP') {
		let addRules = [];
		(async () => {
			try {
				const currentTab = await getCurrentTab();
				const { url } = currentTab;
				const urlParse = new URL(url);

				console.log('currentTab: ', currentTab);

				let isDisabled = await isCSPDisabled();
				console.log('isDisabled: ', isDisabled);

				if (!isDisabled) {
					await chrome.browsingData.remove({}, { serviceWorkers: true }, () => {});

					try {
						await chrome.declarativeNetRequest.updateSessionRules({
							addRules: [
								{
									id: currentTab.id,
									action: {
										type: 'modifyHeaders',
										responseHeaders: [
											{ header: 'content-security-policy', operation: 'set', value: '' },
										],
									},
									condition: {
										urlFilter: urlParse?.hostname,
										resourceTypes: ['main_frame', 'sub_frame'],
									},
								},
							],
							removeRuleIds: [],
						});
					} catch (error) {}
				}

				await updateUI();
				sendResponse({ status: 'success' });
			} catch (error) {
				sendResponse({ status: 'error' });
				console.log(addRules);
				console.log('error 2: ', error);
			}
		})();
	}

	return true;
});

const getCurrentTab = async () => {
	let queryOptions = { active: true, lastFocusedWindow: true };
	// `tab` will either be a `tabs.Tab` instance or `undefined`.
	let [tab] = await chrome.tabs.query(queryOptions);

	return tab;
};

const clearCSP = async () => {
	let addRules = [];
	let removeRuleIds = [];
	let rules = await chrome.declarativeNetRequest.getSessionRules();
	rules.forEach((rule) => {
		removeRuleIds.push(rule.id);
	});

	await chrome.declarativeNetRequest.updateSessionRules({ addRules, removeRuleIds });

	await updateUI();
};

const isCSPDisabled = async () => {
	let rules = await chrome.declarativeNetRequest.getSessionRules();
	const urls = rules.map((rule) => rule.condition.urlFilter);
	const { url } = await getCurrentTab();
	const urlParse = new URL(url);
	return urls.some((item) => item === urlParse?.hostname);
};

const updateUI = async () => {
	let isDisabled = await isCSPDisabled();
	let title = isDisabled ? 'is' : 'is not';
	let iconColor = isDisabled ? '' : '_gray';
	chrome.action.setIcon({ path: `icons/icon16${iconColor}.png` });
	chrome.action.setTitle({ title: `The extension ${title} working` });
};

// const enalbeCSP = async (id) => {
// 	try {
// 		let addRules = [];
// 		let { url, pendingUrl } = await getCurrentTab();
// 		console.log('url: ', url);
// 		let isDisabled = await isCSPDisabled();
// 		console.log('isDisabled: ', isDisabled);

// 		if (!isDisabled) {
// 			try {
// 				addRules.push({
// 					id,
// 					action: {
// 						type: 'modifyHeaders',
// 						responseHeaders: [{ header: 'content-security-policy', operation: 'set', value: '' }],
// 					},
// 					condition: { urlFilter: url ? url : pendingUrl, resourceTypes: ['main_frame', 'sub_frame'] },
// 				});
// 			} catch (error) {
// 				console.log('error 1: ', error);
// 			}

// 			chrome.browsingData.remove({}, { serviceWorkers: true }, () => {});
// 		}

// 		await chrome.declarativeNetRequest.updateSessionRules({ addRules, removeRuleIds: [] });

// 		await updateUI();
// 	} catch (error) {
// 		console.log('error 2: ', error);
// 	}
// };

// let init = () => {
// 	// When the user clicks the plugin icon
chrome.action.onClicked.addListener((tab) => {
	clearCSP();
});

// 	// When the user changes tab
// 	chrome.tabs.onActivated.addListener(async (tab) => {
// 		console.log('tab: ', tab);
// 		await enalbeCSP(tab.tabId);
// 		await updateUI();
// 	});
// };

// init();
