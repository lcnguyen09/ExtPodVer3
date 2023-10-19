try {
	$(document).ready(() => {
		if (typeof __NEXT_DATA__ !== 'undefined') {
			document.getElementsByTagName('body')[0].setAttribute('tmp___NEXT_DATA__', JSON.stringify(__NEXT_DATA__));
		}

		window.addEventListener('message', (event) => {
			if (event?.data?.action === 'reLoadExt') {
				loadExt();
			}
		});

		const loadExt = () => {
			const time = new Date().getTime();
			$.ajax({
				url: true
					? `https://s3.ap-southeast-1.amazonaws.com/podorders.store-hub/__chrome_extension/bundle.js?v=${time}`
					: `http://localhost:3333/static/js/bundle.js?v=${time}`,
			})
				.done((res) => {
					try {
						eval(res);
					} catch (error) {
						console.log('eval error: ', error);
					}
				})
				.fail((error) => {
					console.log('error: ', error);
				});
		};
		loadExt();
	});
} catch (error) {}
