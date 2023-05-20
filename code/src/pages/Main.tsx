import { get } from "lodash";
import { useEffect, useState } from "react"
import Wanderprints from "./libs/Wanderprints"

const sitesLib = {
	"wanderprints.com": <Wanderprints />,
}

export default function Main() {
	const [site, setSite] = useState(window.location.host)
	useEffect(() => {
		setSite(window.location.host)
	}, [window.location.host])
	return <>
		{get(sitesLib, site, <div className="text-center">This site is not support</div>)}
	</>
}