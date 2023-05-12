import React, {
	ReactNode,
	useEffect,
	createContext,
	useReducer,
	useContext,
} from 'react'
import { Maybe } from "./type.context"
import _ from 'lodash'


interface UIManageContextProps {
	children?: ReactNode,
	[name: string]: Maybe<any>
}

const initialState = {
	init: false,
	loading: false
}

type Action =
	| {
		type: "SET_INIT";
		init: boolean
	}
	| {
		type: "SET_LOADING";
		loading: boolean
	}

export interface State {
	init: boolean
	loading: boolean
}


export const UIContext = createContext<State | any>(initialState);
UIContext.displayName = "UIContext";

function uiReducer(state: State, action: Action) {
	switch (action.type) {
		case "SET_INIT": {
			return { ...state, init: true }
		}
		case "SET_LOADING": {
			return { ...state, oading: !!action.loading }
		}
		default: {
			return state
		}
	}
}
export const UIProvider: React.FC<UIManageContextProps> = (props: UIManageContextProps) => {
	const [state, dispatch]: Maybe<any> = useReducer<any>(uiReducer, initialState);
	const value = React.useMemo(
		() => ({
			...state,
		}),
		[state]
	);

	return <UIContext.Provider value={value} {...props} />;
}


export const useUIContext = () => {
	const context = useContext(UIContext);
	if (context === undefined) {
		throw new Error(`useUIContext must be used within a UIProvider`);
	}
	return context;
};


export const ManagedUIContext: React.FC<UIManageContextProps> = ({ children }: UIManageContextProps) => {
	return <>
		<UIProvider>{children}</UIProvider>
	</>
};