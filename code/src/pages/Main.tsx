import { get } from "lodash";
import { useEffect, useState } from "react"
import UiContext from './../contexts/ui.context'
import NomalItem from "./libs/NomalItem"
import Wanderprints from "./libs/Wanderprints"
import EtsySite from "./libs/EtsySite"


const sitesLibPersonalizeItem = {
	"not_support": <div className="text-center">This site is not support</div>,
	"localhost:3333": <Wanderprints />,
	"wanderprints.com": <Wanderprints />,
}

const sitesLibItem = {
	"not_support": <NomalItem />,
	// "localhost:3333": <NomalItem />,
	// "localhost:3333": <EtsySite />,
	// "etsy.com": <EtsySite />,
}

export default function Main() {
	const { currentAppConfig } = UiContext.UseUIContext()
	const [site, setSite] = useState(window.location.host)
	
	useEffect(() => {
		setSite(window.location.host)
	}, [window.location.host]) // eslint-disable-line

	switch (currentAppConfig?.mode) {
		case "PersonalizeItemClaw":
			return <>{get(sitesLibPersonalizeItem, site, sitesLibPersonalizeItem.not_support)}</>
		case "SimpleItemClaw":
			return <>{get(sitesLibItem, site, sitesLibItem.not_support)}</>
		default:
			return <></>
	}
}