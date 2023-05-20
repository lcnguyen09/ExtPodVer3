import { Children, ReactNode, cloneElement, isValidElement, useEffect } from 'react'
import { Card, CardBody, CardHeader, CardTitle, Collapse, Spinner } from 'reactstrap'
import { Maximize2, Minimize2, ChevronsDown, ChevronsUp } from "react-feather"
import UiContext, { useStorage } from './contexts/ui.context'

import NavUser from './components/NavUser'

export default function Layout({ children }: {
    children: ReactNode
}) {
    const {
        windowView,
        setWindowView,
        appLoading,
        token,
        setToken
    } = UiContext.UseUIContext()
    const [accessToken] = useStorage("_pod_ext_access_token")
    const [refreshToken] = useStorage("_pod_ext_refresh_token")
    useEffect(() => {
        if (accessToken !== null) {
            setToken({
                access_token: accessToken,
                refresh_token: refreshToken
            })
        }
    }, [accessToken, refreshToken]) // eslint-disable-line

    const [windowMode] = useStorage("_pod_ext_mode")
    useEffect(() => {
        if (windowMode !== null) {
            setWindowView(windowMode)
        }
    }, [windowMode]) // eslint-disable-line

    return <Card className="h-100 card-action card-reload mb-0" id="podorder-ext-app-main" animation="false">
        <CardHeader className='nav p-1 d-flex flex-row justify-content-between' id="podorder-ext-app-header">
            <CardTitle className='mb-0'>
                <a href="https://task.onospod.com" target="_blank" rel="noreferrer" className='d-block'><div className='brand-logo' /></a>
            </CardTitle>
            <div className="actions d-flex justify-content-end align-items-center">
                {
                    windowView === "MAX"
                        ? <Minimize2 cursor="pointer" className='mx-3' size={13} onClick={() => setWindowView("NOMAL")} />
                        : <Maximize2 cursor="pointer" className='mx-3' size={13} onClick={() => setWindowView("MAX")} />
                }
                {
                    windowView === "MIN"
                        ? <ChevronsUp cursor="pointer" className='ml-1' size={15} onClick={() => setWindowView("NOMAL")} />
                        : <ChevronsDown cursor="pointer" className='ml-1' size={15} onClick={() => setWindowView("MIN")} />
                }
            </div>
        </CardHeader>
        <Collapse id="podorder-ext-app-body" className='position-relative h-100' isOpen={windowView !== "MIN"}>
            {/* {currentUser?._id && <NavDocker />} */}
            <NavUser />
            <CardBody>
                {
                    token?.access_token === null || token?.access_token === undefined ||
                        windowMode === null
                        ? <div className='d-flex justify-content-center align-items-center mt-5'>
                            <div className='brand-logo' />
                        </div>
                        : <>{
                            Children.map(children, child => {
                                if (isValidElement(child)) {
                                    const props = {
                                        token: token?.access_token,
                                        children: child.props?.children
                                    }
                                    return cloneElement(child, props);
                                }
                                return child;
                            })
                        }</>
                }
                {
                    appLoading && <div className='position-absolute w-100 h-100 top-0 bottom-0 start-0 end-0 d-flex justify-content-center align-items-center overlay-div'>
                        <Spinner color='primary' />
                    </div>
                }
            </CardBody>
        </Collapse>
    </Card>
}