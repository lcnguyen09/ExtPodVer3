import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Alert, Button, Col, Row, Spinner, Table } from 'reactstrap';
import { RefreshCw, Save, UploadCloud } from 'react-feather';
import UiContext from './../../contexts/ui.context';
import { useInfoLazyQuery } from '../../graphql/graphql';
import Notification from './../../components/Notification';
import $ from 'jquery';
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

const Identifier = 'Inspireuplift.com';

export default function Inspireuplift() {
	const [infoQuery] = useInfoLazyQuery({ fetchPolicy: 'network-only' });

	const { currentDocker, currentToken, templateId } = UiContext.UseUIContext();

	const [site, setSite] = useState(window.location.host);
	const [pathname, setPathname] = useState(window.location.pathname);

	const [Loading, setLoading] = useState<boolean>(true);
	const [LoadingStatus, setLoadingStatus] = useState<boolean>(true);
	const [ErrorMsg, setErrorMsg] = useState('');
	const [SuccessMsg, setSuccessMsg] = useState('');

	const [orders, setOrders] = useState<any[]>([]);
	const [ordersSync, setOrdersSync] = useState<any[]>([]);

	let PrevOrder = [];

	useEffect(() => {
		setSite(window.location.host);
	}, [window.location.host]);

	useEffect(() => {
		setPathname(window.location.pathname);
	}, [window.location.pathname, window.location.href]);

	useEffect(() => {
		handleGetOrderData();
	}, []);

	useEffect(() => {
		if (currentDocker?.domain && orders && orders.length) {
			handleGetOrderSync();
		}
	}, [currentDocker?.domain, orders]);

	function isListting() {
		return pathname === '/order/list';
	}

	function isDetail() {
		return pathname.startsWith('/order/view');
	}

	function handleGetOrderData() {
		new Promise((resolve, reject) => {
			if (isDetail()) {
				const id = last(window.location.pathname.split('/'));
				return fetch(`https://sellercentral-api.inspireuplift.com/api/v1/seller/orders/${id}?is_seller=true`, {
					headers: {
						accept: 'application/json',
						'accept-language': 'en-US,en;q=0.9',
						'sec-ch-ua': '"Chromium";v="116", "Not)A;Brand";v="24", "Google Chrome";v="116"',
						'sec-ch-ua-mobile': '?0',
						'sec-ch-ua-platform': '"Windows"',
						'sec-fetch-dest': 'empty',
						'sec-fetch-mode': 'cors',
						'sec-fetch-site': 'same-site',
					},
					referrer: 'https://sellercentral.inspireuplift.com/',
					referrerPolicy: 'strict-origin-when-cross-origin',
					body: null,
					method: 'GET',
					mode: 'cors',
					credentials: 'include',
				})
					.then((response) => response.json())
					.then((response) => {
						setLoading(false);
						resolve(
							setOrders([
								{
									...get(response, ['data'], {}),
									id: id,
								},
							])
						);
					});
			}

			const s = new URLSearchParams(window.location.search);
			console.log('window.location.search: ', window.location.search);
			const page = s.get('page') || '1';
			let search = s.get('search') || '';
			if (search) {
				search = `&search=${search}`;
			}
			let status = s.get('type') || '';
			switch (status) {
				case 'unfulfilled':
					status = `&status=0`;
					break;
				case 'fulfilled':
					status = `&status=1`;
					break;
				case 'partially-refunded':
					status = `&status=4`;
					break;
				case 'refunded':
					status = `&status=3`;
					break;
				case 'hold':
					status = `&status=9`;
					break;
				case 'dispute':
					status = `&status=10`;
					break;
				case 'approved':
					status = `&balance_status=approved`;
					break;
				case 'pending':
					status = `&balance_status=pending`;
					break;
				default:
					status = '';
					break;
			}
			fetch(
				`https://sellercentral-api.inspireuplift.com/api/v1/seller/orders?is_seller=true&page=${page}${search}${status}`,
				{
					headers: {
						accept: 'application/json',
						'accept-language': 'en-US,en;q=0.9',
						'sec-ch-ua': '"Chromium";v="116", "Not)A;Brand";v="24", "Google Chrome";v="116"',
						'sec-ch-ua-mobile': '?0',
						'sec-ch-ua-platform': '"Windows"',
						'sec-fetch-dest': 'empty',
						'sec-fetch-mode': 'cors',
						'sec-fetch-site': 'same-site',
					},
					referrer: 'https://sellercentral.inspireuplift.com/',
					referrerPolicy: 'strict-origin-when-cross-origin',
					body: null,
					method: 'GET',
					mode: 'cors',
					credentials: 'include',
				}
			)
				.then((response) => response.json())
				.then((response) => {
					setLoading(false);
					resolve(setOrders(get(response, ['data', 'data'], [])));
				});
		});
	}

	function handleGetOrderSync() {
		setLoadingStatus(false);
		$.ajax({
			method: 'GET',
			url: `https://api-${currentDocker?.domain}.${currentDocker?.server}/api/v1/order/orders?${map(
				orders,
				(o) => `external_numbers[]=${get(o, 'order_number', '')}`
			).join('&')}&identifier=${Identifier}`,
			headers: {
				Authorization: `Bearer ${currentToken.token}`,
			},
		})
			.done(function (response) {
				const orderData = get(response, ['data'], '');
				setLoadingStatus(false);
				setOrdersSync(orderData);
			})
			.fail((e) => {
				setLoadingStatus(false);
			});
	}

	function handleSaveOrder(order = null) {
		let ordersForSync = filter(orders, (o) => o.checked);
		if (order) {
			ordersForSync = [order];
		}
		setLoading(true);
		Promise.all(
			map(ordersForSync, (order) => {
				let orderData = {};
				return fetch(
					`https://sellercentral-api.inspireuplift.com/api/v1/seller/orders/${get(order, 'id', '')}?is_seller=true`,
					{
						headers: {
							accept: 'application/json',
							'accept-language': 'en-US,en;q=0.9',
							'sec-ch-ua': '"Chromium";v="116", "Not)A;Brand";v="24", "Google Chrome";v="116"',
							'sec-ch-ua-mobile': '?0',
							'sec-ch-ua-platform': '"Windows"',
							'sec-fetch-dest': 'empty',
							'sec-fetch-mode': 'cors',
							'sec-fetch-site': 'same-site',
						},
						referrer: 'https://sellercentral.inspireuplift.com/',
						referrerPolicy: 'strict-origin-when-cross-origin',
						body: null,
						method: 'GET',
						mode: 'cors',
						credentials: 'include',
					}
				)
					.then((response) => response.json())
					.then(async (data) => {
						orderData = get(data, 'data', {});
						let items = map(get(orderData, 'line_items', []), (li) => {
							return {
								itemID: get(li, 'product_id', ''),
								itemName: get(li, 'name', ''),
							};
						});
						items = unionBy(items, 'itemID');
						return await Promise.all(
							map(items, (item) => {
								const itemID = item?.itemID;
								const itemName = item?.itemName;
								if (!itemID || !itemName) {
									setErrorMsg('Cannot find item, try again');
									throw 'Cannot find item, try again';
								}
								return fetch(
									`https://sellercentral-api.inspireuplift.com/api/v1/seller/marketplace/products/list?is_seller=true&search=${itemName}`,
									{
										headers: {
											accept: 'application/json',
											'accept-language': 'en-US,en;q=0.9',
											'sec-ch-ua': '"Chromium";v="116", "Not)A;Brand";v="24", "Google Chrome";v="116"',
											'sec-ch-ua-mobile': '?0',
											'sec-ch-ua-platform': '"Windows"',
											'sec-fetch-dest': 'empty',
											'sec-fetch-mode': 'cors',
											'sec-fetch-site': 'same-site',
										},
										referrer: 'https://sellercentral.inspireuplift.com/',
										referrerPolicy: 'strict-origin-when-cross-origin',
										body: null,
										method: 'GET',
										mode: 'cors',
										credentials: 'include',
									}
								)
									.then((response) => response.json())
									.then((response) => {
										const itemInfo = find(get(response, ['data', 'data'], []), (itemInfo) => {
											return get(itemInfo, 'product_id') === itemID;
										});
										return fetch(
											`https://sellercentral-api.inspireuplift.com/api/v1/seller/marketplace/products/${get(
												itemInfo,
												'id',
												''
											)}?is_seller=true`,
											{
												headers: {
													accept: 'application/json',
													'accept-language': 'en-US,en;q=0.9',
													'sec-ch-ua': '"Chromium";v="116", "Not)A;Brand";v="24", "Google Chrome";v="116"',
													'sec-ch-ua-mobile': '?0',
													'sec-ch-ua-platform': '"Windows"',
													'sec-fetch-dest': 'empty',
													'sec-fetch-mode': 'cors',
													'sec-fetch-site': 'same-site',
												},
												referrer: 'https://sellercentral.inspireuplift.com/',
												referrerPolicy: 'strict-origin-when-cross-origin',
												body: null,
												method: 'GET',
												mode: 'cors',
												credentials: 'include',
											}
										).then((response) => response.json());
									});
							})
						);
					})
					.then((items) => {
						const orderDataForSync = {
							order_id: get(orderData, 'order_number', ''),
							identifier: Identifier,
							fulfillment_note: get(orderData, 'note', ''),
							shipping_total: get(orderData, ['payment_info', 'shipping'], ''),
							total_tax: get(orderData, ['payment_info', 'tax'], ''),
							account_id: '',
							account_name: '',
							shipping_info: {
								full_name: get(orderData, ['contact_info', 'name'], ''),
								address_1: get(orderData, ['contact_info', 'shipping_address', 'address1'], ''),
								address_2: get(orderData, ['contact_info', 'shipping_address', 'address2'], ''),
								company: '',
								city: get(orderData, ['contact_info', 'shipping_address', 'city'], ''),
								state: get(orderData, ['contact_info', 'shipping_address', 'province'], ''),
								postcode: get(orderData, ['contact_info', 'shipping_address', 'zip'], ''),
								country: get(orderData, ['contact_info', 'shipping_address', 'country_code'], ''),
								email: get(orderData, ['contact_info', 'email'], ''),
								phone: get(orderData, ['contact_info', 'shipping_address', 'phone'], ''),
							},
							items: map(get(orderData, 'line_items', []), (li) => {
								const itemData = find(items, (item) => get(item, 'product_id') === get(li, 'product_id', ''));
								const variants = find(
									get(itemData, 'variants', []),
									(va) => get(va, 'id') === get(li, 'variant_id', '')
								);
								return {
									name: get(li, 'name', ''),
									product_id: get(li, 'product_id', ''),
									sku: get(li, 'sku', ''),
									quantity: get(li, 'quantity', ''),
									price: get(li, 'price_per_item', ''),
									currency: 'USD',
									image: get(head(get(li, 'media', [])), 'url', ''),
									attributes: map(get(variants, 'attributes', []), (va) => {
										return {
											name: get(va, 'code', ''),
											option: get(va, 'text', ''),
										};
									}),
								};
							}),
						};
						return new Promise((resolve, reject) => {
							const settings = {
								method: 'POST',
								url: `${
									currentDocker?.domain
										? `https://api-${currentDocker?.domain}.${currentDocker?.server}/api/v1/order/create`
										: '/api/order/create'
								}`,
								data: orderDataForSync,
								timeout: 0,
								headers: {
									Authorization: `Bearer ${currentToken.token}`,
								},
							};
							$.ajax(settings)
								.done(function (response) {
									setSuccessMsg('Success');
									setErrorMsg('');
									resolve(true);
								})
								.fail((response) => {
									setSuccessMsg('');
									setErrorMsg(response.responseJSON.error);
									resolve(true);
								});
						});
					});
			})
		).then(() => {
			setLoading(false);
			handleGetOrderSync();
		});
	}

	return (
		<>
			<Notification ErrorMsg={ErrorMsg} SuccessMsg={SuccessMsg} Loading={Loading} />
			<h4 className='text-center'>Order list</h4>
			<div className='mt-2'>
				<Table responsive>
					<thead>
						<tr>
							<td>
								<input
									type='checkbox'
									checked={!find(orders, (order) => !order.checked)}
									value='checkall'
									onChange={(e) => setOrders(map(orders, (order) => ({ ...order, checked: e.target.checked })))}
								/>
							</td>
							<td>#</td>
							<td className='text-center'>Status</td>
							<td className='text-center'>Action</td>
						</tr>
					</thead>
					<tbody>
						{map(orders, (order) => {
							const orderSyns = find(
								ordersSync,
								(oS) => String(oS.external_number) === String(get(order, 'order_number', ''))
							);
							let color = 'info';
							switch (orderSyns?.status) {
								case 'Pending':
									color = 'info';
									break;
								case 'Processing':
									color = 'warning';
									break;
								case 'In Design':
								case 'In Production':
									color = 'primary';
									break;
								case 'Fulfilled':
									color = 'success';
									break;
								case 'Cancelled':
									color = 'danger';
									break;
								case 'Refunded':
									color = 'danger';
									break;
								case 'Completed':
									color = 'success';
									break;
								default:
							}
							return (
								<tr>
									<td>
										<input
											type='checkbox'
											checked={order.checked}
											value={get(order, 'order_number', '')}
											onChange={() =>
												setOrders(
													map(orders, (o) =>
														order.order_number === o.order_number ? { ...o, checked: !order.checked } : o
													)
												)
											}
										/>
									</td>
									<td>
										<strong
											className='cursor-pointer'
											onClick={() =>
												setOrders(
													map(orders, (o) =>
														order.order_number === o.order_number ? { ...o, checked: !order.checked } : o
													)
												)
											}
										>
											{get(order, 'order_number', '')}-{get(order, 'seller_order_number', '')}
										</strong>
									</td>
									<td className='text-center'>
										{LoadingStatus ? (
											<Spinner />
										) : (
											<span className={`bg-${color} rounded px-1 text-light`}>{get(orderSyns, 'status', 'New')}</span>
										)}
									</td>
									<td className='text-center'>
										{orderSyns ? (
											false
										) : (
											<Button
												size='sm'
												color='success'
												className=''
												onClick={() => {
													handleSaveOrder(order);
												}}
												disabled={!currentDocker?.domain}
											>
												<UploadCloud size={14} />
											</Button>
										)}
									</td>
								</tr>
							);
						})}
					</tbody>
				</Table>
			</div>
			<div className='position-absolute start-0 bottom-0 end-0 bg-white d-flex justify-content-end align-items-right p-2 border-top footer-action'>
				<Button
					size='xs'
					color='primary'
					className='py-1 d-flex justify-content-center align-items-center'
					onClick={() => handleGetOrderData()}
				>
					<RefreshCw size={14} /> <span style={{ marginLeft: '3px' }}>Reload order data</span>
				</Button>
				<Button
					size='xs'
					color='success'
					className='py-1 d-flex justify-content-center align-items-center'
					onClick={() => handleSaveOrder()}
					disabled={!currentDocker?.domain || !find(orders, (order) => order.checked)}
				>
					<UploadCloud size={14} /> <span style={{ marginLeft: '3px' }}>Sync checked orders</span>
				</Button>
			</div>
		</>
	);
}
