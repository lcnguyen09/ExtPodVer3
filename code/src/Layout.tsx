import { ReactNode } from 'react'
import { Card, CardBody, CardHeader, CardTitle, Collapse, Spinner } from 'reactstrap'
import { Maximize2, Minimize2, ChevronsDown, ChevronsUp } from "react-feather"
import UiContext from './contexts/ui.context'
import { DEV_MODE } from './contexts/contants'

import NavUser from './components/NavUser'

export default function Layout({ children }: {
    children: ReactNode
}) {
    const {
        windowView,
        setWindowView,
        appLoading,
        token,
    } = UiContext.UseUIContext()

    return <Card className="h-100 card-action card-reload mb-0 d-flex flex-column" id="podorder-ext-app-main" animation="false">
        <CardHeader className={`nav p-1 d-flex flex-row justify-content-between bg-light ${windowView === "MIN" ? "cursor-pointer" : ""}`} id="podorder-ext-app-header" onClick={(e) => (e.target as Element).id === "podorder-ext-app-header" && windowView !== "MAX" ? setWindowView(windowView === "MIN" ? "NOMAL" : "MIN") : false}>
            <CardTitle className='mb-0'>
                <a href="https://task.onospod.com" target="_blank" rel="noreferrer" className='d-block'><div className='brand-logo' /></a>
            </CardTitle>
            <div className="actions d-flex justify-content-end align-items-center">
                {
                    DEV_MODE && <strong className='text-info text-decoration-underline'>DEV MODE</strong>
                }
                {
                    windowView === "MAX"
                        ? <Minimize2 cursor="pointer" className='mx-3' size={13} onClick={() => setWindowView("NOMAL")} />
                        : <Maximize2 cursor="pointer" className='mx-3' size={13} onClick={() => setWindowView("MAX")} />
                }
                {
                    windowView === "MIN" || windowView === null
                        ? <ChevronsUp cursor="pointer" className='ml-1' size={15} onClick={() => setWindowView("NOMAL")} />
                        : <ChevronsDown cursor="pointer" className='ml-1' size={15} onClick={() => setWindowView("MIN")} />
                }
            </div>
        </CardHeader>
        <Collapse id="podorder-ext-app-body" className='position-relative d-flex flex-column' isOpen={windowView !== "MIN"}>
            {/* {currentUser?._id && <NavDocker />} */}
            {
                appLoading && <div className='position-absolute w-100 h-100 top-0 bottom-0 start-0 end-0 d-flex justify-content-center align-items-center overlay-div'>
                    <Spinner color='primary' />
                </div>
            }
            <NavUser />
            <CardBody id="podorder-ext-app-body-card" className='p-1 mb-5'>
                {
                    token?.access_token === null || token?.access_token === undefined || windowView === null
                        ? <div className='d-flex justify-content-center align-items-center mt-5'>
                            <div className='brand-logo' />
                        </div>
                        : <>{children}</>
                }

            </CardBody>
        </Collapse>
    </Card>
}