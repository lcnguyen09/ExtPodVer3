import { useMemo } from 'react';
import { ApolloClient, from, HttpLink, InMemoryCache } from '@apollo/client';
import unfetch from 'isomorphic-unfetch';
import { onError } from '@apollo/client/link/error';
import UiContext from './ui.context';

const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';

let apolloClient;

function newApollo(
	{ headers, targetUrl } = { headers: {}, targetUrl: '' }
) {
	return new ApolloClient({
		ssrMode: typeof window === 'undefined',
		link: from([
			// onError((errors) => {
			// 	console.log('errors: ', errors);
			// 	if (errors.graphQLErrors && errors.graphQLErrors[0].extensions?.code === 'UNAUTHENTICATED' && errors.response) {
			// 		errors.response.errors = undefined;
			// 	}
			// }),
			new HttpLink({
				uri: targetUrl,
				headers: headers,
				fetch: (url, init) =>
					unfetch(url, {
						...init,
						headers: {
							...init.headers,
						},
					}),
			}),
		]),
		cache: new InMemoryCache(),
	});
}

function initializeApollo(
	{ headers, targetUrl } = { headers: {}, targetUrl: '' }
) {
	const _apolloClient = apolloClient ?? newApollo({ headers: headers, targetUrl: targetUrl });
	// For SSG and SSR always create a new Apollo Client
	if (typeof window === 'undefined') return _apolloClient;
	// Create the Apollo Client once in the client
	if (!apolloClient) apolloClient = _apolloClient;
	return _apolloClient;
}

export function addApolloState(client, pageProps) {
	if (pageProps?.props) {
		pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
	}

	return pageProps;
}

export function useApollo() {
	const { urlGraphql, currentToken } = UiContext.UseUIContext();
	const store = useMemo(() => {
		const apolloStore = initializeApollo();
		let apolloOnError = (errors) => {
			if (errors.graphQLErrors && errors.graphQLErrors[0].extensions?.code === 'UNAUTHENTICATED' && errors.response) {
				errors.response.errors = undefined;
			}
		};
		apolloStore.setLink(
			from([
				onError(apolloOnError),
				new HttpLink({
					uri: urlGraphql,
					headers: { Authorization: `Bearer ${currentToken?.token}` },
					fetch: (url, init) =>
						unfetch(url, {
							...init,
							headers: init.headers,
						}),
				}),
			])
		);
		return apolloStore;
	}, [urlGraphql, currentToken?.token]);
	return store;
}
