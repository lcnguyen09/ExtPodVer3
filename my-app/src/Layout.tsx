import React from 'react'
import { Card, CardBody, CardHeader, CardTitle, Collapse, Spinner } from 'reactstrap'
import { Maximize2, Minimize2, ChevronDown, ChevronUp } from "react-feather"
import UiContext from './contexts/ui.context'

export const Layout: React.FC<any> = ({ children, ...props }) => {
    const { windowView, setWindowView } = UiContext.UseUIContext()
    const { appLoading } = UiContext.UseUIContext()

    return <Card className="h-100 card-action card-reload" id="podorder-ext-app-main" animation="false">
        <CardHeader className='d-flex justify-content-between' id="podorder-ext-app-header">
            <CardTitle className='mb-0'>
                <div className='brand-logo' />
            </CardTitle>
            <div className="actions d-flex justify-content-right align-items-center">
                {
                    windowView.isMax()
                        ? <Minimize2 cursor="pointer" className='mx-3' size={13} onClick={() => setWindowView("NOMAL")} />
                        : <Maximize2 cursor="pointer" className='mx-3' size={13} onClick={() => setWindowView("MAX")} />
                }
                {
                    windowView.isMin()
                        ? <ChevronUp cursor="pointer" className='ml-1' size={15} onClick={() => setWindowView("NOMAL")} />
                        : <ChevronDown cursor="pointer" className='ml-1' size={15} onClick={() => setWindowView("MIN")} />
                }
            </div>
        </CardHeader>
        <Collapse isOpen={!windowView.isMin()} className={windowView.isMax() ? " h-100" : ""}>
            <CardBody id="podorder-ext-app-body" className='position-relative'>
                {children}
                {
                    appLoading && <div className='position-absolute w-100 h-100 top-0 bottom-0 start-0 end-0 d-flex justify-content-center align-items-center overlay-div'>
                        <Spinner color='primary' />
                    </div>
                }
            </CardBody>
        </Collapse>
    </Card>
}
export default Layout