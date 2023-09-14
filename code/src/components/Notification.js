import { Alert, Spinner } from "reactstrap";

export default function Notification({Loading, ErrorMsg, SuccessMsg}) {
    return <>
        {
            ErrorMsg && <Alert color="danger" className="text-center mt-1 p-2"><strong>*Error:</strong> <i>{ErrorMsg}.</i></Alert>
        }
        {
            SuccessMsg && <Alert color="success" className="text-center mt-1 p-2"><i>{SuccessMsg}.</i></Alert>
        }
        {
            Loading && <div className='position-absolute w-100 h-100 top-0 bottom-0 start-0 end-0 d-flex justify-content-center align-items-center overlay-div'>
                <Spinner color='primary' />
            </div>
        }
    </>
}