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

export default function Router({ apolloClient }: {
  apolloClient?: any
}) {
  const {
    pageRoute,
    setAppLoading,
    setPageRoute,
    setCurrentUser,
    token,
    setToken } = UiContext.UseUIContext()
  const [fetchCurrentUserQuery] = useMeLazyQuery({ fetchPolicy: "network-only" })
  useEffect(() => {
    fetchCurrentUser()
  }, [apolloClient]) // eslint-disable-line

  function fetchCurrentUser() {
    if (!token?.access_token) return
    fetchCurrentUserQuery({ fetchPolicy: "network-only" }).then(res => {
      if (!res.data?.me?._id) throw new Error("Unauth")
      setCurrentUser(res.data?.me)
      setPageRoute("MAIN")
      setAppLoading(false)
    }).catch(() => {
      setCurrentUser()
      setToken()
      setPageRoute("LOGIN")
      setAppLoading(false)
    })
  }
  return <>
    {get(routers, pageRoute, <div className='d-flex justify-content-center align-items-center mt-5'>
      <div className='brand-logo' />
    </div>)}
  </>
}