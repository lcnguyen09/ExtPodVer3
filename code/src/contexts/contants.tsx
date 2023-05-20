export const DEV_MODE = chrome.storage === undefined

export const URL_GRAPHQL_DEV = "http://localhost:8085/graphql"

export const URL_GRAPHQL_PRODUCTION = "https://task.onospod.com/graphql"

export const URL_GRAPHQL = DEV_MODE ? URL_GRAPHQL_DEV : URL_GRAPHQL_PRODUCTION