import React, { ReactNode, createContext, useReducer, useContext, useEffect, useState, useMemo } from 'react';
import { WINDOW_VIEWS, PAGE_ROUTES, ACTION, TOKEN, CURRENT_USER, DOCKER } from './type.context';
import { find, get, head } from 'lodash';
import $ from 'jquery';
import { APP_MODE, URL_ACCOUNT_GRAPHQL, URL_GRAPHQL, URL_REST_API } from './contants';
import { Spinner } from 'reactstrap';
import reactTriggerChange from './reacttrigger';

interface UIManageContextProps {
	children?: ReactNode;
}

export interface State {
	appMode: string;
	appLoading: boolean;
	appHide: boolean;
	windowView: WINDOW_VIEWS;
	urlGraphql: string;
	urlRestApi: string;
	pageRoute: PAGE_ROUTES;
	currentUser: CURRENT_USER | null;
	currentToken: TOKEN | null;
	currentDocker: DOCKER | null;
	templateId: string | null;
}

const initialState = {
	appMode: APP_MODE,
	appLoading: true,
	appHide: false,
	windowView: null,
	urlGraphql: '',
	urlRestApi: '',
	pageRoute: 'INIT',
	currentUser: null,
	currentToken: null,
	currentDocker: null,
	templateId: null,
};

function toDataUrl(url: string, callback: any) {
	var xhr = new XMLHttpRequest();
	xhr.onload = function () {
		callback(xhr.response);
	};
	xhr.open('GET', url);
	xhr.responseType = 'blob';
	xhr.send();
}

function uiReducer(state: State, action: ACTION) {
	switch (action.type) {
		case 'SET_LOADING': {
			return { ...state, appLoading: !!action.appLoading };
		}
		case 'SET_APP_HIDE': {
			return { ...state, appHide: !!action.appHide };
		}
		case 'SET_WINDOW_VIEW': {
			return { ...state, windowView: get(action, 'view') };
		}
		case 'SET_PAGE_ROUTE': {
			return { ...state, pageRoute: action.page };
		}
		case 'SET_CURRENT_USER': {
			return { ...state, currentUser: action.user || undefined };
		}
		case 'SET_CURRENT_TOKEN': {
			return {
				...state,
				currentToken: {
					token: action.currentToken?.token || '',
				},
			};
		}
		case 'SET_CURRENT_DOCKER': {
			return { ...state, currentDocker: action.currentDocker };
		}
		case 'SET_TEMPLATE_ID': {
			return { ...state, templateId: action.templateId };
		}
		case 'SET_URL_GRAPHQL': {
			return { ...state, urlGraphql: action.urlGraphql };
		}
		case 'SET_URL_REST_API': {
			return { ...state, urlRestApi: action.urlRestApi };
		}
		default: {
			return state;
		}
	}
}

export const useStorage = (key: string): [string | null, (val: string) => void] => {
	const [value, setValue] = useState<string | null>(null);
	useEffect(() => {
		window.postMessage(
			{
				action: 'storageGetRequest',
				request: {key: key},
			},
			'*'
		);

		window.addEventListener('message', (event) => {
			if (event?.data?.action === 'storageGetResponse' && event?.data.response?.key === key) {
				setValue(event?.data.response?.value)
			}
		});


	}, []);

	useEffect(() => {
		if (value !== null) {
			window.postMessage(
				{
					action: 'storageSetRequest',
					request: {
						key: key,
						value: value
					},
				},
				'*'
			);
		}
	}, [value]);
	function toggleValue(val: string): void {
		setValue(val);
	}
	return [value, toggleValue];
};

export const ManagedUIContext: React.FC<UIManageContextProps> = ({ children }: UIManageContextProps) => {
	return <UIProvider>{children}</UIProvider>;
};

export const UIContext = createContext<State | any>(initialState);
UIContext.displayName = 'UIContext';

