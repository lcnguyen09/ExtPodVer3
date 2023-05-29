import { useEffect } from 'react'
import UiContext from './contexts/ui.context'
import Login from "./pages/Login"
import Main from "./pages/Main"
import { get } from "lodash"
import {
  useMeLazyQuery
} from "./graphql_task/graphql"

const routers = {
  LOGIN: <Login />,
  MAIN: <Main />,
}

export default function Router({ apolloClient }: {
  apolloClient?: any
}) {
  const {
    pageRoute,
    setPageRoute,
    setCurrentUser,
    currentToken,
    setCurrentToken,
    currentAppConfig } = UiContext.UseUIContext()
  const [fetchCurrentUserQuery] = useMeLazyQuery({ fetchPolicy: "network-only" })
  useEffect(() => {
    fetchCurrentUser()
  }, [apolloClient]) // eslint-disable-line

  function fetchCurrentTask() {
    if (!currentToken?.access_token) {
      return setCurrentUser()
    }
    fetchCurrentUserQuery({ fetchPolicy: "network-only" }).then(res => {
      if (!res.data?.me?._id) throw new Error("Unauth")
      setTimeout(() => setCurrentUser(res.data?.me), 0)
      setPageRoute("MAIN")
    }).catch(() => {
      setCurrentUser()
      setCurrentToken()
    })
  }

  function fetchCurrentPodOrder() {
    if (!currentToken?.token) {
      return setCurrentUser()
    }
    var settings = {
      "url": "https://api-account.podorders.store/graphql",
      "method": "POST",
      "timeout": 0,
      "headers": {
        "authority": "api-account.podorders.store",
        "accept": "application/json, text/plain, */*",
        "accept-language": "vi-VN,vi;q=0.9,en-US;q=0.8,en;q=0.7",
        "authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImxlY2hpbmd1eWVuMDlAZ21haWwuY29tIiwicGFzc3dvcmQiOiJhYmMxMjMiLCJ2YWxpZCI6bnVsbH0.H35smLgIHOOp0l21kIfSFU0HzVFCa-h9pbhKSTDou40",
        "content-type": "application/json;charset=UTF-8",
        "origin": "https://account.podorders.store",
        "referer": "https://account.podorders.store/",
        "sec-ch-ua": "\"Google Chrome\";v=\"113\", \"Chromium\";v=\"113\", \"Not-A.Brand\";v=\"24\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"macOS\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36",
        "x-page": "1",
        "x-per-page": "20",
        "x-requested-with": "XMLHttpRequest"
      },
      "data": "{\"query\":\"query { cUser   { _id,identity,identity_label,email,role,groups,token,name,h, group   { _id,name }, permission   { module,title, access   { view,add,update,delete } },status,last_login,created_at,updated_at, customizer   { theme,sidebarCollapsed,navbarColor,navbarType,footerType,menuTheme,hideScrollToTop },total_credit,vip,max_hub,ship_by_seller,phone_number,sale_plan,facebook,skype,ffm_sku,ffm_sku_label, auth_docker   { auth_id,docker_id,groups,author, docker   { domain,server,status,label,plan,annually, plan_log   { plan,payment_at,expires_at } } },max_hub,plan,annually, plan_log   { plan,payment_at,expires_at },sku,sku_label,onos_email }}\"}",
    };

    $.ajax(settings).done(function (response) {
      console.log('response: ', response);
    });
  }

  function fetchCurrentUser() {
    switch (currentAppConfig?.mode) {
      case "PersonalizeItemClaw":
        fetchCurrentTask()
        break;
      case "SimpleItemClaw":
        fetchCurrentPodOrder()
        break;
      default:
        setCurrentUser()
        setCurrentToken()
        break;
    }
  }

  return <>
    {get(routers, pageRoute, <div className='d-flex justify-content-center align-items-center mt-5'>
      <div className='brand-logo' />
    </div>)}
  </>
}