import ReactDOM from 'react-dom/client';
import App from './1_App';
import { APP_MODE } from './contexts/contants';

const inIframe = () => {
	try {
		return window.self !== window.top;
	} catch {
		return true;
	}
};

const checkValid = () =>
	!/\.js$|\.css$/i.test(window?.location?.pathname) &&
	!inIframe() &&
	!['podorders.store', 'salehunter.io', 'localhost:3000', 'localhost:3200'].some((host) =>
		window.location.host.includes(host)
	);

try {
	if (checkValid()) {
		const rootElement = document.createElement('div');
		rootElement.id = 'podorder-ext-app';
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
