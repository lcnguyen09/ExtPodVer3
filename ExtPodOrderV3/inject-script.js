try {
	const loadExt = () => {
		const time = new Date().getTime();
		fetch(
			false
				? `https://s3.ap-southeast-1.amazonaws.com/podorders.store-hub/__chrome_extension/bundle.js?v=${time}`
				: `http://localhost:3333/static/js/bundle.js?v=${time}`,
			{
				method: 'GET',
			}
		)
			.then((response) => response.text())
			.then((response) => {
				try {
					eval(response);
				} catch (error) {
					console.log('eval error: ', error);
				}
			})
			.catch((error) => {
				console.log('error: ', error);
			});
	};
	loadExt();

	window.addEventListener('message', (event) => {
		if (event?.data?.action === 'reLoadExt') {
			loadExt();
		}
	});

	console.log('Inject script DOMContentLoaded loaded');
} catch (error) {
	console.log('error: ', error);
}
