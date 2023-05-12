import React from 'react'
import UiContext from './contexts/ui.context'
import Layout from "./Layout"
import Route from "./Route"
import "./App.scss"

export default function App() {
  return (
    <React.StrictMode>
      <UiContext.ManagedUIContext>
        <Layout>
          <Route />
        </Layout>
      </UiContext.ManagedUIContext>
    </React.StrictMode>
  )
}