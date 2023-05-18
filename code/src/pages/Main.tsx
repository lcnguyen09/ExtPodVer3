import { useEffect, useRef, useState } from 'react'

import { NavLink, CardBody, CardHeader, CardTitle, Spinner } from 'reactstrap'
import Select, { StylesConfig } from 'react-select';

import { Server, ChevronDown } from "react-feather"
import { map, get } from 'lodash'
import {
	useCUserLazyQuery
} from "../graphql/graphql"
import UiContext from '../contexts/ui.context'

export default function Main() {
	const { currentUser } = UiContext.UseUIContext()
	const [onChange, setChange] = useState<boolean>(false)
	const selectRef = useRef()

	useEffect(() => {
		console.log(currentUser);
	}, [])

	const colourStyles: StylesConfig = {
		control: (styles) => ({
			...styles,
			backgroundColor: 'white',
		}),
		valueContainer: (styles) => ({
			...styles,
		}),
		menu: (styles) => ({
			...styles,
			maxHeight: '100px',
			overflow: "hidden",
			padding: '0 6px'
		}),
		option: (styles) => {
			return {
				...styles,
				maxHeight: "100px",
				':active': {
					...styles[':active'],
				},
			};
		},
		input: (styles) => ({ ...styles }),
		placeholder: (styles) => ({ ...styles }),
		singleValue: (styles) => ({ ...styles }),
	};

	// const windowState = useState()
	// const [ fetchCurrentUserQuery ] = useCUserLazyQuery()
	// const { pageRoute, accountUri, hubUri } = UiContext.UseUIContext()

	// const [value, setValue, isPersistent, error, isInitialStateResolved] = useChromeStorageLocal('token', "")
	// useEffect(() => {
	// 	
	// 	if (document.getElementsByTagName("body")[0]) {
	// 		// document.getElementsByTagName("body")[0].classList.add("hidden")
	// 	}
	// 	fetchCurrentUserQuery().then(cUser => {
	// 		

	// 	})
	// }, [])
	// useEffect(() => {
	// 	
	// 	// if (pageRoute !== "INIT" && pageRoute !== "LOGIN") {
	// 	//   setTargetUrl(hubUri)
	// 	// }
	//   }, [pageRoute])
	return (<div className=''>
		Main 
		Main 
		Main 
		Main 
		Main 
	</div>)
}