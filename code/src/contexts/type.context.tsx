import {
    Docker,
    User
} from "./../graphql/graphql"

export type WINDOW_VIEWS = "NOMAL"
    | "MAX"
    | "MIN"
export type PAGE_ROUTES = | "INIT"
    | "LOGIN"
    | "MAIN"

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
        type: "SET_PAGE_ROUTE"
        page: PAGE_ROUTES
    }
    | {
        type: "SET_CURRENT_USER"
        user: User | null
    }
    | {
        type: "SET_CURRENT_DOCKER"
        docker: Docker | null
    }