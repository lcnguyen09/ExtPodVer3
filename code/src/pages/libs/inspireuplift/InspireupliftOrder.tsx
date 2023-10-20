import { useEffect, useState } from 'react';
import { Button, Spinner, Table } from 'reactstrap';
import { RefreshCw, UploadCloud } from 'react-feather';
import UiContext from './../../../contexts/ui.context';
import Notification from './../../../components/Notification';
import BottomBar from './../../../components/BottomBar';
import $ from 'jquery';
import { filter, find, findIndex, get, head, last, map, unionBy } from 'lodash';

export default function ({ Identifier }: any) {
	const { currentDocker, currentToken, templateId, urlRestApi, $x } = UiContext.UseUIContext();

	const [pathname, setPathname] = useState(window.location.pathname);

	const [Loading, setLoading] = useState<boolean>(true);
	const [LoadingStatus, setLoadingStatus] = useState<boolean>(true);
	const [ErrorMsg, setErrorMsg] = useState('');
	const [SuccessMsg, setSuccessMsg] = useState('');

	const [orders, setOrders] = useState<any[]>([]);
	const [ordersSync, setOrdersSync] = useState<any[]>([]);

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
		setLoading(true);
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
				})
				.catch((e) => {
					console.log('e: ', e);
					setLoading(false);
					reject([]);
				});
		});
	}

	function handleGetOrderSync() {
		setLoadingStatus(false);
		$.ajax({
			method: 'GET',
			url: `${urlRestApi}/order/orders?${map(orders, (o) => `external_numbers[]=${get(o, 'order_number', '')}`).join(
				'&'
			)}&identifier=${Identifier}`,
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
		Promise.allSettled(
			map(ordersForSync, (order) => {
				return (
					fetch(
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
						.then((data) => {
							const orderData = get(data, 'data', {});
							if (!get(orderData, 'order_number') || !get(orderData, 'seller_order_number')) {
								throw 'Cannot find order data. Try again.';
							}
							return fetch('https://sellercentral-api.inspireuplift.com/api/v1/seller/staff/info?is_seller=true', {
								headers: {
									accept: 'application/json',
									'accept-language': 'en-US,en;q=0.9',
									'sec-ch-ua': '"Chromium";v="118", "Google Chrome";v="118", "Not=A?Brand";v="99"',
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
								.then((data) => {
									const userData = data;
									if (!get(userData, 'email', '')) {
										throw 'Cannot find user data. Try again.';
									}
									return {
										orderData: orderData,
										userData: userData,
										dataRequest: {
											order_id: get(orderData, 'order_number', ''),
											identifier: Identifier,
											fulfillment_note: get(orderData, 'note', ''),
											shipping_total: get(orderData, ['payment_info', 'shipping'], ''),
											total_tax: get(orderData, ['payment_info', 'tax'], ''),
											account_id: get(userData, 'email', ''),
											account_name: get(userData, 'business_name', ''),
											account_type: 'Inspireuplift',
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
												return {
													name: get(li, 'name', ''),
													product_id: get(li, 'product_id', ''),
													order_line_item_id: get(li, 'variant_id', ''),
													variation_id: get(li, 'variant_id', ''),
													sku: get(li, 'sku', ''),
													quantity: get(li, 'quantity', ''),
													price: get(li, 'price_per_item', ''),
													currency: 'USD',
													image: get(head(get(li, 'media', [])), 'url', ''),
												};
											}),
										},
									};
								})
								.catch(() => {
									throw 'Cannot find user data. Try again.';
								});
						})
						.then(async (data) => {
							return await Promise.all(
								map(unionBy(get(data, ['orderData', 'line_items'], []), 'product_id'), async (item: any) => {
									console.log('item: ', item);
									if (!item?.product_id || !item?.name) {
										setErrorMsg('Cannot find item, try again');
										throw 'Cannot find item, try again';
									}
									return fetch(
										`https://sellercentral-api.inspireuplift.com/api/v1/seller/marketplace/products/list?is_seller=true&search=${item?.name}`,
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
										.then(async (response) => {
											const itemInfo = find(get(response, ['data', 'data'], []), (itemInfo) => {
												return get(itemInfo, 'product_id') === item?.product_id;
											});
											const itemId = get(itemInfo, 'id', '');
											if (!itemId) {
												return Promise.resolve(null);
											}
											return fetch(
												`https://sellercentral-api.inspireuplift.com/api/v1/seller/marketplace/products/${itemId}?is_seller=true`,
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
												.catch((error) => {
													console.log('error: ', error);
												});
										})
										.catch((error) => {
											console.log('error: ', error);
										});
								})
							).then((items) => {
								if (findIndex(items, (item) => !item) >= 0 || !Array.isArray(items) || !items.length) {
									throw 'Some orders had errors when imported'
									throw {
										order_fail: order.id,
										msg: 'Some orders had errors when imported',
									};
								}

								return {
									...data,
									itemsData: items,
								};
							});
						})
						// if (isDetail()) {
						// 	const attrTemp = $(head($x(`//span[text()="${item?.sku}"]/parent::p/parent::div/following-sibling::div[1]//p[1]/div`)) as any)?.text()
						// 	console.log('attrTemp: ', attrTemp);
						// 	if (attrTemp) {
						// 		return {
						// 			product_id: item?.product_id,
						// 			// variants: []
						// 		}
						// 	}
						// }
						.then(async (dataTotal) => {
							return new Promise(async (resolve, reject) => {
								const getTransactionRequest = async (page = 1) => {
									return fetch(
										`https://sellercentral-api.inspireuplift.com/api/v1/seller/transactions?page=${page}&is_seller=true`,
										{
											headers: {
												accept: 'application/json',
												'accept-language': 'en-US,en;q=0.9',
												'sec-ch-ua': '"Chromium";v="118", "Google Chrome";v="118", "Not=A?Brand";v="99"',
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
										.then((data) => {
											const transactions = get(data, ['data', 'transactions', 'data']);
											const lastPage = get(data, ['data', 'transactions', 'last_page']);
											const transactionData = find(transactions, (trans) => {
												console.log(get(trans, 'type', ''));
												console.log(`Seller_Order # ${get(data, ['orderData', 'seller_order_number'], '')}`);
												return (
													get(trans, 'type', '') ===
													`Seller_Order # ${get(dataTotal, ['orderData', 'seller_order_number'], '')}`
												);
											});
											if (transactionData) {
												resolve(transactionData);
											} else {
												if (page === lastPage) {
													reject('Cannot find transactions');
												} else {
													getTransactionRequest(page + 1);
												}
											}
										})
										.catch((error) => {
											console.log('error: ', error);
											reject('Cannot find transactions.');
										});
								};
								getTransactionRequest(1);
							})
								.then((transactionsData) => {
									return {
										...dataTotal,
										transactionsData: transactionsData,
									};
								})
								.catch((error) => {
									console.log('error: ', error);
									throw 'Cannot find transactions';
								});
						})
						.then((data) => {
							console.log('data: ', data);
							const items = get(data, 'itemsData', []);
							const transactionData = get(data, 'transactionsData', {});
							const dataRequest = {
								...get(data, 'dataRequest', {}),
								total_fee: (
									parseFloat(get(transactionData, 'commission_fee', '0')) +
									parseFloat(get(transactionData, 'processing_fee', '0'))
								).toFixed(2),
								items: map(get(data, ['dataRequest', 'items'], []), (li) => {
									const itemData = find(items, (item) => get(item, 'product_id') === get(li, 'product_id', ''));
									console.log('itemData: ', itemData);
									const variants = find(
										get(itemData, 'variants', []),
										(va) => get(va, 'id') === get(li, 'variation_id', '')
									);
									console.log('variants: ', variants);

									return {
										...li,
										item_sku: get(itemData, 'sku', ''),
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
									url: `${currentDocker?.domain ? `${urlRestApi}/order/create` : '/api/order/create'}`,
									data: dataRequest,
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
						})
						.catch((error) => {
							setLoading(false);
							setErrorMsg(
								typeof error === 'string' ? error : error?.toString() ? error?.toString() : JSON.stringify(error)
							);
						})
				);
			})
		)
			.then(() => {
				setLoading(false);
				handleGetOrderSync();
			})
			.catch((error) => {
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
						{map(orders, (order, index) => {
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
							color = order?.ErrorMsg ? 'danger' : color;
							return [
								<tr key={get(order, 'order_number', '') + index}>
									<td rowSpan={order?.ErrorMsg ? 2 : 1}>
										<input
											type='checkbox'
											checked={!!order.checked}
											value={get(order, 'order_number', '')}
											onChange={(e) =>
												setOrders(
													map(orders, (o) =>
														order.order_number === o.order_number ? { ...o, checked: !order.checked } : o
													)
												)
											}
										/>
									</td>
									<td className={`${order?.ErrorMsg ? 'border-bottom-none' : ''}`}>
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
									<td className={`text-center ${order?.ErrorMsg ? 'border-bottom-none' : ''}`}>
										{LoadingStatus ? (
											<Spinner />
										) : (
											<span className={`bg-${color} rounded px-1 text-light`}>
												{order?.ErrorMsg ? 'Error' : get(orderSyns, 'status', 'New')}
											</span>
										)}
									</td>
									<td className={`text-center ${order?.ErrorMsg ? 'border-bottom-none' : ''}`}>
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
								</tr>,
								(() => {
									return order?.ErrorMsg ? (
										<tr key={get(order, 'order_number', '') + index + 'noti'}>
											<td colSpan={3}>
												<p className='text-danger text-right mb-1'>{order?.ErrorMsg}</p>
											</td>
										</tr>
									) : (
										false
									);
								})(),
							];
						})}
					</tbody>
				</Table>
			</div>
			<BottomBar>
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
			</BottomBar>
		</>
	);
}
