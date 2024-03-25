export type TOKEN = {
    token?: string | null | undefined
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
        type: "SET_PAGE_ROUTE"
        page: PAGE_ROUTES
    }
    | {
        type: "SET_CURRENT_USER"
        user: CURRENT_USER | null | undefined
    }
    | {
        type: "SET_CURRENT_TOKEN"
        currentToken: TOKEN | null | undefined
    }
    | {
        type: "SET_CURRENT_DOCKER"
        currentDocker: DOCKER | null | undefined
    }
    | {
        type: "SET_CURRENT_SERVER"
        currentServer: String | null | undefined
    }
    | {
        type: "SET_TEMPLATE_ID"
        templateId: string | null | undefined
    }
    | {
        type: "SET_AUTO_PAGE"
        autoPage: boolean | null | undefined
    }
    | {
        type: "SET_EXTEND_SHIPPING_PRICE"
        extendShippingPrice: boolean | null | undefined
    }
    | {
        type: "SET_AUTO_SAVE"
        autoSave: boolean | null | undefined
    }
    | {
        type: "SET_URL_GRAPHQL"
        urlGraphql: string
    }
    | {
        type: "SET_URL_REST_API"
        urlRestApi: string
    }