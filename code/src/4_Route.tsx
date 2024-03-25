import { useEffect } from 'react';
import UiContext from './contexts/ui.context';
import Login from './pages/Login';
import Main from './pages/Main';
import { drop, get, head, map } from 'lodash';
import { useCUserLazyQuery } from './graphql/graphql';

const routers = {
	LOGIN: <Login />,
	MAIN: <Main />,
};

export default function Router({ apolloClient }: { apolloClient?: any }) {
	const { pageRoute, setPageRoute, setCurrentUser, currentToken, setCurrentToken, setGraphqlForAccount } =
		UiContext.UseUIContext();
	const [fetchCUserLazyQuery] = useCUserLazyQuery({ fetchPolicy: 'network-only' });
	useEffect(() => {
		fetchCurrentUser();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [apolloClient]);

	function fetchCurrentUser() {
		if (!currentToken?.token) {
			return setCurrentUser();
		}
		setGraphqlForAccount()
			.then(() => fetchCUserLazyQuery({ fetchPolicy: 'network-only' }))
			.then((res: any) => {
				const me = res.data?.cUser;
				if (!me?._id) throw new Error('Unauth');
				fetchCurrentUserSuccess({
					_id: me?._id,
					email: me?.email,
					first_name: head((me?.name || '').split(' ')),
					last_name: drop((me?.name || '').split(' ')).join(' '),
					fullname: me?.name || '',
					docker: map(me?.auth_docker, (auth_docker) => {
						return {
							_id: auth_docker?.docker?._id,
							domain: auth_docker?.docker?.domain,
							label: auth_docker?.docker?.label,
							server: auth_docker?.docker?.server,
							sku: auth_docker?.docker?.sku,
						};
					}),
				});
			})
			.catch(fetchCurrentUserFail);
	}

	function fetchCurrentUserSuccess(currentUser: any) {
		setTimeout(() => setCurrentUser(currentUser), 0);
		setPageRoute('MAIN');
	}

	function fetchCurrentUserFail(error: any) {
		setCurrentUser();
		setCurrentToken();
		setPageRoute('LOGIN');
	}

	return (
		<>
			{get(
				routers,
				pageRoute,
				<div className="d-flex justify-content-center align-items-center mt-5">
					<div className="brand-logo" />
				</div>
			)}
		</>
	);
}
