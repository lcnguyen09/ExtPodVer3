import React, {
	ReactNode,
	createContext,
	useReducer,
	useContext,
} from 'react'
import {
	Maybe,
	WINDOW_VIEWS,
	PAGE_ROUTES
} from "./type.context"
import { get } from 'lodash'
import $ from 'jquery'


interface UIManageContextProps {
	children?: ReactNode,
	[name: string]: Maybe<any>
}

const initialState = {
	windowView: {
		mode: "NOMAL",
		isNomal: () => true,
		isMax: () => false,
		isMin: () => false
	},
	appLoading: true,
	pageRoute: "INIT"
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

export interface State {
	windowView: {
		mode: WINDOW_VIEWS,
		isNomal: { (): boolean },
		isMax: { (): boolean },
		isMin: { (): boolean }
	}
	appLoading: boolean,
	pageRoute: PAGE_ROUTES
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

	const value = React.useMemo(
		() => ({
			...state,
			setWindowView,
			setAppLoading,
			setPageRoute
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
	return <>
		<UIProvider>{children}</UIProvider>
	</>
}

const UiContext = {
	ManagedUIContext: ManagedUIContext,
	UseUIContext: UseUIContext
}

export default UiContext