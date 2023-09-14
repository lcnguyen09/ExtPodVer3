import { Children, ReactNode, cloneElement, isValidElement, useEffect } from 'react'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from './contexts/apollo.client'

export default function Apollo({ children }) {
    const apolloClient = useApollo()
    return (<ApolloProvider client={apolloClient}>
        <>{
            Children.map(children, child => {
                if (isValidElement(child)) {
                    const props = {
                        apolloClient: apolloClient
                    }
                    return cloneElement(child, props);
                }
                return child;
            })
        }</>
    </ApolloProvider>)
}