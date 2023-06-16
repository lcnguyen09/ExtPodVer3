export type TOKEN = {
    access_token?: string
    refresh_token?: string
    token_type?: string
    expired_at?: string
    token?: string
}

export type CURRENT_USER = {
    _id: string
    email: string
    first_name: string
    last_name: string
    fullname: string
    docker?: [DOCKER]
}

export type DOCKER = {
    _id: string
    domain?: string
    label?: string
    server?: string
    sku?: string
}

export type WINDOW_VIEWS = "NOMAL"
    | "MAX"
    | "MIN"
    | null
export type PAGE_ROUTES = | "INIT"
    | "LOGIN"
    | "MAIN"
    | null

export type ACTION =
    | {
        type: "SET_INIT"
        appInit: boolean
    }
    | {
        type: "SET_LOADING"
        appLoading: boolean
    }
    | {
        type: "SET_APP_HIDE"
        appHide: boolean
    }
    | {
        type: "SET_WINDOW_VIEW"
        view: WINDOW_VIEWS
    }
    | {
        type: "SET_APP_CONFIG"
        appConfig: any
    }
    | {
        type: "SET_CURRENT_APP_CONFIG"
        currentAppConfig: any
    }
    | {
        type: "SET_PAGE_ROUTE"
        page: PAGE_ROUTES
    }
    | {
        type: "SET_CURRENT_USER"
        user: CURRENT_USER | null
    }
    | {
        type: "SET_CURRENT_TOKEN"
        currentToken: TOKEN | null
    }
    | {
        type: "SET_CURRENT_DOCKER"
        currentDocker: DOCKER | null
    }
    | {
        type: "SET_TEMPLATE_ID"
        templateId: string | null
    }
    | {
        type: "SET_URL_GRAPHQL"
        urlGraphql: string
    }