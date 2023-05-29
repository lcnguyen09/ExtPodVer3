export type TOKEN = {
    access_token?: String
    refresh_token?: String
    token_type?: String
    expired_at?: String
    token?: String
}

export type CURRENT_USER = {
    _id: String
    email: String
    first_name: String
    last_name: String
    fullname: String
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
        type: "SET_LOADING"
        appLoading: boolean
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
        docker: Docker | null
    }