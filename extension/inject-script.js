try {
	if (typeof __NEXT_DATA__ !== 'undefined') {
		document.getElementsByTagName('body')[0].setAttribute('tmp___NEXT_DATA__', JSON.stringify(__NEXT_DATA__));
	}
} catch (error) {}

window.addEventListener('message', (event) => {
	const action = event?.data?.action;
	const payload = event?.data?.payload;
	switch (action) {
		case 'setTinyMceContent':
            try {
			    window.tinymce.activeEditor.setContent(payload);
            } catch (error) {
                console.log("Cannot setTinyMceContent");
                console.log('error: ', error);
            }
			break;

		default:
			break;
	}
});