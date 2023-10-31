import { useEffect, useState } from 'react';
import InspireupliftOrder from './InspireupliftOrder';
import InspireupliftItem from './InspireupliftItem';
import InspireupliftItems from './InspireupliftItems';
import { Spinner } from 'reactstrap';
import { get } from 'lodash';

const Identifier = 'Inspireuplift.com';

export default function Inspireuplift() {
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
		return fetch('https://sellercentral-api.inspireuplift.com/api/v1/seller/staff/info?is_seller=true', {
					headers: {
						accept: 'application/json',
						'accept-language': 'en-US,en;q=0.9',
						'sec-ch-ua': '"Chromium";v="118", "Google Chrome";v="118", "Not=A?Brand";v="99"',
						'sec-ch-ua-mobile': '?0',
						'sec-ch-ua-platform': '"Windows"',
						'sec-fetch-dest': 'empty',
						'sec-fetch-mode': 'cors',
						'sec-fetch-site': 'same-site',
					},
					referrer: 'https://sellercentral.inspireuplift.com/',
					referrerPolicy: 'strict-origin-when-cross-origin',
					body: null,
					method: 'GET',
					mode: 'cors',
					credentials: 'include',
				})
					.then((response) => response.json())
					.then((data) => {
						const userData = data;
						if ( get(userData, 'email', '')) {
							setStoreData({
								account_id: get(userData, 'email', ''),
								account_name: get(userData, 'business_name', '')
							})
							setMsg('')
						} else {
							setMsg(get(userData, 'message', ''))
						}
						setReloadStore(false)
					}).catch((error) => {
						setMsg('Cannot find user data. Refresh and try again.')
						setReloadStore(false)
					})
	}

	return <div>
		<div className='text-right mb-1'>Inspireuplift store: {reloadStore ? <Spinner size='sm' /> : msg ? <span>{msg}</span> : <span><strong>{storeData?.account_name}</strong> <i>({storeData?.account_id})</i></span>}</div>
		{
			storeData?.account_id
			? path === '/product/add' && !onMulti
				? <InspireupliftItem Identifier={Identifier} storeData={storeData} />
				: path === '/product/list' || onMulti
					? <InspireupliftItems Identifier={Identifier} storeData={storeData} setOnMulti={setOnMulti} />
					: <InspireupliftOrder Identifier={Identifier} storeData={storeData} />
			: false
		}
	</div>
}
