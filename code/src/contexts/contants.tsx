export const APP_MODE = process.env.REACT_APP_APP_MODE// ? 'production' : 'dev'
console.log(`%cAPP_MODE ===> %c${APP_MODE}`, 'color: cyan', 'color: red');

export const URL_ACCOUNT_PODORDER = APP_MODE === 'dev' ? "http://localhost:3201/api/v1/auth" : "https://api-account.podorders.store/api/v1/auth"

export const URL_ACCOUNT_GRAPHQL = APP_MODE === 'dev' ? "http://localhost:3201/graphql" : "https://api-account.podorders.store/graphql"


export const URL_GRAPHQL = (currentDocker: any) => APP_MODE === 'dev' ? "http://localhost:3001/graphql" : `https://api-${currentDocker?.domain}.${currentDocker?.server}/graphql`

export const URL_REST_API = (currentDocker: any) => APP_MODE === 'dev' ? "http://localhost:3001/api/v1" : `https://api-${currentDocker?.domain}.${currentDocker?.server}/api/v1`