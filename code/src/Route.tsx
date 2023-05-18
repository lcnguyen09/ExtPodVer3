import { useEffect } from 'react'
import UiContext from './contexts/ui.context'
import Login from "./pages/Login"
import Main from "./pages/Main"
import { get } from "lodash"
import {
  useCUserLazyQuery
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
    currentUser,
    setCurrentUser } = UiContext.UseUIContext()
  const [fetchCurrentUserQuery] = useCUserLazyQuery({
    fetchPolicy: "network-only"
  })
  useEffect(() => {
    if (currentUser?.token) {
      fetchCurrentUser()
    } else {
      setPageRoute("LOGIN")
      setAppLoading(false)
    }
  }, [])

  const failCurrentUser = () => {
    setCurrentUser({})
    setPageRoute("LOGIN")
    setAppLoading(false)
  }

  const fetchCurrentUser = () => {
    fetchCurrentUserQuery({
      fetchPolicy: "network-only"
    }).then(res => {
      if (res.data?.cUser?._id) {
        setCurrentUser(res.data?.cUser)
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