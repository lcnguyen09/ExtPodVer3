export const DEV_MODE = chrome.storage === undefined

export const CONFIG_URL = "https://gist.githubusercontent.com/lcnguyen09/8e13773309c1bb9b260fb6629d3abf68/raw/pod-extension-config.json"

export const URL_TASK_GRAPHQL = DEV_MODE ? "http://localhost:8085/graphql" : "https://task.onospod.com/graphql"

export const URL_ACCOUNT_PODORDER = DEV_MODE ? "http://localhost:3201/api/v1/auth" : "https://api-account.podorders.store/api/v1/auth"
