import React, { useEffect, useState } from 'react'
import UiContext from './contexts/ui.context'
import Login from "./Login"
import Main from "./Main"

export default function Route() {
  const { appLoading, setAppLoading } = UiContext.UseUIContext()
  const { pageRoute, setPageRoute } = UiContext.UseUIContext()
  const [Component, setComponent] = useState<React.ReactNode | boolean>(false)

  useEffect(() => {
    switch (pageRoute) {
      case "INIT":
        setTimeout(() => {
          setPageRoute("LOGIN")
          setAppLoading(false)
        }, 500)
        setComponent(<div className='d-flex justify-content-center align-items-center mt-5'><div className='brand-logo' /></div>)
        break;
      case "LOGIN":
        setComponent(<Login />)
        break;
      case "MAIN":
        setComponent(<Main />)
        break;
      default:
        break;
    }

  }, [pageRoute])

  return <>{Component}</>
}