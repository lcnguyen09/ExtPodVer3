import { useEffect, useState } from 'react'

import { Card, CardBody, CardHeader, CardTitle, Spinner } from 'reactstrap'
import { Maximize2, ChevronDown } from "react-feather"
// import _ from 'lodash'

export default function App() {
	const windowState = useState()

	// const [value, setValue, isPersistent, error, isInitialStateResolved] = useChromeStorageLocal('token', "")
	useEffect(() => {
		console.log(windowState);
		if (document.getElementsByTagName("body")[0]) {
			// document.getElementsByTagName("body")[0].classList.add("hidden")
		}
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
			<CardBody id="podorder-ext-app-body">
				<div className='h-100 d-flex justify-content-center align-items-center'><Spinner animation="border" role="status" /></div>
			</CardBody>


		</Card>
	)
}