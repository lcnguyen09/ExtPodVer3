import { useEffect } from 'react'
import UiContext from './contexts/ui.context'
import Login from "./pages/Login"
import Main from "./pages/Main"
import { get } from "lodash"
import {
  useMeLazyQuery
} from "./graphql/graphql"

const routers = {
  LOGIN: <Login />,
  MAIN: <Main />,
}

export default function Router() {
  const {
    pageRoute,
    setAppLoading,
    setPageRoute,
    setCurrentUser,
    token } = UiContext.UseUIContext()
  const [fetchCurrentUserQuery] = useMeLazyQuery({
    fetchPolicy: "network-only"
  })
  useEffect(() => {
    if (token?.access_token) {
      fetchCurrentUser()
    } else {
      setPageRoute("LOGIN")
      setAppLoading(false)
    }
  }, [token?.access_token]) // eslint-disable-line

  const failCurrentUser = () => {
    setCurrentUser({})
    setPageRoute("LOGIN")
    setAppLoading(false)
  }

  const fetchCurrentUser = () => {
    fetchCurrentUserQuery({
      fetchPolicy: "network-only"
    }).then(res => {
      if (res.data?.me?._id) {
        setCurrentUser(res.data?.me)
        setPageRoute("MAIN")
        setAppLoading(false)
      } else {
        failCurrentUser()
      }
    }).catch(failCurrentUser)
  }
  return <>
    {get(routers, pageRoute, <div className='d-flex justify-content-center align-items-center mt-5'>
      <div className='brand-logo' />
    </div>)}
  </>
}