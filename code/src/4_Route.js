import { useEffect } from 'react';
import UiContext from './contexts/ui.context';
import Login from './pages/Login';
import Main from './pages/Main';
import { drop, get, head, map } from 'lodash';
import { useLazyQuery, gql } from '@apollo/client';

const routers = {
	LOGIN: <Login />,
	MAIN: <Main />,
};

const GET_CURRENT_USER = gql`
  query GetCUser {
    cUser {
		_id
		email
		name
		identity
		identity_label
		role
		created_at
		token
		auth_docker {
			docker_id
			docker {
				_id
				domain
				label
				server
				sku
			}
		}
    }
  }
`;

export default function Router({ apolloClient }) {
	const { pageRoute, setPageRoute, setCurrentUser, currentToken, setCurrentToken, setGraphqlForAccount } =
		UiContext.UseUIContext();

	const [getCUser, { loading, error, data }] = useLazyQuery(GET_CURRENT_USER, { errorPolicy: "all" });

	useEffect(() => {
		fetchCurrentUser();
	}, [apolloClient]);

	useEffect(() => {
		if (data?.cUser?._id) {
			setCurrentUser({
				_id: data?.cUser?._id,
				email: data?.cUser?.email,
				first_name: head((data?.cUser?.name || '').split(' ')),
				last_name: drop((data?.cUser?.name || '').split(' ')).join(' '),
				fullname: data?.cUser?.name || '',
				docker: map(data?.cUser?.auth_docker, (auth_docker) => {
					return {
						_id: auth_docker?.docker?._id,
						domain: auth_docker?.docker?.domain,
						label: auth_docker?.docker?.label,
						server: auth_docker?.docker?.server,
						sku: auth_docker?.docker?.sku,
					};
				}),
			})
			setPageRoute('MAIN');
		}
	}, [data?.cUser]);

	useEffect(() => {
		setCurrentUser();
		setCurrentToken();
		setPageRoute('LOGIN');
	}, [error]);

	function fetchCurrentUser() {
		fetchCurrent();
	}

	function fetchCurrent() {
		if (!currentToken?.token) {
			return setCurrentUser();
		}
		setGraphqlForAccount().then(getCUser)
	}

	return (
		<>
			{get(
				routers,
				pageRoute,
				<div className='d-flex justify-content-center align-items-center mt-5'>
					<div className='brand-logo' />
				</div>
			)}
		</>
	);
}
