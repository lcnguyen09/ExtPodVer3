import UiContext from './contexts/ui.context'
import Layout from "./Layout"
import Apollo from "./Apollo"
import Route from "./Route"
import "./App.scss"

export default function App() {
  return (<UiContext.ManagedUIContext>
    <Layout>
      <Apollo>
        <Route />
      </Apollo>
    </Layout>
  </UiContext.ManagedUIContext>)
}