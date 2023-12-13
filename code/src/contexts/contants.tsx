export const APP_MODE = process.env.REACT_APP_APP_MODE// ? 'production' : 'dev'
console.log(`%cAPP_MODE ===> %c${APP_MODE}`, 'color: cyan', 'color: red');

export const URL_AUTH_PODORDER = APP_MODE === 'dev' ? "http://localhost:3203/api/v1/auth" : "https://api-account.podorders.store/api/v1/auth"

export const URL_AUTH_SALEHUNTER = APP_MODE === 'dev' ? "http://localhost:3203/api/v1/auth" : "https://api-account.salehunter.io/api/v1/auth"

export const URL_ACCOUNT_GRAPHQL_PODORDER = APP_MODE === 'dev' ? "http://localhost:3203/graphql" : "https://api-account.podorders.store/graphql"

export const URL_ACCOUNT_GRAPHQL_SALEHUNTER = APP_MODE === 'dev' ? "http://localhost:3203/graphql" : "https://api-account.salehunter.io/graphql"


export const URL_GRAPHQL = (currentDocker: any) => APP_MODE === 'dev' ? "http://localhost:3003/graphql" : `https://api-${currentDocker?.domain}.${currentDocker?.server}/graphql`

export const URL_REST_API = (currentDocker: any) => APP_MODE === 'dev' ? "http://localhost:3003/api/v1" : `https://api-${currentDocker?.domain}.${currentDocker?.server}/api/v1`