import { map } from 'lodash';
import { Alert, Spinner } from 'reactstrap';

export default function Notification({
    Loading,
    ErrorMsg,
    SuccessMsg,
    WarningMsg,
}: {
    Loading: boolean;
    ErrorMsg?: any;
    SuccessMsg?: any;
    WarningMsg?: any;
}) {
    return (
        <>
            {WarningMsg && typeof WarningMsg === 'string' ? (
                <Alert color='warning' className='text-center mt-1 p-2'>
                    <i>{WarningMsg}.</i>
                </Alert>
            ) : (
                false
            )}
            {WarningMsg && Array.isArray(WarningMsg)
                ? map(WarningMsg, (msg, index) => {
                    return <Alert key={`warning-${index}`} color='warning' className='text-center mt-1 p-2'>
                        <i>{msg}.</i>
                    </Alert>;
                })
                : false}

            {ErrorMsg && typeof ErrorMsg === 'string' ? (
                <Alert color='danger' className='text-center mt-1 p-2'>
                    <strong>*Error:</strong> <i>{ErrorMsg}.</i>
                </Alert>
            ) : (
                false
            )}
            {ErrorMsg && Array.isArray(ErrorMsg)
                ? map(ErrorMsg, (msg, index) => {
                    return <Alert key={`danger-${index}`} color='danger' className='text-center mt-1 p-2'>
                        <strong>*Error:</strong> <i>{msg}.</i>
                    </Alert>;
                })
                : false}


            {SuccessMsg && typeof SuccessMsg === 'string' ? (
                <Alert color='success' className='text-center mt-1 p-2'>
                    <i>{SuccessMsg}.</i>
                </Alert>
            ) : (
                false
            )}
            {SuccessMsg && Array.isArray(SuccessMsg)
                ? map(SuccessMsg, (msg, index) => {
                    return <Alert key={`success-${index}`} color='success' className='text-center mt-1 p-2'>
                        <i>{msg}.</i>
                    </Alert>;
                })
                : false}

            {Loading && (
                <div className='position-absolute w-100 h-100 top-0 bottom-0 start-0 end-0 d-flex justify-content-center align-items-center overlay-div'>
                    <Spinner color='primary' />
                </div>
            )}
        </>
    );
}
