import React, { useEffect, useState } from 'react'
import {
  useAppSelector,
  useAppDispatch,
  setAppLoaded,
  changeWindowState
} from './redux/redux'

import { Card, CardBody, CardHeader, CardTitle, CardSubtitle, Collapse, Spinner } from 'reactstrap'
import { Eye, X, Maximize2, Minimize2, ChevronDown, ChevronUp } from "react-feather"
import moment from 'moment'
import _ from 'lodash'
import { useChromeStorageLocal } from 'use-chrome-storage'
import Config from "./config"
import Login from "./Login"
import Main from "./Main"

export default function App() {
  const dispatch = useAppDispatch()
  const appState = useAppSelector((state) => state.appConfig.appState)
  const windowState = useAppSelector((state) => state.appConfig.windowState)

  // const [value, setValue, isPersistent, error, isInitialStateResolved] = useChromeStorageLocal('token', "")
  useEffect(() => {
    console.log(windowState);
    if (document.getElementsByTagName("body")[0]) {
      // document.getElementsByTagName("body")[0].classList.add("hidden")
    }
    console.log("okok")
    setTimeout(() => {
      dispatch(setAppLoaded())
    }, 5000)
  })
  return (
    <Card className="h-100 card-action card-reload" id="podorder-ext-app-main">
      <CardHeader className='d-flex justify-content-between' id="podorder-ext-app-header">
        <CardTitle className='mb-0'>
          <div className='brand-logo' />
        </CardTitle>
        <div className="actions d-flex justify-content-right align-items-center">
          {
            windowState === Config.WINDOW_MAX_STATE
              ? <Minimize2 cursor="pointer" className='mx-3' size={13} onClick={() => dispatch(changeWindowState(Config.WINDOW_MAX_STATE))} />
              : <Maximize2 cursor="pointer" className='mx-3' size={13} onClick={() => dispatch(changeWindowState(Config.WINDOW_MAX_STATE))} />
          }
          {
            windowState === Config.WINDOW_MIN_STATE
              ? <ChevronUp cursor="pointer" className='ml-1' size={15} onClick={() => dispatch(changeWindowState(Config.WINDOW_MIN_STATE))} />
              : <ChevronDown cursor="pointer" className='ml-1' size={15} onClick={() => dispatch(changeWindowState(Config.WINDOW_MIN_STATE))} />
          }
          
        </div>
      </CardHeader>
      <Collapse isOpen={windowState !== Config.WINDOW_MIN_STATE} className={windowState === Config.WINDOW_MAX_STATE ? "h-100" : ""}>
        <CardBody id="podorder-ext-app-body">
          {
            appState === Config.APP_LOADING_STATE
              ? <div className='h-100 d-flex justify-content-center align-items-center'><Spinner animation="border" role="status" /></div>
              : appState === Config.APP_LOGIN_STATE
                ? <Login onClose={() => false} />
                : <Main onClose={() => false} />
          }
        </CardBody>
      </Collapse>


    </Card>
  )
}