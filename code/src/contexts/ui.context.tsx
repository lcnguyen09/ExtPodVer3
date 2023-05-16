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
	PAGE_ROUTES
} from "./type.context"
import {
	Maybe,
	User
} from "./../graphql/graphql"
import { get } from 'lodash'
import $ from 'jquery'

interface UIManageContextProps {
	children?: ReactNode,
	[name: string]: Maybe<any>
}

const DEV_MODE = true

const initialState = {
	loginUri: DEV_MODE ? "http://localhost:3201/api/v1/auth" : "https://api-account.podorders.store/api/v1/auth",
	windowView: {
		mode: "NOMAL",
		isNomal: () => true,
		isMax: () => false,
		isMin: () => false
	},
	appLoading: true,
	pageRoute: "INIT",
	currentUser: null
}

type Action =
	| {
		type: "SET_LOADING"
		appLoading: boolean
	}
	| {
		type: "SET_WINDOW_VIEW"
		view: WINDOW_VIEWS
	}
	| {
		type: "SET_PAGE_ROUTE"
		page: PAGE_ROUTES
	}
	| {
		type: "SET_CURRENT_USER"
		user: User | null
	}

export interface State {
	loginUri: string,
	windowView: {
		mode: WINDOW_VIEWS,
		isNomal: { (): boolean },
		isMax: { (): boolean },
		isMin: { (): boolean }
	}
	appLoading: boolean,
	pageRoute: PAGE_ROUTES,
	currentUser: User | null
}


export const UIContext = createContext<State | any>(initialState)
UIContext.displayName = "UIContext"

function uiReducer(state: State, action: Action) {
	switch (action.type) {
		case "SET_WINDOW_VIEW": {
			if (get(action, "view") === "MAX") {
				$("body").addClass("podorder-ext-app-max")
			} else {
				$("body").removeClass("podorder-ext-app-max")
			}
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
			return { ...state, currentUser: action.user }
		}
		default: {
			return state
		}
	}
}
export const UIProvider: React.FC<UIManageContextProps> = (props: UIManageContextProps) => {
	const [state, dispatch]: Maybe<any> = useReducer<any>(uiReducer, initialState)
	const setWindowView = (view: WINDOW_VIEWS) => dispatch({ type: "SET_WINDOW_VIEW", view })
	const setAppLoading = (appLoading: boolean) => dispatch({ type: "SET_LOADING", appLoading })
	const setPageRoute = (page: PAGE_ROUTES) => dispatch({ type: "SET_PAGE_ROUTE", page })
	const setCurrentUser = (user: User) => dispatch({ type: "SET_CURRENT_USER", user })

	const value = React.useMemo(
		() => ({
			...state,
			setWindowView,
			setAppLoading,
			setPageRoute,
			setCurrentUser
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
	const [token, setToken] = useState<string | null>("token")
	// const [token, loadingToken, setToken, error] = useStorage("token")
	useEffect(() => {
		console.log("abc");
		// const a = useStorageGet(key)
		// console.log('a: ', a);
	  }, []) 
	return <>
		<UIProvider>{children}</UIProvider>
		<p onClick={() => {
			setToken("xyz")
		}}>Click here {token}</p>
		<p onClick={() => {
			setToken("abc")
		}}>Click here {token}</p>
	</>
// 	return <>
// 	<UIProvider>{children}</UIProvider>
// </>
}

export function usePreviousValue(value: any) {
	const ref = useRef();
	useEffect(() => {
		ref.current = value;
	});
	return ref.current;
}

export const useStorage = (key: string): [string | null, boolean, (val: string) => void, string | null] => {
	const [value, setValue] = useState<string | null>(null)
	const [loading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)
	useEffect(() => {
		console.log("abc");
		// const a = useStorageGet(key)
		// console.log('a: ', a);
	  }, []) 
    const toggleValue = (val: string) => setValue(val)
    return [value, loading, toggleValue, error]

}

export function useStorageGet(cname: string) {
	if (chrome.storage) {
		return chrome.storage.local.get([cname]).then(data => {
			return get(data, cname, null)
		})
	}
	const name = cname + "=";
	const decodedCookie = decodeURIComponent(document.cookie);
	const ca = decodedCookie.split(';');
	for (let i = 0; i < ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) === ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) === 0) {
			return c.substring(name.length, c.length);
		}
	}
	return '';
}

export function useStorageSet(cname: string, cvalue: any, exdays = 365) {
	if (chrome.storage) {
		return chrome.storage.local.set({ [cname]: cvalue })
	}
	const d = new Date();
	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	const expires = "expires=" + d.toUTCString();
	return document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/;";
}


const UiContext = {
	ManagedUIContext: ManagedUIContext,
	UseUIContext: UseUIContext
}

export default UiContext