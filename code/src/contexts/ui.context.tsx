import React, { ReactNode, createContext, useReducer, useContext, useEffect, useState, useMemo } from 'react';
import { WINDOW_VIEWS, PAGE_ROUTES, ACTION, TOKEN, CURRENT_USER, DOCKER } from './type.context';
import { find, get, head } from 'lodash';
import $ from 'jquery';
import {
	APP_MODE,
	URL_ACCOUNT_GRAPHQL_PODORDER,
	URL_ACCOUNT_GRAPHQL_SALEHUNTER,
	URL_GRAPHQL,
	URL_REST_API,
} from './contants';
import convertBlob from './function';
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
	currentServer: String | null;
	templateId: string | null;
	autoPage: boolean | null;
	extendShippingPrice: boolean | null;
	autoSave: boolean | null;
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
	currentServer: 'podorders.store',
	templateId: null,
	autoPage: false,
	extendShippingPrice: false,
	autoSave: false,
};

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
		case 'SET_CURRENT_SERVER': {
			return { ...state, currentServer: action.currentServer };
		}
		case 'SET_TEMPLATE_ID': {
			return { ...state, templateId: action.templateId };
		}
		case 'SET_AUTO_PAGE': {
			return { ...state, autoPage: action.autoPage };
		}
		case 'SET_EXTEND_SHIPPING_PRICE': {
			return { ...state, extendShippingPrice: action.extendShippingPrice };
		}
		case 'SET_AUTO_SAVE': {
			return { ...state, autoSave: action.autoSave };
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
				request: { key: key },
			},
			'*'
		);

		window.addEventListener('message', (event) => {
			if (event?.data?.action === 'storageGetResponse' && event?.data.response?.key === key) {
				setValue(event?.data.response?.value);
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
						value: value,
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
	const [server, setServer]: [string | null, (val: string) => void] = useStorage('_pod_ext_server');
	const [windowViewStorage, setWindowViewStorage]: [string | null, (val: string) => void] = useStorage('_pod_ext_view');
	const [templateIdStorage, setTemplateIdStorage]: [string | null, (val: string) => void] =
		useStorage('_pod_template_id');
	const [autoPageStorage, setAutoPageStorage]: [string | null, (val: string) => void] =
		useStorage('_pod_auto_page');
	const [extendShippingPriceStorage, setExtendShippingPriceStorage]: [string | null, (val: string) => void] =
		useStorage('_pod_extend_shipping_price');
	const [autoSaveStorage, setAutoSaveStorage]: [string | null, (val: string) => void] =
		useStorage('_pod_auto_save');

	useEffect(() => {
		if (
			token !== null &&
			docker !== null &&
			server !== null &&
			windowViewStorage !== null &&
			templateIdStorage !== null &&
			autoPageStorage !== null &&
			extendShippingPriceStorage !== null &&
			autoSaveStorage !== null
		) {
			setInit(true);
		}
	}, [token, docker, server, windowViewStorage, templateIdStorage]);

	useEffect(() => {
		if (init) {
			if (token !== null)
				setCurrentToken({
					token: token,
				});
			if (windowViewStorage !== null) setWindowView(windowViewStorage);
			if (docker !== null) setCurrentDocker(docker ? { _id: docker } : undefined);
			if (server !== null) setCurrentServer(server ? server : 'podorders.store');

			if (templateIdStorage !== null) setTemplateId(templateIdStorage);
			if (autoPageStorage !== null) setAutoPage(autoPageStorage === 'true');
			if (extendShippingPriceStorage !== null) setExtendShippingPrice(extendShippingPriceStorage === 'true');
			if (autoSaveStorage !== null) setAutoSave(autoSaveStorage === 'true');
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
		if (state.appHide) {
			$('body').addClass('podorder-ext-app-hide');
		} else {
			$('body').removeClass('podorder-ext-app-hide');
		}
	}, [state.appHide]);

	useEffect(() => {
		setAppLoading(state.currentToken?.token === undefined || state.currentUser === null);
		if (state.currentToken?.token !== undefined) {
			setToken(state.currentToken?.token);
		}
		if (state.currentDocker?._id !== undefined) {
			setDocker(state.currentDocker?._id);
		}
		if (state.currentServer !== undefined) {
			setServer(state.currentServer);
		}
		if (state.currentToken?.token !== undefined && !!!state.currentToken?.token) {
			setPageRoute('LOGIN');
		}
	}, [state.currentToken?.token, state.currentUser, state.currentDocker?._id, state.currentServer]);

	useEffect(() => {
		if (state.currentDocker?._id && state.currentUser?.docker) {
			setCurrentDocker(
				find(state.currentUser?.docker, (docker) => String(docker?._id) === String(state.currentDocker?._id))
			);
		}
	}, [state.currentDocker?._id, state.currentUser?.docker]);

	useEffect(() => {
		if (state.currentDocker?.domain) {
			setUrlRestApi();
		}
	}, [state.currentDocker]);

	useEffect(() => {
		setTemplateIdStorage(state.templateId);
	}, [state.templateId]);

	useEffect(() => {
		setAutoPageStorage(state.autoPage ? 'true' : 'false');
	}, [state.autoPage]);

	useEffect(() => {
		setExtendShippingPriceStorage(state.extendShippingPrice ? 'true' : 'false');
	}, [state.extendShippingPrice]);

	useEffect(() => {
		setAutoSaveStorage(state.autoSave ? 'true' : 'false');
	}, [state.autoSave]);

	const setAppLoading = (appLoading: boolean) => {
		dispatch({ type: 'SET_LOADING', appLoading });
	};
	const setAppHide = (appHide: boolean) => {
		dispatch({ type: 'SET_APP_HIDE', appHide });
	};
	const setWindowView = (view: WINDOW_VIEWS | string) => {
		dispatch({ type: 'SET_WINDOW_VIEW', view });
	};
	const setUrlGraphql = (urlGraphql: string) => {
		dispatch({ type: 'SET_URL_GRAPHQL', urlGraphql });
	};
	const setGraphqlForAccount = async () => {
		setUrlGraphql(isSaleHunter() ? URL_ACCOUNT_GRAPHQL_SALEHUNTER : URL_ACCOUNT_GRAPHQL_PODORDER);
		return new Promise((resolve) => setTimeout(() => resolve(true), 500))
	};
	const setGraphqlForHub = async () => {
		setUrlGraphql(URL_GRAPHQL(state.currentDocker));
		return new Promise((resolve) => setTimeout(() => resolve(true), 500))
	};
	const setUrlRestApi = () => {
		dispatch({ type: 'SET_URL_REST_API', urlRestApi: URL_REST_API(state.currentDocker) });
	};
	const setPageRoute = (page: PAGE_ROUTES) => {
		dispatch({ type: 'SET_PAGE_ROUTE', page });
	};
	const setCurrentUser = (user?: CURRENT_USER) => {
		dispatch({ type: 'SET_CURRENT_USER', user });
	};
	const setCurrentToken = (currentToken: TOKEN) => {
		dispatch({ type: 'SET_CURRENT_TOKEN', currentToken });
	};
	const setCurrentDocker = (currentDocker?: DOCKER) => {
		dispatch({ type: 'SET_CURRENT_DOCKER', currentDocker });
	};
	const setCurrentServer = (currentServer?: String) => {
		dispatch({ type: 'SET_CURRENT_SERVER', currentServer });
	};
	const setTemplateId = (templateId?: string) => {
		dispatch({ type: 'SET_TEMPLATE_ID', templateId });
	};
	const setAutoPage = (autoPage?: boolean) => {
		dispatch({ type: 'SET_AUTO_PAGE', autoPage });
	};
	const setExtendShippingPrice = (extendShippingPrice?: boolean) => {
		dispatch({ type: 'SET_EXTEND_SHIPPING_PRICE', extendShippingPrice });
	};
	const setAutoSave = (autoSave?: boolean) => {
		dispatch({ type: 'SET_AUTO_SAVE', autoSave });
	};



	const isSaleHunter = () => state.currentServer === 'salehunter.io';

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
	const movingOnElm = async (selector: any, parrentSelector: any = null, offset: any = 50) => {
		try {
			if (typeof selector !== 'string') return;
			let elm = $(selector).first() as any;
			let top = parrentSelector ? elm?.position()?.top : elm?.offset()?.top;
			if (elm && top) {
				await sleep(50);
				$(parrentSelector ? parrentSelector : [document.documentElement, document.body]).animate(
					{
						scrollTop: top - parseInt(offset),
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

	const fillReactTab = async (selector: any, value: string | number) => {
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
				elm.dispatchEvent(new Event('focusout', { bubbles: true }));
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
			const elm = head($(selector)) as any;
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
				return new Promise((resolve, reject) => {
					const res: Array<any> = [];
					const getImagesBlob = (index: number = 0) => {
						const imgUrl = get(image, index);
						if (imgUrl) {
							try {
								jQuery.ajax({
									url: imgUrl,
									cache: false,
									xhr: function () {
										// Seems like the only way to get access to the xhr object
										var xhr = new XMLHttpRequest();
										xhr.responseType = 'blob';
										return xhr;
									},
									success: function (data) {
										let fileExt = imgUrl.substring(imgUrl.lastIndexOf('.'));
										dT.items.add(new File([data], `my-image-${index}${fileExt}`));
										if (data?.type === 'image/webp') {
											res.push('webp');
										} else {
											res.push(true);
										}
										return getImagesBlob(index + 1);
									},
									error: function (error) {
										console.log('error: ', error);
										res.push(false);
										return getImagesBlob(index + 1);
									},
								});
							} catch (error) {
								console.log('error2: ', error);
							}
						} else {
							resolve(res);
						}
					};
					getImagesBlob();
				}).then(async (imgs: any) => {
					elm.files = dT.files;
					await reactTriggerChange(elm);
					return imgs;
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
			setCurrentServer,
			setTemplateId,
			setAutoPage,
			setExtendShippingPrice,
			setAutoSave,
			isSaleHunter,
			$x,
			sleep,
			movingOnElm,
			fillTextInput,
			fillReactTab,
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
