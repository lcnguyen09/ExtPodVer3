/* eslint-disable */
import { useEffect, useRef, useState } from 'react';
import { Button, Spinner, Table } from 'reactstrap';
import { DownloadCloud, RefreshCw, Save, UploadCloud } from 'react-feather';
import UiContext from './../../../contexts/ui.context';
import Notification from './../../../components/Notification';
import BottomBar from './../../../components/BottomBar';
import $ from 'jquery';
import { cloneDeep, filter, find, findIndex, get, head, last, map, set, toLower, trim, unionBy } from 'lodash';

var countError = 0;

export default function ({ Identifier, storeData }: any) {
	const {
		currentDocker,
		currentToken,
		templateId,
		urlRestApi,
		$x,
		fillTextInput,
		fillSelect,
		clickXButton,
		clickButton,
		sleep,
	} = UiContext.UseUIContext();

	const [pathname, setPathname] = useState(window.location.pathname);

	const [Loading, setLoading] = useState<boolean>(false);
	const [LoadingStatus, setLoadingStatus] = useState<boolean>(true);
	const [ErrorMsg, setErrorMsg] = useState('');
	const [SuccessMsg, setSuccessMsg] = useState('');
	const [onFillData, setOnFillData] = useState<boolean>(false);

	const [orders, setOrders] = useState<any[]>([]);
	const [order, setOrder] = useState<any>();
	const [ordersRaw, setOrdersRaw] = useState<any[]>([]);
	const [ordersSync, setOrdersSync] = useState<any[]>([]);
	const [currentQueryString, setCurrentQueryString] = useState<any>(window.location.search);

	useEffect(() => {
		handleStartCheckOrders();
	}, [orders]);

	function pushMsg(msg: String, type: String = 'black') {
		$('#ext-msg-box').prepend(`<p class="text-${type} d-flex align-items-center">${msg}</p>`);
	}
	function handleMapOrderData() {
		pushMsg('Start scan all orders', 'info');
		handleGetOrderByPage().then((orderTmp: any) => {
			setOrders(orderTmp);
		});
	}

	async function handleStartCheckOrders() {
		const thisOrder = find(orders, (o) => !o.checkStatus);
		if (!thisOrder) {
			pushMsg(
				`Map all DONE ${countError ? countError + ' error(s)' : 'all successfully'}.</strong>`,
				countError ? 'warning' : 'info'
			);
			return;
		}
		const thisOrderIndex = findIndex(orders, (o) => !o.checkStatus);
		const firstImage = get(thisOrder, ['transactions', 0, 'product', 'image_url_75x75'], '#');
		pushMsg(
			`<strong>${get(thisOrder, 'order_id', '')}:</strong> <img
            src=${firstImage}
            style="width: 32px; height: 32px; margin-left: 2px; margin-right: 2px;"
        /> <i> => start mapping.</i>`,
			'black'
		);
		await handleMapOldOrder(thisOrder)
			.then((response) => {
				pushMsg(`<strong>${get(thisOrder, 'order_id', '')}:</strong> <strong>=> Map DONE.</strong>`, 'success');
			})
			.catch(() => {
				countError++;
				pushMsg(
					`<strong>${get(thisOrder, 'order_id', '')}:</strong> <strong>=> Map ERROR(${countError}).</strong>`,
					'danger'
				);
			});

		const ordersState = cloneDeep(orders);
		set(ordersState, [thisOrderIndex, 'checkStatus'], true);
		setOrders(ordersState);
	}

	async function handleMapOldOrder(thisOrder: any) {
		const dataRequest = {
			order_id: get(thisOrder, 'order_id', ''),
			identifier: Identifier,
			fulfillment_note: get(thisOrder, ['notes', 'note_from_buyer'], ''),
			shipping_total: parseInt(get(thisOrder, ['payment', 'cost_breakdown', 'shipping_cost', 'value'], '')) / 100,
			discount_total: parseInt(get(thisOrder, ['payment', 'cost_breakdown', 'discount', 'value'], '')) / 100,
			total_tax: parseInt(get(thisOrder, ['payment', 'cost_breakdown', 'tax_cost', 'value'], '')) / 100,
			total_fee: 0,
			account_id: get(storeData, 'account_id', ''),
			account_name: get(storeData, 'account_name', ''),
			account_type: 'Etsy',
			shipping_info: {
				full_name: get(thisOrder, ['fulfillment', 'to_address', 'name'], ''),
				address_1: get(thisOrder, ['fulfillment', 'to_address', 'first_line'], ''),
				address_2: get(thisOrder, ['fulfillment', 'to_address', 'second_line'], ''),
				company: '',
				city: get(thisOrder, ['fulfillment', 'to_address', 'city'], ''),
				state: get(thisOrder, ['fulfillment', 'to_address', 'state'], ''),
				postcode: get(thisOrder, ['fulfillment', 'to_address', 'zip'], ''),
				country: get(thisOrder, ['fulfillment', 'to_address', 'country'], ''),
				email: get(thisOrder, ['fulfillment', 'to_address', 'email'], ''),
				phone: get(thisOrder, ['fulfillment', 'to_address', 'phone'], ''),
			},
			items: map(get(thisOrder, 'transactions', []), (transaction) => {
				return {
					name: get(transaction, ['product', 'title'], ''),
					product_id: get(transaction, ['listing_id'], ''),
					order_line_item_id: get(transaction, 'transaction_id', ''),
					variation_id: map(get(transaction, 'variations'), (variation) =>
						get(variation, 'variation_id')
					).join(';'),
					sku: get(transaction, ['listing_id'], ''),
					quantity: get(transaction, 'quantity', ''),
					price: parseInt(get(transaction, 'usd_price', '')) / 100,
					currency: 'USD',
					image: get(transaction, ['product', 'image_url_75x75'], '').replace('_75x75', '_1000x1000'),
					attributes: map(get(transaction, 'variations'), (variation) => {
						return {
							name: get(variation, 'property', ''),
							option: get(variation, 'value', ''),
						};
					}),
				};
			}),
			tracking: null,
		};

		return new Promise((resolve, reject) => {
			fetch(
				`https://www.etsy.com/api/v3/ajax/shop/${get(
					storeData,
					'account_id',
					''
				)}/shipments/by-order?order_ids%5B%5D=${get(thisOrder, 'order_id', '')}`,
				{
					referrer: 'https://www.etsy.com/your/orders/sold?ref=seller-platform-mcnav',
				}
			)
				.then((response) => response.json())
				.then((response) => {
					const ordersToShipments = get(response, 'ordersToShipments');
					const shipments = get(response, 'shipments');
					const ordersToShipment = head(
						find(ordersToShipments, (ordersToShipment, orderID) => {
							return orderID === get(thisOrder, 'order_id', '');
						})
					);
					const shipment = find(shipments, (shipment) => {
						return get(shipment, 'shipmentId') === ordersToShipment;
					});
					resolve(get(shipment, ['tracking', 'code']));
				})
				.catch((e) => {
					console.log('e: ', e);
					setLoading(false);
					reject([]);
				});
		}).then((tracking: any) => {
			dataRequest.tracking = tracking;
			return new Promise((resolve, reject) => {
				const settings = {
					method: 'POST',
					url: `${
						currentDocker?.domain ? `${urlRestApi}/order/map-by-address` : '/api/order/map-by-address'
					}`,
					data: dataRequest,
					timeout: 0,
					headers: {
						Authorization: `Bearer ${currentToken.token}`,
					},
				};
				$.ajax(settings)
					.done(function (response) {
						pushMsg(JSON.stringify(response.data), 'info');
						resolve(true);
					})
					.fail((response) => {
						pushMsg(get(response, ['responseJSON', 'error'], JSON.stringify(response)), 'warning');
						reject(false);
					});
			});
		});
	}

	function handleGetOrderByPage() {
		setLoading(true);
		return new Promise((resolve, reject) => {
			let ordersTmp: any = [];
			const handleGetOrderByPageFn = (page = 1) => {
				const limit = 50;
				const offset = (page - 1) * limit;
				fetch(
					`https://www.etsy.com/api/v3/ajax/bespoke/shop/${get(
						storeData,
						'account_id',
						''
					)}/mission-control/orders?filters[buyer_id]=all&filters[channel]=all&filters[completed_status]=all&filters[destination]=all&filters[ship_date]=all&filters[shipping_label_eligibility]=false&filters[shipping_label_status]=all&filters[has_buyer_notes]=false&filters[is_marked_as_gift]=false&filters[is_personalized]=false&filters[has_shipping_upgrade]=false&filters[order_state_id]=all&limit=50&offset=${offset}&search_terms=&sort_by=order_date&sort_order=desc&objects_enabled_for_normalization[order_state]=true`,
					{
						referrer: pathname.endsWith('/completed')
							? 'https://www.etsy.com/your/orders/sold/completed?ref=seller-platform-mcnav'
							: 'https://www.etsy.com/your/orders/sold?ref=seller-platform-mcnav',
					}
				)
					.then((response) => response.json())
					.then((response) => {
						const total = get(response, 'total_count', 0);
						const currentTotal = offset + get(response, 'orders', []).length;
						pushMsg(`Found ${currentTotal} / ${total} orders`, 'info');

						ordersTmp = [...ordersTmp, ...get(response, 'orders', [])];

						if (total < offset + limit) {
							setLoading(false);
							return resolve(ordersTmp);
						}

						setTimeout(() => {
							handleGetOrderByPageFn(page + 1);
						}, 500);
					})
					.catch((e) => {
						console.log('e: ', e);
						setLoading(false);
						reject([]);
					});
			};

			handleGetOrderByPageFn(1);
		});
	}

	return (
		<>
			<Notification ErrorMsg={ErrorMsg} SuccessMsg={SuccessMsg} Loading={Loading} />
			<h4 className="text-center">Map Old Order(s)</h4>
			<div className="mt-2">
				<div className="bg-light text-left" style={{ height: 300, overflowY: 'scroll' }} id="ext-msg-box"></div>
				{onFillData ? (
					<div
						style={{
							position: 'fixed',
							top: 0,
							bottom: 0,
							left: 0,
							right: 0,
							zIndex: '2147483647 !important',
							background: '#6c757d52',
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						<Spinner color="info" />
					</div>
				) : (
					false
				)}
			</div>
			<BottomBar>
				<Button
					size="xs"
					color="danger"
					className="py-1 d-flex justify-content-center align-items-center flex-column"
					onClick={() => {
						handleMapOrderData();
						setSuccessMsg('');
						setErrorMsg('');
					}}
				>
					<RefreshCw size={14} /> <span style={{ marginLeft: '3px' }}>Start remap old order(s)</span>
				</Button>
			</BottomBar>
		</>
	);
}
