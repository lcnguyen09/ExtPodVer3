import { get } from "lodash";
import { useEffect, useState } from "react"
import UiContext from './../contexts/ui.context'
import NomalItem from "./libs/NomalItem"
import Inspireuplift from "./libs/inspireuplift/Inspireuplift"
import Amazon from "./libs/amazon/Amazon"
import Etsy from "./libs/etsy/Etsy"
// import EtsySite from "./libs/EtsySite"

export default function Main() {
	const [site, setSite] = useState(window.location.host)
	const [pathname, setPathname] = useState(window.location.pathname)

	useEffect(() => {
		setSite(window.location.host)
	}, [window.location.host])

	useEffect(() => {
		setPathname(window.location.pathname)
	}, [window.location.pathname])

	if (site === 'sellercentral.amazon.com') {
		return <Amazon />
	}

	if (site === 'sellercentral.inspireuplift.com') {
		return <Inspireuplift />
	}
	if (site === 'www.etsy.com') {
		if (pathname.startsWith('/your') || true) {
			return <Etsy />
		}
	}
	return <NomalItem />
}