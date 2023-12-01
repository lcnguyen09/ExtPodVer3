import { get } from "lodash";
import { useEffect, useState } from "react"
import UiContext from './../contexts/ui.context'
import NomalItem from "./libs/NomalItem"
import Inspireuplift from "./libs/inspireuplift/Inspireuplift"
import Amazon from "./libs/amazon/Amazon"
// import EtsySite from "./libs/EtsySite"

export default function Main() {
	const [site, setSite] = useState(window.location.host)

	useEffect(() => {
		setSite(window.location.host)
	}, [window.location.host])

	if (site === 'sellercentral.amazon.com') {
		return <Amazon />
	}

	if (site === 'sellercentral.inspireuplift.com') {
		return <Inspireuplift />
	}
	return <NomalItem />
}