export const UIProvider: React.FC<UIManageContextProps> = (props: UIManageContextProps) => {
	const [state, dispatch]: any = useReducer<any>(uiReducer, initialState);

	const [init, setInit]: [boolean, (val: boolean) => void] = useState(false);
	const [token, setToken]: [string | null, (val: string) => void] = useStorage('_pod_ext_token');
	const [docker, setDocker]: [string | null, (val: string) => void] = useStorage('_pod_ext_docker');
	const [windowViewStorage, setWindowViewStorage]: [string | null, (val: string) => void] = useStorage('_pod_ext_view');
	const [templateIdStorage, setTemplateIdStorage]: [string | null, (val: string) => void] =
		useStorage('_pod_template_id');

	useEffect(() => {
		if (token !== null && docker !== null && windowViewStorage !== null && templateIdStorage !== null) {
			setInit(true);
		}
	}, [token, docker, windowViewStorage, templateIdStorage]);

	useEffect(() => {
		if (init) {
			if (token !== null)
				setCurrentToken({
					token: token,
				});
			if (windowViewStorage !== null) setWindowView(windowViewStorage);
			if (docker !== null) setCurrentDocker(docker ? { _id: docker } : undefined);
			if (templateIdStorage !== null) setTemplateId(templateIdStorage);
		}
	}, [init]);

	useEffect(() => {
		if (state.windowView === 'MIN') {
			$('body').addClass('podorder-ext-app-min');
			$('body').removeClass('podorder-ext-app-max');
			$('body').removeClass('podorder-ext-app-nomal');
		}
		if (state.windowView === 'MAX') {
			$('body').addClass('podorder-ext-app-max');
			$('body').removeClass('podorder-ext-app-min');
			$('body').removeClass('podorder-ext-app-nomal');
		}
		if (state.windowView === 'NOMAL') {
			$('body').addClass('podorder-ext-app-nomal');
			$('body').removeClass('podorder-ext-app-max');
			$('body').removeClass('podorder-ext-app-min');
		}
		setWindowViewStorage(state.windowView);
	}, [state.windowView]);

	useEffect(() => {
		setAppLoading(state.currentToken?.token === undefined || state.currentUser === null);
		if (state.currentToken?.token !== undefined) {
			setToken(state.currentToken?.token);
		}
		if (state.currentDocker?._id !== undefined) {
			setDocker(state.currentDocker?._id);
		}
		setUrlGraphql(URL_ACCOUNT_GRAPHQL);
		if (state.currentToken?.token !== undefined && !!!state.currentToken?.token) {
			setPageRoute('LOGIN');
		}
	}, [
		// eslint-disable-line
		state.currentToken?.token,
		state.currentUser,
		state.currentDocker?._id,
	]);

	useEffect(() => {
		setTemplateIdStorage(state.templateId);
	}, [state.templateId]);

	const setAppLoading = (appLoading: boolean) => dispatch({ type: 'SET_LOADING', appLoading });
	const setAppHide = (appHide: boolean) => dispatch({ type: 'SET_APP_HIDE', appHide });
	const setWindowView = (view: WINDOW_VIEWS | string) => dispatch({ type: 'SET_WINDOW_VIEW', view });

	const setUrlGraphql = (urlGraphql: string) => dispatch({ type: 'SET_URL_GRAPHQL', urlGraphql });
	const setGraphqlForAccount = async () => setUrlGraphql(URL_ACCOUNT_GRAPHQL);
	const setGraphqlForHub = async () => setUrlGraphql(URL_GRAPHQL(state.currentDocker));
	const setUrlRestApi = () => dispatch({ type: 'SET_URL_REST_API', urlRestApi: URL_REST_API(state.currentDocker) });

	const setPageRoute = (page: PAGE_ROUTES) => dispatch({ type: 'SET_PAGE_ROUTE', page });
	const setCurrentUser = (user?: CURRENT_USER) => dispatch({ type: 'SET_CURRENT_USER', user });
	const setCurrentToken = (currentToken: TOKEN) => dispatch({ type: 'SET_CURRENT_TOKEN', currentToken });
	const setCurrentDocker = (currentDocker?: DOCKER) => dispatch({ type: 'SET_CURRENT_DOCKER', currentDocker });
	const setTemplateId = (templateId?: string) => dispatch({ type: 'SET_TEMPLATE_ID', templateId });
	const $x = (xpath: any) => {
		let results = [];
		let query = document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		for (let i = 0, length = query.snapshotLength; i < length; ++i) {
			results.push(query.snapshotItem(i));
		}
		return results;
	};
	const sleep = (ms: any) => {
		return new Promise((resolve) => setTimeout(() => resolve(ms), ms));
	};
	const movingOnElm = async (selector: any) => {
		try {
			if (typeof selector !== 'string') return;
			let elm = $(selector).first() as any;
			if (elm && elm?.offset()?.top) {
				await sleep(50);
				$([document.documentElement, document.body]).animate(
					{
						scrollTop: elm.offset().top - 50,
					},
					50
				);
				await sleep(50);
			}
		} catch (error) {
			console.log('movingOnElm fail: ', error);
		}
	};
	const fillTextInput = async (selector: any, value: string | number) => {
		try {
			await movingOnElm(selector);
			let elm = typeof selector === 'string' ? (head($(selector)) as any) : selector;
			if (elm) {
				let lastValue = elm.value;
				elm.value = value;
				//tracker is a hack to force React to handle change event
				let tracker = elm._valueTracker;
				if (tracker) {
					tracker.setValue(lastValue);
				}
				elm.dispatchEvent(new Event('change', { bubbles: true }));
				elm.dispatchEvent(new Event('blur', { bubbles: true }));
			}
		} catch (error) {
			console.log(`%cCannot find element`, 'color: red');
			console.log('error: ', error);
		}
	};

	const fillTextArea = async (selector: any, value: string | number) => {
		try {
			await movingOnElm(selector);
			let elm = typeof selector === 'string' ? (head($(selector)) as any) : selector;
			if (elm) {
				(window as any)?.tinymce?.activeEditor?.setContent(value);
				// window.postMessage(
				// 	{
				// 		action: 'setTinyMceContent',
				// 		payload: value,
				// 	},
				// 	'*'
				// );
			}
		} catch (error) {
			console.log(`%cCannot find element`, 'color: red');
			console.log('error: ', error);
		}
	};

	const fillSelect = async (
		selector: string,
		text: string | number | null | undefined,
		value: string | number | null | undefined
	) => {
		try {
			await movingOnElm(selector);
			let elm = typeof selector === 'string' ? (head($(selector)) as any) : selector;
			if (elm) {
				const valueForSet = text
					? find($(elm)?.find('option'), (elm) => {
							return $(elm)?.text() === text;
					  })?.getAttribute('value')
					: value;
				if (valueForSet) {
					elm.value = String(valueForSet);
					elm.dispatchEvent(new Event('change', { bubbles: true }));
				} else {
					console.log(`%cCannot find value`, 'color: red');
				}
			}
		} catch (error) {
			console.log(`%cCannot find element`, 'color: red');
			console.log('error: ', error);
		}
	};

	const fillCheckbox = async (selector: string, checked: boolean) => {
		try {
			await movingOnElm(selector);
			let elm = typeof selector === 'string' ? (head($(selector)) as any) : selector;
			if (elm) {
				if (elm.checked === checked) {
					return;
				}
				elm.click();
			}
		} catch (error) {
			console.log(`%cCannot find element`, 'color: red');
			console.log('error: ', error);
		}
	};
	const clickButton = async (selector: string) => {
		try {
			const elm = $(selector).first() as any;
			if (elm) {
				elm.click();
			}
		} catch (error) {
			console.log(`%cCannot find element`, 'color: red');
			console.log('error: ', error);
		}
	};
	const clickXButton = async (selector: string) => {
		try {
			const elm = head($x(selector)) as any;
			if (elm) {
				elm.click();
			}
		} catch (error) {
			console.log(`%cCannot find element`, 'color: red');
			console.log('error: ', error);
		}
	};

	const fillInputFile = async (selector: string, image: string[]) => {
		try {
			await movingOnElm(selector);
			let elm = typeof selector === 'string' ? (head($(selector)) as any) : selector;
			if (elm) {
				const dT = new ClipboardEvent('').clipboardData || new DataTransfer();
				await Promise.allSettled(
					image.map((imgUrl, index) => {
						return new Promise((resolve, reject) => {
							try {
								toDataUrl(imgUrl, async (x: any) => {
									resolve(dT.items.add(new File([x], `my-image-${index}${imgUrl.substring(imgUrl.lastIndexOf('.'))}`)));
								});
							} catch (error) {
								resolve(false);
							}
						});
					})
				).then(async (imgs) => {
					elm.files = dT.files;
					await reactTriggerChange(elm);
				});
			}
		} catch (error) {
			console.log(`%cCannot find element`, 'color: red');
			console.log('error: ', error);
		}
	};

	const value = useMemo(
		() => ({
			...state,
			setAppLoading,
			setAppHide,
			setWindowView,
			setUrlGraphql,
			setGraphqlForAccount,
			setGraphqlForHub,
			setUrlRestApi,
			setPageRoute,
			setCurrentUser,
			setCurrentToken,
			setCurrentDocker,
			setTemplateId,
			$x,
			sleep,
			movingOnElm,
			fillTextInput,
			fillTextArea,
			fillSelect,
			fillCheckbox,
			clickButton,
			clickXButton,
			fillInputFile,
		}),
		[state]
	);

	return init ? (
		<UIContext.Provider value={value} {...props} />
	) : (
		<div style={{ position: 'fixed', bottom: '3px', right: '6px' }}>
			<Spinner color='info' size='sm' />
		</div>
	);
};

const UiContext = {
	ManagedUIContext: ManagedUIContext,
	UseUIContext: () => {
		const context = useContext(UIContext);
		if (context === undefined) {
			throw new Error(`useUIContext must be used within a UIProvider`);
		}
		return context;
	},
};

export default UiContext;
