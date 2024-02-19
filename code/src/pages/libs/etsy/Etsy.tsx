import { useEffect, useState } from 'react';
import EtsyOrder from './EtsyOrder';
// import InspireupliftItem from './InspireupliftItem';
// import InspireupliftItems from './InspireupliftItems';
import { Spinner } from 'reactstrap';
import { get } from 'lodash';

declare global {
    interface Window{
        Etsy?:any
    }
  }

const Identifier = 'Etsy.com';

export default function Etsy() {
	const [path, setPath] = useState(window.location.pathname);

	const [onMulti, setOnMulti] = useState<boolean>(false)
	const [reloadStore, setReloadStore] = useState<boolean>(false)
	const [storeData, setStoreData] = useState<any>()
	const [msg, setMsg] = useState<any>()

	useEffect(() => {
		if (!storeData?.account_id) {
			handleGetStore()
		}
	}, [path]);

	useEffect(() => {
		setInterval(() => {
			setPath(window.location.pathname);
		}, 500);
	}, [window.location.pathname]);

    const handleGetStore = async () => {
		setReloadStore(true)
        console.log("okokok")
        const context = get(window, ['Etsy', 'Context'], {})
        console.log(context)
		// return fetch("https://www.etsy.com/api/v3/ajax/bespoke/shop/39392803/mission-control/orders?filters%5Bbuyer_id%5D=all&filters%5Bchannel%5D=all&filters%5Bcompleted_status%5D=all&filters%5Bdestination%5D=all&filters%5Bship_date%5D=all&filters%5Bshipping_label_eligibility%5D=false&filters%5Bshipping_label_status%5D=all&filters%5Bhas_buyer_notes%5D=false&filters%5Bis_marked_as_gift%5D=false&filters%5Bis_personalized%5D=false&filters%5Bhas_shipping_upgrade%5D=false&filters%5Border_state_id%5D=1122457242231&limit=20&offset=0&search_terms=&sort_by=expected_ship_date&sort_order=asc&objects_enabled_for_normalization%5Border_state%5D=true", {
        //     "headers": {
        //     "accept": "*/*",
        //     "accept-language": "en-US,en;q=0.9",
        //     "content-type": "application/json",
        //     "downlink": "0.9",
        //     "dpr": "2",
        //     "ect": "4g",
        //     "rtt": "200",
        //     "sec-ch-dpr": "2",
        //     "sec-ch-ua": "\"Not A(Brand\";v=\"99\", \"Google Chrome\";v=\"121\", \"Chromium\";v=\"121\"",
        //     "sec-ch-ua-arch": "\"x86\"",
        //     "sec-ch-ua-bitness": "\"64\"",
        //     "sec-ch-ua-full-version-list": "\"Not A(Brand\";v=\"99.0.0.0\", \"Google Chrome\";v=\"121.0.6167.140\", \"Chromium\";v=\"121.0.6167.140\"",
        //     "sec-ch-ua-mobile": "?0",
        //     "sec-ch-ua-platform": "\"Windows\"",
        //     "sec-ch-ua-platform-version": "\"10.0.0\"",
        //     "sec-fetch-dest": "empty",
        //     "sec-fetch-mode": "cors",
        //     "sec-fetch-site": "same-origin",
        //     "x-detected-locale": "VND|en-US|VN",
        //     },
        //     "referrer": "https://www.etsy.com/your/orders/sold/new?ref=seller-platform-mcnav",
        //     "referrerPolicy": "strict-origin-when-cross-origin",
        //     "body": null,
        //     "method": "GET",
        //     "mode": "cors",
        //     "credentials": "include"
        // })
        // .then((response) => response.json())
        // .then((data) => {
        //     alert(JSON.stringify(data))
        //     // const userData = data;
        //     // if ( get(userData, 'email', '')) {
        //     //     setStoreData({
        //     //         account_id: get(userData, 'email', ''),
        //     //         account_name: get(userData, 'business_name', '')
        //     //     })
        //     //     setMsg('')
        //     // } else {
        //     //     setMsg(get(userData, 'message', ''))
        //     // }
        //     setReloadStore(false)
        // }).catch((error) => {
        //     setMsg('Cannot find user data. Refresh and try again.')
        //     setReloadStore(false)
        // })
	}

	return <div>
		{/* <div className='text-right mb-1'>Etsy store: {reloadStore ? <Spinner size='sm' /> : msg ? <span>{msg}</span> : <span><strong>{storeData?.account_name}</strong> <i>({storeData?.account_id})</i></span>}</div> */}
		<EtsyOrder Identifier={Identifier} storeData={storeData} />
        {
			storeData?.account_id || true
			? path === '/your/shops/me/listing-editor/create' && !onMulti
				? false// <InspireupliftItem Identifier={Identifier} storeData={storeData} />
				: path.endsWith('/tools/listings') || onMulti
					? false//<InspireupliftItems Identifier={Identifier} storeData={storeData} setOnMulti={setOnMulti} />
					: <EtsyOrder Identifier={Identifier} storeData={storeData} />
			: false
		}
	</div>
}
