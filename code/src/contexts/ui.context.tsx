import React, {
	ReactNode,
	createContext,
	useReducer,
	useContext,
	useEffect,
	useRef,
	useState,
	Dispatch,
	SetStateAction,
} from 'react'
import {
	WINDOW_VIEWS,
	PAGE_ROUTES,
	ACTION
} from "./type.context"
import {
	Maybe,
	User,
	Docker
} from "./../graphql/graphql"
import { get } from 'lodash'
import $ from 'jquery'
import {
	URL_LOGIN,
	URL_GRAPHQL_ACCOUNT,
	URL_GRAPHQL
} from "./contants"

interface UIManageContextProps {
	children?: ReactNode,
	[name: string]: Maybe<any>
}


const initialState = {
	loginUri: URL_LOGIN,
	accountUri: URL_GRAPHQL_ACCOUNT,
	hubUri: URL_GRAPHQL,
	windowView: {
		mode: cookieGet("_pod_ext_mode") || "NOMAL",
		isNomal: () => true,
		isMax: () => false,
		isMin: () => false
	},
	appLoading: true,
	pageRoute: "INIT",
	currentUser: null,
	currentDocker: null,
}

export interface State {
	loginUri: string,
	accountUri: string,
	hubUri: string,
	windowView: {
		mode: WINDOW_VIEWS,
		isNomal: { (): boolean },
		isMax: { (): boolean },
		isMin: { (): boolean }
	}
	appLoading: boolean,
	pageRoute: PAGE_ROUTES,
	currentUser: User | null,
	currentDocker: Docker | null
}


export const UIContext = createContext<State | any>(initialState)
UIContext.displayName = "UIContext"

function uiReducer(state: State, action: ACTION) {
	switch (action.type) {
		case "SET_WINDOW_VIEW": {
			if (get(action, "view") === "MAX") { $("body").addClass("podorder-ext-app-max") }
			else { $("body").removeClass("podorder-ext-app-max") }
			return {
				...state, windowView: {
					mode: get(action, "view"),
					isNomal: () => get(action, "view") === "NOMAL",
					isMax: () => get(action, "view") === "MAX",
					isMin: () => get(action, "view") === "MIN"
				}
			}
		}
		case "SET_LOADING": {
			return { ...state, appLoading: !!action.appLoading }
		}
		case "SET_PAGE_ROUTE": {
			return { ...state, pageRoute: action.page }
		}
		case "SET_CURRENT_USER": {
			return {
				...state, currentUser: {
					...action.user,
					token: action.user?.token ? action.user?.token : ""
				}
			}
		}
		case "SET_CURRENT_DOCKER": {
			return { ...state, currentDocker: action.docker }
		}
		default: {
			return state
		}
	}
}
export const UIProvider: React.FC<UIManageContextProps> = (props: UIManageContextProps) => {
	const [state, dispatch]: Maybe<any> = useReducer<any>(uiReducer, initialState)
	const [token, setToken] = useStorage("_pod_ext_token")
	const [docker, setDocker] = useStorage("_pod_ext_docker")
	const [windowMode, setWindowMode] = useStorage("_pod_ext_mode")

	const setWindowView = (view: WINDOW_VIEWS) => {
		dispatch({ type: "SET_WINDOW_VIEW", view })
		setWindowMode(view)
	}
	const setAppLoading = (appLoading: boolean) => dispatch({ type: "SET_LOADING", appLoading })
	const setPageRoute = (page: PAGE_ROUTES) => dispatch({ type: "SET_PAGE_ROUTE", page })
	const setCurrentUser = (user: User) => {
		dispatch({ type: "SET_CURRENT_USER", user })
		setToken(get(user, "token", ""))
	}
	const setCurrentDocker = (docker: Docker) => {
		dispatch({ type: "SET_CURRENT_DOCKER", docker })
		setDocker(get(docker, "_id", ""))
	}
	const value = React.useMemo(
		() => ({
			...state,
			setWindowView,
			setAppLoading,
			setPageRoute,
			setCurrentUser,
			setCurrentDocker
		}),
		[state]
	)
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

export function usePreviousValue(value: any) {
	const ref = useRef();
	useEffect(() => {
		ref.current = value;
	});
	return ref.current;
}

export const useStorage = (key: string): [string | null | undefined, (val: Maybe<string>) => void] => {
	const [value, setValue] = useState<string | null>(null)
	useEffect(() => {
		try {
			chrome.storage.local.get([key]).then((result) => {
				setValue(get(result, key, "") ? get(result, key, "") : "")
			})
		} catch (error) {
			const newVal = cookieGet(key)
			setValue(newVal)
		}

	}, [])
	useEffect(() => {
		if (value !== null) {
			try {
				chrome.storage.local.set({ [key]: value ? value : "" })
			} catch (error) {
				cookieSet(key, value ? value : "")
			}
		}
	}, [value])
	const cookieGet = (cname: string) => {
		const name = cname + "=";
		const decodedCookie = decodeURIComponent(document.cookie);
		const ca = decodedCookie.split(';');
		for (let i = 0; i < ca.length; i++) {
			let c = ca[i];
			while (c.charAt(0) === ' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) === 0) {
				return c.substring(name.length, c.length) ? c.substring(name.length, c.length) : "";
			}
		}
		return '';
	}
	const cookieSet = (cname: string, cvalue: any, exdays = 365) => {
		const d = new Date();
		d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
		const expires = "expires=" + d.toUTCString();
		return document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/;";
	}
	const toggleValue = (val: Maybe<string>) => {
		setValue(val)
	}
	return [value, toggleValue]

}

function cookieGet(cname: string) {
	const name = cname + "=";
	const decodedCookie = decodeURIComponent(document.cookie);
	const ca = decodedCookie.split(';');
	for (let i = 0; i < ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) === ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) === 0) {
			return c.substring(name.length, c.length) ? c.substring(name.length, c.length) : "";
		}
	}
	return '';
}

const UiContext = {
	ManagedUIContext: ManagedUIContext,
	UseUIContext: UseUIContext
}

export default UiContext