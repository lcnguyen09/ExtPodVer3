import { useEffect, useState } from 'react';
import InspireupliftOrder from './InspireupliftOrder';
import InspireupliftItem from './InspireupliftItem';

const Identifier = 'Inspireuplift.com';

export default function Inspireuplift() {
	const [path, setPath] = useState(window.location.pathname);

	useEffect(() => {
		setPath(window.location.pathname);
	}, [window.location.pathname]);

	if (path === '/product/add' || true) {
		return <InspireupliftItem Identifier={Identifier} />;
	}

	return <InspireupliftOrder Identifier={Identifier} />;
}
