import { useEffect, useState } from 'react';
import InspireupliftOrder from './InspireupliftOrder';
import InspireupliftItem from './InspireupliftItem';

const Identifier = 'Inspireuplift.com';

export default function Inspireuplift() {
	const [path, setPath] = useState(window.location.pathname);

	useEffect(() => {
		setInterval(() => {
			setPath(window.location.pathname);
		}, 500)
	}, [window.location.pathname]);

	if (path === '/product/add' || true) {
		return <InspireupliftItem Identifier={Identifier} />;
	}

	return <InspireupliftOrder Identifier={Identifier} />;
}
