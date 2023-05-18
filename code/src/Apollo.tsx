import { ReactNode } from 'react'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from './contexts/apollo.client'

export default function Apollo({ children }: {
    children: ReactNode
}) {
    return (<ApolloProvider client={useApollo({})}>
        {children}
    </ApolloProvider>)
}