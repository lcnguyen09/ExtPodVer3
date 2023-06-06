import { get } from "lodash";
import { useEffect, useState } from "react"
import UiContext from './../contexts/ui.context'
import NomalItem from "./libs/NomalItem"
import Wanderprints from "./libs/Wanderprints"
import EtsyOrder from "./libs/EtsyOrder"


const sitesLib = {
	"not_support": <div className="text-center">This site is not support</div>,
	"localhost:3333": <Wanderprints />,
	"wanderprints.com": <Wanderprints />,
}

const sitesLibOrder = {
	"not_support": <NomalItem />,
	// "localhost:3333": <EtsyOrder />,
	"etsy.com": <EtsyOrder />,
}

export default function Main() {
	const { currentAppConfig } = UiContext.UseUIContext()
	const [site, setSite] = useState(window.location.host)
	
	useEffect(() => {
		setSite(window.location.host)
	}, [window.location.host]) // eslint-disable-line

	switch (currentAppConfig?.mode) {
		case "PersonalizeItemClaw":
			return <>{get(sitesLib, site, sitesLib.not_support)}</>
		case "SimpleItemClaw":
			return <>{get(sitesLibOrder, site, sitesLibOrder.not_support)}</>
		default:
			return <></>
	}
}