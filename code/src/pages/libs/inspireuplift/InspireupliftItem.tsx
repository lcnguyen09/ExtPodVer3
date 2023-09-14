import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Alert, Button, Col, Input, Label, Row, Spinner, Table } from 'reactstrap';
import { PlusCircle, RefreshCw, Save, UploadCloud } from 'react-feather';
import UiContext from './../../../contexts/ui.context';
import { useItemsInfoLazyQuery } from '../../../graphql/graphql';
import Notification from './../../../components/Notification';
import BottomBar from './../../../components/BottomBar';
import $ from 'jquery';
import './test'
import {
    clone,
    filter,
    find,
    get,
    head,
    includes,
    last,
    map,
    remove,
    split,
    startsWith,
    trim,
    union,
    unionBy,
} from 'lodash';

export default function (Identifier: any) {
    const { setGraphqlForHub } = UiContext.UseUIContext();

    const [itemsInfoQuery] = useItemsInfoLazyQuery({ fetchPolicy: 'network-only' });

    const { currentDocker, currentToken } = UiContext.UseUIContext();

    const [site, setSite] = useState(window.location.host);
    const [pathname, setPathname] = useState(window.location.pathname);

    const [Loading, setLoading] = useState<boolean>(false);
    const [ErrorMsg, setErrorMsg] = useState('');
    const [SuccessMsg, setSuccessMsg] = useState('');

    const [itemId, setItemId] = useState<string>('IT-89470-13420');
    const [itemInfo, setItemInfo] = useState<any>();


    useEffect(() => {
        setLoading(false)
        // var script = document.createElement('script');
        // script.setAttribute('type', 'text/javascript');
        // script.setAttribute('src', "https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js");
        // document.getElementsByTagName("body")[0].appendChild(script);
        // var script2 = document.createElement('script');
        // script2.setAttribute('type', 'text/javascript');
        // script2.setAttribute('src', "https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js");
        // document.getElementsByTagName("body")[0].appendChild(script2);

        var script3 = document.createElement('script');
        script3.setAttribute('type', 'text/javascript');
        script3.innerHTML =  "function getWindow() {return window}"
        document.getElementsByTagName("body")[0].appendChild(script3);
    }, []);

    useEffect(() => {
        handleFillData()
    }, [itemInfo]);

    useEffect(() => {
        setSite(window.location.host);
    }, [window.location.host]);

    useEffect(() => {
        setPathname(window.location.pathname);
    }, [window.location.pathname, window.location.href]);

    const handleFillData = () => {
        // var initialData = (window as any)
        // console.log('initialData: ', initialData);

        try {
            // const titleElm =  ($(`input#product-title[name="title"]`) as any)[0]
            // titleElm.setAttribute("value", itemInfo?.name); 
            // titleElm.dispatchEvent(new Event("change", { bubbles: true }));
            // titleElm.dispatchEvent(new Event("blur", { bubbles: true }));
        } catch (error) {
            console.log(`%cCannot find name element`, 'color: red');
            console.log('error: ', error);
        }
        try {
            // const descriptionElm = get(window, 'tinyMCE', {}) as any
            console.log('(window as any): ', (window as any).tinyMCE);
            // console.log('(window as any).tinyMCE: ', (window as any).tinymce);
            // (window as any).tinymce.activeEditor.setContent(itemInfo?.description);
        } catch (error) {
            console.log(`%cCannot find description element`, 'color: red');
            console.log('error: ', error);
        }
    }

    const handleGetItemData = () => {
        return new Promise((resolve, reject) => {
            setGraphqlForHub().then(() => {
                itemsInfoQuery({
                    variables: {
                        identity: itemId
                    },
                    fetchPolicy: 'network-only',
                }).then((response) => {
                    setItemInfo(head(get(response, ['data', 'itemsInfo'])))
                    setLoading(false);
                })
            })

        });
    }

    return (
        <>
            <Notification ErrorMsg={ErrorMsg} SuccessMsg={SuccessMsg} Loading={Loading} />
            <h4 className='text-center'>Add item</h4>
            <div className='mt-2'>
                <div className='mb-3'>
                    <Label>Item ID: </Label>
                    <Input
                        type="text"
                        placeholder="IT-01234-56789"
                        className="bg-white text-black"
                        value={itemId || ""}
                        required={true}
                        onChange={e => setItemId(e.target.value)}
                        valid={false}
                        style={{ fontSize: "initial" }}
                    />
                </div>
                <div className='text-center'>
                    {itemInfo?.name}
                </div>
            </div>
            <BottomBar>
                <Button
                    size='xs'
                    color='success'
                    className='py-1 d-flex justify-content-center align-items-center'
                    onClick={() => handleGetItemData()}
                >
                    <PlusCircle size={14} /> <span style={{ marginLeft: '3px' }}>Add</span>
                </Button>
                <Button
                    size='xs'
                    color='success'
                    className='py-1 d-flex justify-content-center align-items-center'
                    onClick={() => handleFillData()}
                >
                    <PlusCircle size={14} /> <span style={{ marginLeft: '3px' }}>Fill data</span>
                </Button>
            </BottomBar>
        </>
    );
}
