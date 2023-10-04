import ReactDOM from 'react-dom/client';
import App from './1_App';
import { APP_MODE } from './contexts/contants';

const inIframe = () => {
	try {
		return window.self !== window.top;
	} catch (e) {
		return true;
	}
};

try {
	if (!window?.location?.pathname?.match(/\.js$/gim) && !window?.location?.pathname?.match(/\.css/gim) && !inIframe()) {
		const rootElement = Object.assign(document.createElement('div'), { id: 'podorder-ext-app' });
		if (APP_MODE === 'dev' || process.env.REACT_APP_APP_MODE === 'dev') {
			rootElement.classList.add('dev-mode');
		}
		document.getElementById('podorder-ext-app')?.remove();
		document.body.appendChild(rootElement);
		console.log('Extension App Ver30 loaded');
		ReactDOM.createRoot(rootElement).render(<App />);
	}
} catch (error) {
	console.log('Error: ', error);
}
