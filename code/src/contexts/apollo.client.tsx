import { useMemo } from 'react'
import {
	ApolloClient,
	from,
	HttpLink,
	InMemoryCache,
	NormalizedCacheObject
} from '@apollo/client'
import unfetch from 'isomorphic-unfetch'
import { onError } from '@apollo/client/link/error'
import UiContext from './../contexts/ui.context'
import {
	URL_TASK_GRAPHQL
} from "./contants"

const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__'

let apolloClient: ApolloClient<NormalizedCacheObject>

interface IApolloStateProps {
	[APOLLO_STATE_PROP_NAME]?: NormalizedCacheObject
}

function initializeApollo({ headers, targetUrl }: { headers?: Record<string, string>, targetUrl?: string } = { headers: {}, targetUrl: "" }) {
	const _apolloClient = apolloClient ?? new ApolloClient({
		ssrMode: typeof window === 'undefined',
		link: from([
			onError(errors => {
				if (errors.graphQLErrors &&
					errors.graphQLErrors[0].extensions?.code === 'UNAUTHENTICATED' &&
					errors.response) { errors.response.errors = undefined }
			}),
			new HttpLink({
				uri: targetUrl,
				headers: headers,
				fetch: (url: RequestInfo, init: RequestInit) => unfetch(url, {
					...init,
					headers: {
						...init.headers,
					}
				})
			})
		]),
		cache: new InMemoryCache(),
	})

	// For SSG and SSR always create a new Apollo Client
	if (typeof window === 'undefined') return _apolloClient
	// Create the Apollo Client once in the client
	if (!apolloClient) apolloClient = _apolloClient

	return _apolloClient
}

export function addApolloState(
	client: ApolloClient<NormalizedCacheObject>,
	pageProps: { props: IApolloStateProps }
) {
	if (pageProps?.props) {
		pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract()
	}

	return pageProps
}

export function useApollo() {
	const { urlGraphql, currentToken } = UiContext.UseUIContext()
	const store = useMemo(() => {
		return initializeApollo({
			headers: {
				"Authorization": `Bearer ${currentToken?.access_token}`
			},
			targetUrl: urlGraphql
		})
	}, [urlGraphql, currentToken?.access_token])
	return store
}
