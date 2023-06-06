import React, {
	ReactNode,
	createContext,
	useReducer,
	useContext,
	useEffect,
	useState,
	useMemo,
} from 'react'
import {
	WINDOW_VIEWS,
	PAGE_ROUTES,
	ACTION,
	TOKEN,
	CURRENT_USER,
	DOCKER
} from "./type.context"
import { get } from 'lodash'
import $ from 'jquery'
import {
	URL_TASK_GRAPHQL,
	URL_ACCOUNT_GRAPHQL
} from "./contants"

interface UIManageContextProps {
	children?: ReactNode
}


const initialState = {
	appLoading: true,
	windowView: null,
	appConfig: null,
	currentAppConfig: null,
	urlGraphql: "",
	pageRoute: "INIT",
	currentUser: null,
	currentToken: null,
	currentDocker: null,

}

export interface State {
	appLoading: boolean,
	windowView: WINDOW_VIEWS,
	appConfig: any,
	currentAppConfig: any,
	urlGraphql: string,
	pageRoute: PAGE_ROUTES,
	currentUser: CURRENT_USER | null,
	currentToken: TOKEN | null,
	currentDocker: DOCKER | null
}


export const UIContext = createContext<State | any>(initialState)
UIContext.displayName = "UIContext"

function uiReducer(state: State, action: ACTION) {
	switch (action.type) {
		case "SET_LOADING": { return { ...state, appLoading: !!action.appLoading } }
		case "SET_WINDOW_VIEW": { return { ...state, windowView: get(action, "view") } }
		case "SET_APP_CONFIG": { return { ...state, appConfig: action.appConfig } }
		case "SET_CURRENT_APP_CONFIG": { return { ...state, currentAppConfig: action.currentAppConfig } }
		case "SET_PAGE_ROUTE": { return { ...state, pageRoute: action.page } }
		case "SET_CURRENT_USER": { return { ...state, currentUser: action.user || undefined } }
		case "SET_CURRENT_TOKEN": {
			return {
				...state, currentToken: {
					...action.currentToken,
					access_token: action.currentToken?.access_token || "",
					refresh_token: action.currentToken?.refresh_token || "",
					token: action.currentToken?.token || "",
				}
			}
		}
		case "SET_CURRENT_DOCKER": {
			return { ...state, currentDocker: action.currentDocker }
		}
		case "SET_URL_GRAPHQL": {
			return { ...state, urlGraphql: action.urlGraphql }
		}
		default: { return state }
	}
}
export const UIProvider: React.FC<UIManageContextProps> = (props: UIManageContextProps) => {
	const [state, dispatch]: any = useReducer<any>(uiReducer, initialState)
	const [init, setInit]: [boolean, (val: boolean) => void] = useState(false)
	const [accessToken, setAccessToken]: [string | null, (val: string) => void] = useStorage("_pod_ext_access_token") // eslint-disable-line
	const [refreshToken, setRefreshToken]: [string | null, (val: string) => void] = useStorage("_pod_ext_refresh_token") // eslint-disable-line
	const [token, setToken]: [string | null, (val: string) => void] = useStorage("_pod_ext_token") // eslint-disable-line
	const [docker, setDocker]: [string | null, (val: string) => void] = useStorage("_pod_ext_docker") // eslint-disable-line

	const [windowViewStorage, setWindowViewStorage]: [string | null, (val: string) => void] = useStorage("_pod_ext_view") // eslint-disable-line

	const setAppLoading = (appLoading: boolean) => dispatch({ type: "SET_LOADING", appLoading })
	const setWindowView = (view: WINDOW_VIEWS | string) => dispatch({ type: "SET_WINDOW_VIEW", view })
	const setAppConfig = (appConfig: any) => dispatch({ type: "SET_APP_CONFIG", appConfig })
	const setCurrentAppConfig = (currentAppConfig: any) => dispatch({ type: "SET_CURRENT_APP_CONFIG", currentAppConfig })
	const setUrlGraphql = (urlGraphql: string) => dispatch({ type: "SET_URL_GRAPHQL", urlGraphql })
	const setPageRoute = (page: PAGE_ROUTES) => dispatch({ type: "SET_PAGE_ROUTE", page })
	const setCurrentUser = (user?: CURRENT_USER) => dispatch({ type: "SET_CURRENT_USER", user })
	const setCurrentToken = (currentToken: TOKEN) => dispatch({ type: "SET_CURRENT_TOKEN", currentToken })
	const setCurrentDocker = (currentDocker?: DOCKER) => dispatch({ type: "SET_CURRENT_DOCKER", currentDocker })

	const value = useMemo(() => ({
		...state,
		setAppLoading,
		setWindowView,
		setAppConfig,
		setCurrentAppConfig,
		setUrlGraphql,
		setPageRoute,
		setCurrentUser,
		setCurrentToken,
		setCurrentDocker
	}), [state]) // eslint-disable-line

	useEffect(() => {
		if (state.windowView === "MIN") {
			$("body").addClass("podorder-ext-app-min")
			$("body").removeClass("podorder-ext-app-max")
			$("body").removeClass("podorder-ext-app-nomal")
		}
		if (state.windowView === "MAX") {
			$("body").addClass("podorder-ext-app-max")
			$("body").removeClass("podorder-ext-app-min")
			$("body").removeClass("podorder-ext-app-nomal")
		}
		if (state.windowView === "NOMAL") {
			$("body").addClass("podorder-ext-app-nomal")
			$("body").removeClass("podorder-ext-app-max")
			$("body").removeClass("podorder-ext-app-min")
		}
		setWindowViewStorage(state.windowView)
	}, [state.windowView]) // eslint-disable-line

	useEffect(() => {
		setAppLoading(state.currentToken?.access_token === undefined || state.currentAppConfig === null || state.currentUser === null)
		if (state.currentToken?.access_token !== undefined) {
			setAccessToken(state.currentToken?.access_token)
		}
		if (state.currentToken?.refresh_token !== undefined) {
			setRefreshToken(state.currentToken?.refresh_token)
		}
		if (state.currentToken?.token !== undefined) {
			setToken(state.currentToken?.token)
		}
		if (state.currentDocker?._id !== undefined) {
			setDocker(state.currentDocker?._id)
		}
		switch (state.currentAppConfig?.mode) {
			case "PersonalizeItemClaw":
				setUrlGraphql(URL_TASK_GRAPHQL)
				if (state.currentToken?.access_token !== undefined && !!!state.currentToken?.access_token) setPageRoute("LOGIN")
				break;
			case "SimpleItemClaw":
				setUrlGraphql(URL_ACCOUNT_GRAPHQL)
				if (state.currentToken?.token !== undefined && !!!state.currentToken?.token) setPageRoute("LOGIN")
				break;
			default:
				break;
		}
	}, [ // eslint-disable-line
		state.currentAppConfig, // eslint-disable-line
		state.currentToken?.access_token, // eslint-disable-line
		state.currentToken?.refresh_token, // eslint-disable-line
		state.currentToken?.token, // eslint-disable-line
		state.currentUser, // eslint-disable-line
		state.currentDocker?._id, // eslint-disable-line
	]) // eslint-disable-line

	useEffect(() => {
		if (init) {
			if (accessToken !== null && refreshToken !== null && token !== null) setCurrentToken({
				access_token: accessToken,
				refresh_token: refreshToken || "",
				expired_at: "",
				token_type: "Bearer",
				token: token
			})
			if (windowViewStorage !== null) setWindowView(windowViewStorage)
			if (docker !== null) setCurrentDocker({_id: docker})
		}
	}, [init]) // eslint-disable-line

	useEffect(() => {
		if (accessToken !== null &&
			refreshToken !== null &&
			token !== null &&
			docker !== null &&
			windowViewStorage !== null) setInit(true)
	}, [ // eslint-disable-line
		accessToken, // eslint-disable-line
		refreshToken, // eslint-disable-line
		token, // eslint-disable-line
		docker, // eslint-disable-line
		windowViewStorage // eslint-disable-line
	]) // eslint-disable-line

	useEffect(() => {
		// $.ajax({ url: CONFIG_URL }).done(response => {
		// 	try { response = JSON.parse(response) } catch (error) { response = {} }
		// 	setAppConfig(response)
		// }).fail(error => {
		// 	setAppConfig({})
		// })
		setAppConfig({
			"site_mode": {
				"localhost": {
					// "mode": "SimpleItemClaw"
					"mode": "PersonalizeItemClaw"
				},
				"wanderprints.com": {
					"mode": "PersonalizeItemClaw"
				}
			}
		})
	}, []) // eslint-disable-line

	useEffect(() => {
		setCurrentAppConfig(get(state.appConfig, ["site_mode", window.location.hostname], {"mode": "SimpleItemClaw"}))
	}, [window.location.hostname, state.appConfig]) // eslint-disable-line

	return <>
		{
			init ? <UIContext.Provider value={value} {...props} /> : false
		}
	</>
}

