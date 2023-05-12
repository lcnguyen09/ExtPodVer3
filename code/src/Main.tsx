import React, { useEffect, useState } from 'react'

import { Card, CardBody, CardHeader, CardTitle, CardSubtitle, Collapse, Spinner } from 'reactstrap'
import { Eye, X, Maximize2, Minimize2, ChevronDown, ChevronUp } from "react-feather"
import moment from 'moment'
import _ from 'lodash'
import { useChromeStorageLocal } from 'use-chrome-storage'
import Login from "./Login"
import Main from "./Main"

export default function App() {
	const appState = useState()
	const windowState = useState()

	// const [value, setValue, isPersistent, error, isInitialStateResolved] = useChromeStorageLocal('token', "")
	useEffect(() => {
		console.log(windowState);
		if (document.getElementsByTagName("body")[0]) {
			// document.getElementsByTagName("body")[0].classList.add("hidden")
		}
		console.log("okok")
		setTimeout(() => {
		}, 5000)
	})
	return (
		<Card className="h-100 card-action card-reload" id="podorder-ext-app-main">
			<CardHeader className='d-flex justify-content-between' id="podorder-ext-app-header">
				<CardTitle className='mb-0'>
					<div className='brand-logo' />
				</CardTitle>
				<div className="actions d-flex justify-content-right align-items-center">
					<Maximize2 cursor="pointer" className='mx-3' size={13} onClick={() => false} />
					<ChevronDown cursor="pointer" className='ml-1' size={15} onClick={() => false} />
				</div>
			</CardHeader>
			<Collapse isOpen={true} className={true ? "h-100" : ""}>
				<CardBody id="podorder-ext-app-body">
					<div className='h-100 d-flex justify-content-center align-items-center'><Spinner animation="border" role="status" /></div>
				</CardBody>
			</Collapse>


		</Card>
	)
}