import { ReactNode, useEffect } from 'react';
import { Card, CardBody, CardHeader, CardTitle, Spinner } from 'reactstrap';
import { Maximize2, Minimize2, ChevronsDown, ChevronsUp, RotateCw } from 'react-feather';
import UiContext from './contexts/ui.context';
import NavUser from './components/NavUser';
import $ from 'jquery';
import { filter, find } from 'lodash';

export default function Layout({ children }: { children: ReactNode }) {
    const {
        appLoading,
        setAppLoading,
        appHide,
        windowView,
        setWindowView,
        currentToken,
        currentUser,
        currentDocker,
        setCurrentDocker,
        setGraphqlForHub,
        setUrlRestApi,
    } = UiContext.UseUIContext();

    useEffect(() => {
        filter(
            filter(
                $('*'),
                (elm) => parseInt($(elm).css('z-index')) > 2147483600 && !$(elm).parents('#podorder-ext-app').length
            ),
            (elm) => $(elm).css('z-index', 2147483500)
        );
    }, [window.location.host]);

    return (
        <>
            <Card
                className={`h-100 card-action card-reload mb-0 ${appHide ? 'd-none' : 'd-flex'} flex-column`}
                id='podorder-ext-app-main'
                animation='false'
            >
                <CardHeader
                    className={`nav p-1 d-flex flex-row justify-content-between bg-light ${windowView === 'MIN' ? 'cursor-pointer' : ''
                        }`}
                    id='podorder-ext-app-header'
                    onClick={(e) =>
                        (e.target as Element).id === 'podorder-ext-app-header' && windowView !== 'MAX'
                            ? setWindowView(windowView === 'MIN' ? 'NOMAL' : 'MIN')
                            : false
                    }
                >
                    <CardTitle className='mb-0 d-flex align-items-center'>
                        <a href='https://account.podorders.store' target='_blank' rel='noreferrer' className='d-block'>
                            <div className='brand-logo' />
                        </a>
                        <span className='ml-1 p-2'>v3.4.2</span>
                    </CardTitle>
                    <div className='actions d-flex justify-content-end align-items-center'>
                        <RotateCw cursor='pointer' size={13} onClick={() => {
                            setAppLoading(true)
                            window.postMessage(
                                {
                                    action: 'reLoadExt'
                                },
                                '*'
                            )
                        }}/>
                        {windowView === 'MAX' ? (
                            <Minimize2 cursor='pointer' className='mx-3' size={13} onClick={() => setWindowView('NOMAL')} />
                        ) : (
                            <Maximize2 cursor='pointer' className='mx-3' size={13} onClick={() => setWindowView('MAX')} />
                        )}
                        {windowView === 'MIN' || !windowView ? (
                            <ChevronsUp cursor='pointer' className='ml-1' size={15} onClick={() => setWindowView('NOMAL')} />
                        ) : (
                            <ChevronsDown cursor='pointer' className='ml-1' size={15} onClick={() => setWindowView('MIN')} />
                        )}
                    </div>
                </CardHeader>
                <CardBody id='podorder-ext-app-body' className='p-0 position-relative'>
                    {appLoading && (
                        <div className='position-absolute w-100 h-100 top-0 bottom-0 start-0 end-0 d-flex justify-content-center align-items-center overlay-div'>
                            <Spinner color='primary' />
                        </div>
                    )}
                    <NavUser />
                    <div id='podorder-ext-app-body-card' className='p-1'>
                        {windowView === null ? (
                            <div className='d-flex justify-content-center align-items-center mt-5'>
                                <div className='brand-logo' />
                            </div>
                        ) : (
                            <>{children}</>
                        )}
                        {!currentDocker?._id && currentToken?.token && (
                            <div className='position-absolute w-100 h-100 top-0 bottom-0 start-0 end-0 d-flex justify-content-center align-items-center overlay-div overlay-div-write text-danger'>
                                Pick your hub first
                            </div>
                        )}
                    </div>
                </CardBody>
            </Card>
        </>
    );
}
