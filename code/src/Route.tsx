import React, { useEffect, useState } from 'react'
import UiContext from './contexts/ui.context'
import Login from "./Login"
import Main from "./Main"

export default function Router() {
  const { setAppLoading } = UiContext.UseUIContext()
  const { pageRoute, setPageRoute } = UiContext.UseUIContext()
  const SwitchRoute = () => {
    switch (pageRoute) {
      case "INIT":
        setTimeout(() => {
          setPageRoute("LOGIN")
          setAppLoading(false)
        }, 500)
        return <div className='d-flex justify-content-center align-items-center mt-5'><div className='brand-logo' /></div>
      case "LOGIN":
        return <Login />
      case "MAIN":
        return <Main />
      default:
        return <></>;
    }
  };
  return <>{SwitchRoute()}</>
}