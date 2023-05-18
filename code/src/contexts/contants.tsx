export const DEV_MODE = false

export const URL_LOGIN_DEV = "http://localhost:3201/api/v1/auth"
export const URL_GRAPHQL_ACCOUNT_DEV = "http://localhost:3201"
export const URL_GRAPHQL_DEV = "http://localhost:3201"

export const URL_LOGIN_PRODUCTION = "https://api-account.podorders.store/api/v1/auth"
export const URL_GRAPHQL_ACCOUNT_PRODUCTION = "https://api-account.podorders.store/graphql"
export const URL_GRAPHQL_PRODUCTION = "https://api-account.podorders.store/graphql"

export const URL_LOGIN = DEV_MODE ? URL_LOGIN_DEV : URL_LOGIN_PRODUCTION
export const URL_GRAPHQL_ACCOUNT = DEV_MODE ? URL_GRAPHQL_ACCOUNT_DEV : URL_GRAPHQL_ACCOUNT_PRODUCTION
export const URL_GRAPHQL = DEV_MODE ? URL_GRAPHQL_DEV : URL_GRAPHQL_PRODUCTION