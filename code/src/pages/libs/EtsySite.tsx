import { useEffect, useState } from "react"
import { chunk, filter, find, fromPairs, get, head, keyBy, last, map, set, sortBy, split, startsWith } from "lodash";
import $ from "jquery"
import { Alert, Badge, Button, Card, CardBody, CardHeader, Col, FormGroup, Input, Label, NavLink, Row, Spinner, Table } from "reactstrap";
import { ChevronDown, Save } from "react-feather"
import Notification from "./../../components/Notification"
import BottomBar from './../../components/BottomBar';
// import EtsyNewOrder from "../../data/etsy_new_order.json"
// import EtsyOldOrder from "../../data/etsy_old_order.json"

// https://www.etsy.com/your/orders/sold?ref=seller-platform-mcnav
export default function EtsySite() {
    const [Loading, setLoading] = useState<boolean>(true)
    const [CheckAll, setCheckAll] = useState<boolean>(false)
    const [CheckOrder, setCheckOrder] = useState<any>({})
    const [ErrorMsg, setErrorMsg] = useState("")
    const [SuccessMsg, setSuccessMsg] = useState("")
    // const [FullOrderData, setFullOrderData] = useState<any>({})
    const [Orders, setOrders] = useState<any>([])

    useEffect(() => {
        _orderFetch()
    }, [])

    useEffect(() => {
    }, [CheckAll])

    useEffect(() => {
    }, [])

    function _orderFetch() {
        // setTimeout(() => {
        //     // setFullOrderData(EtsyOldOrder)
        //     setOrders(EtsyOldOrder?.orders)
        //     setCheckOrder(
        //         fromPairs(
        //             map(EtsyOldOrder?.orders, order => {
        //                 return [order.order_id, false]
        //             })
        //         )
        //     )
        //     setLoading(false)
        // }, 500)
    }


    function handleSubmit() {
        setLoading(true)
        setErrorMsg("")
        setSuccessMsg("")
    }


    return <div>
        <Notification ErrorMsg={ErrorMsg} SuccessMsg={SuccessMsg} Loading={Loading} />
        <Card className="mt-3 mb-3">
            <CardHeader><strong>Orders</strong></CardHeader>
            <CardBody className="p-0">
                <Table striped className="mb-0">
                    <thead>
                        <tr>
                            <th style={{ width: "32px" }} className="align-items-center">
                                <Input
                                    id="checkAll"
                                    type="checkbox"
                                    value="checkAll"
                                    onChange={e => {
                                        setCheckAll(e.target.checked)
                                        setCheckOrder(
                                            fromPairs(
                                                map(Orders, order => {
                                                    return [order.order_id, e.target.checked]
                                                })
                                            )
                                        )

                                    }}
                                    checked={CheckAll}
                                />
                            </th>
                            <th>#ID</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            map(Orders, (order, index) => {
                                return <tr key={order.order_id}>
                                    <td className="align-items-center">
                                        <Input
                                            id={`check-${order.order_id}`}
                                            type="checkbox"
                                            value={`check-${order.order_id}`}
                                            onChange={e => {
                                                setCheckOrder(
                                                    fromPairs(
                                                        map(Orders, o => {
                                                            return [o.order_id, o.order_id === order.order_id ? e.target.checked : CheckOrder[o.order_id]]
                                                        })
                                                    )
                                                )
                                            }}
                                            checked={CheckOrder[order.order_id]}
                                        />
                                    </td>
                                    <td>#{order.order_id}</td>
                                    <td>
                                        <Badge className="bg-primary">
                                            New
                                        </Badge>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </Table>

            </CardBody>
        </Card>
        <BottomBar>
            <Button size="xs" color="success" className="py-1 d-flex justify-content-center align-items-center" onClick={handleSubmit}><Save size={14} /> <span style={{ marginLeft: "3px" }}>Sync orders</span></Button>
        </BottomBar>
    </div>
}