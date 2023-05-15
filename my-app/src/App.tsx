import React from 'react'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from './contexts/apollo.client'
import UiContext from './contexts/ui.context'
import Layout from "./Layout"
import Route from "./Route"
import "./App.scss"

export default function App() {
  const apolloClient = useApollo({})
  return (
    <ApolloProvider client={apolloClient}>
      <React.StrictMode>
        <UiContext.ManagedUIContext>
          <Layout>
            <Route />
          </Layout>
        </UiContext.ManagedUIContext>
      </React.StrictMode>
    </ApolloProvider>
  )
}