export const ManagedUIContext: React.FC<UIManageContextProps> = ({ children }: UIManageContextProps) => {
	return <UIProvider>{children}</UIProvider>
}

export const useStorage = (key: string): [string | null, (val: string) => void] => {
	const [value, setValue] = useState<string | null>(null)
	useEffect(() => {
		storageGet(key).then((result) => {
			setTimeout(() => {
				setValue(result ? result : "")
			}, 0)
		})
	}, []) // eslint-disable-line
	useEffect(() => {
		if (value !== null) {
			storageSet(key, value ? value : "")
		}
	}, [value]) // eslint-disable-line
	function storageGet(cname: string): Promise<string> {
		return new Promise(resolve => {
			try {
				chrome.storage.local.get([cname]).then((result) => {
					resolve(get(result, cname, "") ? get(result, cname, "") : "")
				})
			} catch (error) {
				const name = cname + "=";
				const decodedCookie = decodeURIComponent(document.cookie);
				const ca = decodedCookie.split(';');
				for (let i = 0; i < ca.length; i++) {
					let c = ca[i];
					while (c.charAt(0) === ' ') {
						c = c.substring(1);
					}
					if (c.indexOf(name) === 0) {
						resolve(c.substring(name.length, c.length) ? c.substring(name.length, c.length) : "")
					}
				}
				resolve("")
			}

		})

	}
	function storageSet(cname: string, cvalue: any, exdays = 365): Promise<boolean> {
		return new Promise(resolve => {
			try {
				chrome.storage.local.set({ [key]: value ? value : "" }).then(() => {
					resolve(true)
				})
			} catch (error) {
				const d = new Date();
				d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
				const expires = "expires=" + d.toUTCString();
				document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/;";
				resolve(true)
			}
		})
	}
	function toggleValue(val: string): void {
		setValue(val)
	}
	return [value, toggleValue]

}

const UiContext = {
	ManagedUIContext: ManagedUIContext,
	UseUIContext: () => {
		const context = useContext(UIContext)
		if (context === undefined) {
			throw new Error(`useUIContext must be used within a UIProvider`)
		}
		return context
	}
}

export default UiContext