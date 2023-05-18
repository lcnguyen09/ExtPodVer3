import { useMemo, useState } from 'react'
import {
	ApolloClient,
	from,
	HttpLink,
	InMemoryCache,
	NormalizedCacheObject
} from '@apollo/client'
import merge from 'deepmerge'
import isEqual from 'lodash/isEqual'
import unfetch from 'isomorphic-unfetch'
import { onError } from '@apollo/client/link/error'
import UiContext from './../contexts/ui.context'
import {
	URL_GRAPHQL
} from "./contants"

const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__'

let apolloClient: ApolloClient<NormalizedCacheObject>

interface IApolloStateProps {
	[APOLLO_STATE_PROP_NAME]?: NormalizedCacheObject,
	token?: string | null
}

function initializeApollo({ headers, initialState, targetUrl }: {
	headers?: Record<string, string>, initialState?: NormalizedCacheObject | null, targetUrl?: string
} = { headers: {}, initialState: null, targetUrl: URL_GRAPHQL }
) {
	const _apolloClient = new ApolloClient({
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
				// credentials: "include",
				fetch: (url: RequestInfo, init: RequestInit) => {
					return unfetch(url, {
						...init,
						headers: {
							...init.headers,
							'Access-Control-Allow-Origin': "*",
							"X-Requested-With": "XMLHttpRequest",
						}
					})
				}
			})]),
		cache: new InMemoryCache(),
	})

	// If your page has Next.js data fetching methods that use Apollo Client, the initial state
	// gets hydrated here
	if (initialState) {
		// Get existing cache, loaded during client side data fetching
		const existingCache = _apolloClient.extract()

		// Merge the existing cache into data passed from getStaticProps/getServerSideProps
		const data = merge(initialState, existingCache, {
			// combine arrays using object equality (like in sets)
			arrayMerge: (destinationArray, sourceArray) => [
				...sourceArray,
				...destinationArray.filter(d => sourceArray.every(s => !isEqual(d, s)))
			]
		})

		// Restore the cache with the merged data
		_apolloClient.cache.restore(data)
	}
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

export function useApollo(pageProps: IApolloStateProps) {
	const state = pageProps[APOLLO_STATE_PROP_NAME]
	const { accountUri, hubUri, currentUser } = UiContext.UseUIContext()
	const [targetUrl, setTargetUrl] = useState<string>(accountUri)
	const store = useMemo(() => initializeApollo({
		headers: {
			'Access-Control-Allow-Origin': '*',
			"X-Requested-With": "XMLHttpRequest",
			"Authorization": `Bearer ${currentUser?.token}`
		},
		initialState: state,
		targetUrl: targetUrl
	}), [state, currentUser?.token])
	return store
}
