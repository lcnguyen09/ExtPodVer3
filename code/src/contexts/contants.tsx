export const DEV_MODE = chrome.storage === undefined && false

export const URL_ACCOUNT_PODORDER = DEV_MODE ? "http://localhost:3201/api/v1/auth" : "https://api-account.podorders.store/api/v1/auth"

export const URL_ACCOUNT_GRAPHQL = DEV_MODE ? "http://localhost:3201/graphql" : "https://api-account.podorders.store/graphql"
