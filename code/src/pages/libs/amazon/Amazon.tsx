import { useEffect, useState } from 'react';
import { Spinner } from 'reactstrap';
import { get } from 'lodash';

const Identifier = 'Amazon.com';

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
	}

	return <div>
		<div className='text-right mb-1'>Inspireuplift store: {reloadStore ? <Spinner size='sm' /> : msg ? <span>{msg}</span> : <span><strong>{storeData?.account_name}</strong> <i>({storeData?.account_id})</i></span>}</div>
	</div>
}
