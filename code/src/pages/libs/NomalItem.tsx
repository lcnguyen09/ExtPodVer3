import { useEffect, useState } from "react"
import { Alert, Button, Card, CardBody, CardHeader, Spinner } from "reactstrap";
import { Save } from "react-feather"
import { ApolloProvider } from '@apollo/client'
import { useApollo } from './../../contexts/apollo.client'
import UiContext from './../../contexts/ui.context'
import { useInfoLazyQuery } from "./../../graphql_podorder/graphql";
import $ from "jquery"
import { filter, get, head, map, split, trim, union } from "lodash";
import ItemInfoComponent from "./../../components/ItemInfo"


export default function NomalItem() {
    const { currentDocker } = UiContext.UseUIContext()
    const apolloClient = useApollo(currentDocker?.domain ? `https://api-${currentDocker?.domain}.${currentDocker?.server}/graphql` : null)
    const [infoQuery] = useInfoLazyQuery({ fetchPolicy: "network-only" })

    const [Loading, setLoading] = useState<boolean>(true)
    const [ErrorMsg, setErrorMsg] = useState("")
    const [SuccessMsg, setSuccessMsg] = useState("")

    const [ExtensionRule, setExtensionRule] = useState<any>({})
    const [__NEXT_DATA__, setNextData] = useState<any>({})
    const [__INITIAL_STATE__, setInitialState] = useState<any>({})
    const [ItemTitle, setItemTitle] = useState("")
    const [ItemImages, setItemImages] = useState<Array<string>>([])
    useEffect(() => {
        getRule()
        try {
            const nextData = $("body").attr("tmp___NEXT_DATA__")
            if (nextData) setNextData(JSON.parse(nextData))
        } catch (error) { }
        try {
            const initialStateTag = $("#__INITIAL_STATE__")[0].textContent
            if (initialStateTag) setInitialState(JSON.parse(initialStateTag))
        } catch (error) { }
    }, [])

    useEffect(() => {
        setItemTitle(getItemName())
    }, [ExtensionRule?.name, __INITIAL_STATE__?.product?.product?.title, __NEXT_DATA__?.props?.pageProps?.product?.title])

    useEffect(() => {
        setItemImages(getItemImages())
    }, [ExtensionRule?.images, __INITIAL_STATE__?.product?.product?.images, __NEXT_DATA__?.props?.pageProps?.product?.gallery])


    function getRule() {
        infoQuery({ fetchPolicy: "network-only" }).then(response => {
            setExtensionRule(response?.data?.info?.extension_rule)
            setLoading(false)
        })
    }

    function getItemName() {
        console.log(__NEXT_DATA__);
        return __INITIAL_STATE__?.product?.product?.title
            ? __INITIAL_STATE__?.product?.product?.title
            : __NEXT_DATA__?.props?.pageProps?.product?.title
                ? __NEXT_DATA__?.props?.pageProps?.product?.title
                : trim($(get(ExtensionRule, "name", "")).first().text())
    }

    function getImageFromSite(configRules: any, index: number) {
        const images: Array<string> = []
        filter(configRules, configRule => {
            $.each($(get(configRule, "block", "")).first().find(get(configRule, "loop", "")), (index, element) => {
                const imgAttrTmp = $(element).attr(get(configRule, "main_attr", "")) ? $(element).attr(get(configRule, "main_attr", "")).toString() : $(element).attr(get(configRule, "extra_attr", "")).toString()
                const imgUrl = head(split(imgAttrTmp, " "))
                if (imgUrl) {
                    images.push(imgUrl)
                }
            })
        })
        return images
    }

    function getItemImages() {
        return __INITIAL_STATE__?.product?.product?.images
            ? filter(map(__INITIAL_STATE__?.product?.product?.images, image => image?.src), imgSrc => imgSrc)
            : __NEXT_DATA__?.props?.pageProps?.product?.gallery
                ? filter(map(__NEXT_DATA__?.props?.pageProps?.product?.gallery, image => image?.src), imgSrc => imgSrc)
                : filter(union(getImageFromSite(get(ExtensionRule, "images", []), 0)), imgSrc => imgSrc)
    }


    return <ApolloProvider client={apolloClient}>
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
        <ItemInfoComponent title={ItemTitle} images={ItemImages} />
        <div className="position-absolute start-0 bottom-0 end-0 bg-white d-flex justify-content-end align-items-right p-2 border-top footer-action">
            <NomalItemSave />
        </div>
    </ApolloProvider>
}

function NomalItemSave() {
    const [infoQuery] = useInfoLazyQuery({ fetchPolicy: "network-only" })

    useEffect(() => {
        getRule()
    }, [])
    function getRule() {
        infoQuery({ fetchPolicy: "network-only" }).then(response => {
            console.log('response: ', response);
        })
    }
    return <Button size="xs" color="success" className="py-1 d-flex justify-content-center align-items-center" onClick={() => false}><Save size={14} /> <span style={{ marginLeft: "3px" }}>Save</span></Button>
}