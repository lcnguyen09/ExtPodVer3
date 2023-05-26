import { get } from "lodash";
import { useEffect, useState } from "react"
import { DEV_MODE } from "./../contexts/contants";
import Wanderprints from "./libs/Wanderprints"

const sitesLib = {
	"not_support": DEV_MODE ? <Wanderprints /> : <div className="text-center">This site is not support</div>,
	"wanderprints.com": <Wanderprints />,
}

export default function Main() {
	const [site, setSite] = useState(window.location.host)
	useEffect(() => {
		setSite(window.location.host)
	}, [window.location.host])
	return <>
		{get(sitesLib, site, sitesLib.not_support)}
	</>
}