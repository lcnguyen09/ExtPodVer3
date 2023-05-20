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
	ACTION
} from "./type.context"
import {
	Maybe,
	Auth,
	AuthToken,
} from "./../graphql/graphql"
import { get } from 'lodash'
import $ from 'jquery'
import {
	URL_GRAPHQL,
} from "./contants"

interface UIManageContextProps {
	children?: ReactNode,
	[name: string]: Maybe<any>
}


const initialState = {
	appLoading: true,
	windowView: null,
	urlGraphql: URL_GRAPHQL,
	pageRoute: "INIT",
	currentUser: null,
	token: null
}

export interface State {
	appLoading: boolean,
	windowView: WINDOW_VIEWS,
	urlGraphql: string,
	pageRoute: PAGE_ROUTES,
	currentUser: Auth | null,
	token: AuthToken | null,
}


export const UIContext = createContext<State | any>(initialState)
UIContext.displayName = "UIContext"

function uiReducer(state: State, action: ACTION) {
	switch (action.type) {
		case "SET_WINDOW_VIEW": {
			return { ...state, windowView: get(action, "view") }
		}
		case "SET_LOADING": {
			return { ...state, appLoading: !!action.appLoading }
		}
		case "SET_PAGE_ROUTE": {
			return { ...state, pageRoute: action.page }
		}
		case "SET_CURRENT_USER": {
			return { ...state, currentUser: { ...action.user, token: null } }
		}
		case "SET_CURRENT_TOKEN": {
			return { ...state, token: { ...action.token, access_token: action.token?.access_token || "" } }
		}
		default: {
			return state
		}
	}
}
export const UIProvider: React.FC<UIManageContextProps> = (props: UIManageContextProps) => {
	const [state, dispatch]: Maybe<any> = useReducer<any>(uiReducer, initialState)
	const [accessToken, setAccessToken]: [string | null, (val: string) => void] = useStorage("_pod_ext_access_token") // eslint-disable-line
	const [refreshToken, setRefreshToken]: [string | null, (val: string) => void] = useStorage("_pod_ext_refresh_token") // eslint-disable-line
	const [windowViewStorage, setWindowViewStorage]: [string | null, (val: string) => void] = useStorage("_pod_ext_mode") // eslint-disable-line

	const setWindowView = (view: WINDOW_VIEWS | string) => dispatch({ type: "SET_WINDOW_VIEW", view })
	const setAppLoading = (appLoading: boolean) => dispatch({ type: "SET_LOADING", appLoading })
	const setPageRoute = (page: PAGE_ROUTES) => dispatch({ type: "SET_PAGE_ROUTE", page })
	const setCurrentUser = (user: Auth) => dispatch({ type: "SET_CURRENT_USER", user })
	const setToken = (token: AuthToken) => dispatch({ type: "SET_CURRENT_TOKEN", token })

	const value = useMemo(() => ({
		...state,
		setWindowView,
		setAppLoading,
		setPageRoute,
		setCurrentUser,
		setToken
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
		if (windowViewStorage !== null) {
			setWindowView(windowViewStorage)
		}
	}, [windowViewStorage]) // eslint-disable-line

	useEffect(() => {
		if (state.token?.access_token !== undefined) {
			setAccessToken(state.token?.access_token)
			setRefreshToken(state.token?.refresh_token)
			if (!state.token?.access_token) {
				setPageRoute("LOGIN")
				setAppLoading(false)
			}
		}
	}, [state.token?.access_token, state.token?.refresh_token]) // eslint-disable-line

	useEffect(() => {
		if (accessToken !== null) {
			setToken({
				access_token: accessToken,
				refresh_token: refreshToken || "",
				expired_at: "",
				token_type: "Bearer"
			})
		}
	}, [accessToken, refreshToken]) // eslint-disable-line

	return <UIContext.Provider value={value} {...props} />
}

export const UseUIContext = () => {
	const context = useContext(UIContext)

	if (context === undefined) {
		throw new Error(`useUIContext must be used within a UIProvider`)
	}
	return context
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
	function toggleValue(val: Maybe<string>): void {
		setValue(val)
	}
	return [value, toggleValue]

}

const UiContext = {
	ManagedUIContext: ManagedUIContext,
	UseUIContext: UseUIContext
}

export default UiContext