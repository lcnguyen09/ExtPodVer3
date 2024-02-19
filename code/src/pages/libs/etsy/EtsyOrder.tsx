import { useEffect, useRef, useState } from 'react';
import { Button, Spinner, Table } from 'reactstrap';
import { DownloadCloud, RefreshCw, Save, UploadCloud } from 'react-feather';
import UiContext from './../../../contexts/ui.context';
import Notification from './../../../components/Notification';
import BottomBar from './../../../components/BottomBar';
import $ from 'jquery';
import { filter, find, findIndex, get, head, last, map, set, trim, unionBy } from 'lodash';

export default function ({ Identifier, storeData }: any) {
	const { currentDocker, currentToken, templateId, urlRestApi, $x, fillTextInput, clickXButton, clickButton, sleep } =
		UiContext.UseUIContext();

	const [pathname, setPathname] = useState(window.location.pathname);

	const [Loading, setLoading] = useState<boolean>(false);
	const [LoadingStatus, setLoadingStatus] = useState<boolean>(true);
	const [ErrorMsg, setErrorMsg] = useState('');
	const [SuccessMsg, setSuccessMsg] = useState('');
	const [onFillData, setOnFillData] = useState<boolean>(false);

	const [orders, setOrders] = useState<any[]>([]);
	const [ordersSync, setOrdersSync] = useState<any[]>([]);
	const [currentQueryString, setCurrentQueryString] = useState<any>(window.location.search);

	useEffect(() => {
		setPathname(window.location.pathname);
	}, [window.location.pathname, window.location.href, window.location.search]);

	useEffect(() => {
        console.log('#0')
		if ((window as any).myInterval) {
			clearInterval((window as any).myInterval);
		}
	}, []);

	useEffect(() => {
        console.log('handleGetOrderData')
		if (
			window.location.pathname.startsWith('/your/orders/sold/') ||
			!orders.length
		) {
        handleGetOrderData();
		}
		// loopGetOrderData();
	}, [currentQueryString]);

	useEffect(() => {
		if (currentDocker?.domain && orders && orders.length) {
			handleGetOrderSync();
		}
	}, [currentDocker?.domain, orders]);

	function isListting() {
		return pathname.startsWith('/your/orders/sold/');
	}

	function isDetail() {
		return pathname.startsWith('/order/view');
	}

	function isTracking() {
		return pathname.startsWith('/order/fulfillment') && pathname.endsWith('/create');
	}

	function loopGetOrderData() {
		(window as any).myInterval = setInterval(() => {
			if (currentQueryString !== window.location.search) {
				setCurrentQueryString(window.location.search);
			}
		}, 1000);
	}

	function handleGetOrderData() {
		setLoading(true);
		new Promise((resolve, reject) => {
			// if (isDetail() || isTracking()) {
			// 	let id = isDetail() ? last(window.location.pathname.split('/')) : null;
			// 	id = isTracking()
			// 		? get(window.location.pathname.split('/'), window.location.pathname.split('/').length - 2)
			// 		: id;
			// 	return fetch(`https://sellercentral-api.inspireuplift.com/api/v1/seller/orders/${id}?is_seller=true`, {
			// 		headers: {
			// 			accept: 'application/json',
			// 			'accept-language': 'en-US,en;q=0.9',
			// 			'sec-ch-ua': '"Chromium";v="116", "Not)A;Brand";v="24", "Google Chrome";v="116"',
			// 			'sec-ch-ua-mobile': '?0',
			// 			'sec-ch-ua-platform': '"Windows"',
			// 			'sec-fetch-dest': 'empty',
			// 			'sec-fetch-mode': 'cors',
			// 			'sec-fetch-site': 'same-site',
			// 		},
			// 		referrer: 'https://sellercentral.inspireuplift.com/',
			// 		referrerPolicy: 'strict-origin-when-cross-origin',
			// 		body: null,
			// 		method: 'GET',
			// 		mode: 'cors',
			// 		credentials: 'include',
			// 	})
			// 		.then((response) => response.json())
			// 		.then((response) => {
			// 			setLoading(false);
			// 			resolve(
			// 				setOrders([
			// 					{
			// 						...get(response, ['data'], {}),
			// 						id: id,
			// 					},
			// 				])
			// 			);
			// 		});
			// }

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
			)}&identifier=${Identifier}&store=${get(storeData, 'account_id', '')}&store_type=Inspireuplift`,
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

	function handleSaveOrder(orderSignle = null, index = 0, orderState = orders) {
		let ordersForSync = filter(orders, (o) => o.checked);
		if (orderSignle) {
			ordersForSync = [orderSignle];
		}
		setLoading(true);
		const order = get(ordersForSync, index);
		if (!order) {
			handleGetOrderSync();
			return setLoading(false);
		}

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
				const orderData = get(data, 'data', {});
				if (!get(orderData, 'order_number') || !get(orderData, 'seller_order_number')) {
					throw 'Cannot find order data. Try again.';
				}
				return {
					orderData: orderData,
					dataRequest: {
						order_id: get(orderData, 'order_number', ''),
						identifier: Identifier,
						fulfillment_note: get(orderData, 'note', ''),
						shipping_total: get(orderData, ['payment_info', 'shipping'], ''),
						total_tax: get(orderData, ['payment_info', 'tax'], ''),
						account_id: get(storeData, 'account_id', ''),
						account_name: get(storeData, 'account_name', ''),
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
			.then(async (data) => {
				return await Promise.all(
					map(unionBy(get(data, ['orderData', 'line_items'], []), 'product_id'), async (item: any) => {
						if (!item?.product_id || !item?.name) {
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
				)
					.then(async (items) => {
						if (findIndex(items, (item) => !item) >= 0 || !Array.isArray(items) || !items.length) {
							if (isDetail()) {
								return await Promise.all(
									map(unionBy(get(data, ['orderData', 'line_items'], []), 'sku'), async (item: any) => {
										const attrTemp = $(
											head(
												$x(`//span[text()="${item?.sku}"]/parent::p/parent::div/following-sibling::div[1]//p[1]/div`)
											) as any
										)?.text();
										console.log('attrTemp: ', attrTemp);
										if (attrTemp) {
											return {
												product_id: item?.product_id,
												variant_id: item?.variant_id,
												variant_attributes: map(attrTemp.split('/'), (attr, index) => {
													return {
														code: 'ATTR-' + index,
														text: trim(attr),
													};
												}),
											};
										}
										return null;
									})
								).then((items) => {
									let newItems: any = [];
									console.log('items: ', items);
									filter(items, (item: any) => {
										if (item) {
											const currentNewItem = find(newItems, (nItem: any) => nItem?.product_id === item?.product_id);
											const currentNewItemIndex = findIndex(
												newItems,
												(nItem: any) => nItem?.product_id === item?.product_id
											);

											if (!currentNewItem) {
												newItems.push({
													product_id: item?.product_id,
													variants: [
														{
															id: item?.variant_id,
															attributes: item?.variant_attributes,
														},
													],
												});
											} else {
												set(
													newItems,
													[currentNewItemIndex, 'variants'],
													[
														...currentNewItem?.variants,
														{
															id: item?.variant_id,
															attributes: item?.variant_attributes,
														},
													]
												);
											}
										} else {
											newItems.push(false);
										}
									});
									return newItems;
								});
							}
						}
						return items;
					})
					.then((items) => {
						if (findIndex(items, (item) => !item) >= 0 || !Array.isArray(items) || !items.length) {
							throw 'The product attribute cannot be determined because the product has been deleted. try again in order detail';
						}
						return {
							...data,
							itemsData: items,
						};
					});
			})
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
			.then(async (data) => {
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
						const variants = find(get(itemData, 'variants', []), (va) => get(va, 'id') === get(li, 'variation_id', ''));
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
				console.log('dataRequest: ', dataRequest);
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
				}).then(() => {
					handleSaveOrder(orderSignle, index + 1, orderState);
				});
			})
			.catch((error) => {
				const errorMsg =
					typeof error === 'string' ? error : error?.toString() ? error?.toString() : JSON.stringify(error);
				orderState = map(orderState, (o) => {
					return o?.id === order?.id
						? {
							...o,
							ErrorMsg: errorMsg,
						}
						: o;
				});
				setOrders(orderState);
				handleSaveOrder(orderSignle, index + 1, orderState);
			});
	}

	function handleFillTracking(orderSignle = null) {
		if (!orderSignle) {
			orderSignle = head(orders);
		}
		const orderSyns = find(
			ordersSync,
			(oS) => String(oS.external_number) === String(get(orderSignle, 'order_number', ''))
		);
		return new Promise(async (resolve, reject) => {
			setOnFillData(true);
			let timeout = 0;
			// await handleClearData();
			await fillTextInput(`input#tracking-number`, get(orderSyns, 'tracking_number', ''));
			await clickXButton(`//label[text()="Shipping Carriers"]/following-sibling::div/div`);
			await sleep(1000);
			await fillTextInput(
				head($x(`//label[text()="Shipping Carriers"]/following-sibling::div/div//input`)),
				get(orderSyns, 'tracking_company', '')
			);
			timeout = 0;
			await sleep(1000);
			await new Promise(async (resolve, reject) => {
				const tryClick = async () => {
					console.log('tryClick: ');
					await sleep(1000);
					await clickXButton(
						`//label[text()="Shipping Carriers"]/following-sibling::div/div//div[text()="${get(
							orderSyns,
							'tracking_company',
							''
						)}"]`
					);
					console.log(
						head(
							$x(
								`//label[text()="Shipping Carriers"]/following-sibling::div/div[text()="${get(
									orderSyns,
									'tracking_company',
									''
								)}"]`
							)
						)
					);
					if (
						!head(
							$x(
								`//label[text()="Shipping Carriers"]/following-sibling::div/div[text()="${get(
									orderSyns,
									'tracking_company',
									''
								)}"]`
							)
						)
					) {
						tryClick();
					} else {
						resolve(true);
					}
				};
				tryClick();
			});

			await sleep(1000);
			await fillTextInput(`input.rc-input-number-input`, 1);
			await sleep(2000);
			await clickButton(`button[type="submit"]`);
			resolve(true);
		}).then(() => {
			setOnFillData(false);
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
							let rowSpan = 1;
							if (orderSyns && get(orderSyns, 'status', 'New') !== 'Trash' && orderSyns?.tracking_number) {
								rowSpan++;
							}
							if (order?.ErrorMsg) {
								rowSpan++;
							}
							return [
								<tr key={get(order, 'order_number', '') + index}>
									<td rowSpan={rowSpan}>
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
									<td className={`${rowSpan > 1 ? 'border-bottom-none' : ''}`}>
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
									<td className={`text-center ${rowSpan > 1 ? 'border-bottom-none' : ''}`}>
										{LoadingStatus ? (
											<Spinner />
										) : (
											<span className={`bg-${color} rounded px-1 text-light`}>
												{order?.ErrorMsg ? 'Error' : get(orderSyns, 'status', 'New')}
											</span>
										)}
									</td>
									<td className={`text-center ${rowSpan > 1 ? 'border-bottom-none' : ''}`}>
										{orderSyns &&
											get(orderSyns, 'status', 'New') !== 'Trash' &&
											orderSyns?.tracking_number &&
											isTracking() ? (
											<Button
												size='sm'
												color='primary'
												className=''
												onClick={() => {
													handleFillTracking(order);
												}}
												disabled={!currentDocker?.domain}
											>
												<DownloadCloud size={14} />
											</Button>
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
												<Save size={14} />
											</Button>
										)}
									</td>
								</tr>,
								(() => {
									return orderSyns && get(orderSyns, 'status', 'New') !== 'Trash' && orderSyns?.tracking_number ? (
										<tr key={get(orderSyns, '_id', '') + index + 'tracking'}>
											<td colSpan={3}>
												<p className='text-right mb-1'>
													Tracking Number: <strong>{orderSyns?.tracking_number}</strong>
												</p>
												<p className='text-right mb-1'>
													Tracking Carrier: <strong>{orderSyns?.tracking_company}</strong>
												</p>
											</td>
										</tr>
									) : (
										false
									);
								})(),
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
						<Spinner color='info' />
					</div>
				) : (
					false
				)}
			</div>
			<BottomBar>
				<Button
					size='xs'
					color='primary'
					className='py-1 d-flex justify-content-center align-items-center flex-column'
					onClick={() => {
						handleGetOrderData();
						setSuccessMsg('');
						setErrorMsg('');
					}}
				>
					<RefreshCw size={14} /> <span style={{ marginLeft: '3px' }}>Reload data</span>
				</Button>
				{isTracking() ? (
					<Button
						size='xs'
						color='primary'
						className='py-1 d-flex justify-content-center align-items-center flex-column'
						onClick={() => handleFillTracking()}
					>
						<Save size={14} /> <span style={{ marginLeft: '3px' }}>Fill tracking</span>
					</Button>
				) : (
					<Button
						size='xs'
						color='success'
						className='py-1 d-flex justify-content-center align-items-center flex-column'
						onClick={() => handleSaveOrder()}
						disabled={!currentDocker?.domain || !find(orders, (order) => order.checked)}
					>
						<Save size={14} /> <span style={{ marginLeft: '3px' }}>Save orders</span>
					</Button>
				)}
			</BottomBar>
		</>
	);
}
