import { useEffect, useRef, useState } from 'react';
import { Button, Spinner, Table } from 'reactstrap';
import { DownloadCloud, RefreshCw, Save, UploadCloud } from 'react-feather';
import UiContext from './../../../contexts/ui.context';
import Notification from './../../../components/Notification';
import BottomBar from './../../../components/BottomBar';
import $ from 'jquery';
import { filter, find, findIndex, get, head, last, map, set, trim, unionBy } from 'lodash';

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
	const [ordersRaw, setOrdersRaw] = useState<any[]>([]);
	const [ordersSync, setOrdersSync] = useState<any[]>([]);
	const [currentQueryString, setCurrentQueryString] = useState<any>(window.location.search);

	useEffect(() => {
		setPathname(window.location.pathname);
	}, [window.location.pathname, window.location.href, window.location.search]);

	useEffect(() => {
		if ((window as any).myInterval) {
			clearInterval((window as any).myInterval);
		}
	}, []);

	useEffect(() => {
		if (window.location.pathname.startsWith('/your/orders/') || !orders.length) {
			handleGetOrderData();
		}
		loopGetOrderData();
	}, [pathname]);

	useEffect(() => {
		if (currentDocker?.domain && orders && orders.length) {
			handleGetOrderSync();
		}
	}, [currentDocker?.domain, orders]);

	function isListting() {
		return pathname.startsWith('/your/orders/');
	}

	function isDetail() {
		return false;
	}

	function isTracking() {
		return pathname.startsWith('/your/orders/sold/new');
	}

	function loopGetOrderData() {
		(window as any).myInterval = setInterval(() => {
			if (pathname !== window.location.pathname) {
				setPathname(window.location.pathname);
			}
		}, 1000);
	}

	function handleGetOrderData() {
		setLoading(true);
		new Promise((resolve, reject) => {
			if (isDetail() || isTracking()) {
			}

			const s = new URLSearchParams(window.location.search);
			const limitElm = $("select[aria-label='Orders displayed']").first().val()
			let limit = (Array.isArray(limitElm) ? head(limitElm) : limitElm)
			limit = String(limit ? limit : '20')
			const page = parseInt(s.get('page') || '1');
			const offset = (page - 1) * parseInt(limit);
			const search_query = s.get('search_query') || '';
			const ship_date = s.get('ship_date') || 'all';
			const destination = s.get('destination') || 'all';
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
			const NewStatusID = 1122457242231;
			const CompletedStatusID = 1100033259692;
			fetch(
				`https://www.etsy.com/api/v3/ajax/bespoke/shop/${get(
					storeData,
					'account_id',
					''
				)}/mission-control/orders?filters[buyer_id]=all&filters[channel]=all&filters[completed_status]=all&filters[destination]=${destination}&filters[ship_date]=${ship_date}&filters[shipping_label_eligibility]=false&filters[shipping_label_status]=all&filters[has_buyer_notes]=false&filters[is_marked_as_gift]=false&filters[is_personalized]=false&filters[has_shipping_upgrade]=false&filters[order_state_id]=all&limit=${limit}&offset=${offset}&search_terms=${search_query}&sort_by=order_date&sort_order=desc&objects_enabled_for_normalization[order_state]=true`,
				{
					referrer: pathname.endsWith('/completed')
						? 'https://www.etsy.com/your/orders/sold/completed?ref=seller-platform-mcnav'
						: 'https://www.etsy.com/your/orders/sold?ref=seller-platform-mcnav',
				}
			)
				.then((response) => response.json())
				.then((response) => {
					setLoading(false);
					setOrdersRaw(response);
					resolve(setOrders(get(response, 'orders', [])));
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
			url: `${urlRestApi}/order/orders?${map(orders, (o) => `external_numbers[]=${get(o, 'order_id', '')}`).join(
				'&'
			)}&identifier=${Identifier}&store=${get(storeData, 'account_id', '')}&store_type=Etsy`,
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

		if (!order) {
			throw 'Cannot find order data. Try again.';
		}

		const dataRequest = {
			order_id: get(order, 'order_id', ''),
			identifier: Identifier,
			fulfillment_note: get(order, ['notes', 'note_from_buyer'], ''),
			shipping_total: parseInt(get(order, ['payment', 'cost_breakdown', 'shipping_cost', 'value'], '')) / 100,
			discount_total: parseInt(get(order, ['payment', 'cost_breakdown', 'discount', 'value'], '')) / 100,
			total_tax: parseInt(get(order, ['payment', 'cost_breakdown', 'tax_cost', 'value'], '')) / 100,
			total_fee: 0,
			account_id: get(storeData, 'account_id', ''),
			account_name: get(storeData, 'account_name', ''),
			account_type: 'Etsy',
			shipping_info: {
				full_name: get(order, ['fulfillment', 'to_address', 'name'], ''),
				address_1: get(order, ['fulfillment', 'to_address', 'first_line'], ''),
				address_2: get(order, ['fulfillment', 'to_address', 'second_line'], ''),
				company: '',
				city: get(order, ['fulfillment', 'to_address', 'city'], ''),
				state: get(order, ['fulfillment', 'to_address', 'state'], ''),
				postcode: get(order, ['fulfillment', 'to_address', 'zip'], ''),
				country: get(order, ['fulfillment', 'to_address', 'country'], ''),
				email: get(order, ['fulfillment', 'to_address', 'email'], ''),
				phone: get(order, ['fulfillment', 'to_address', 'phone'], ''),
			},
			items: map(get(order, 'transactions', []), (transaction) => {
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
		})
			.then(() => {
				handleSaveOrder(orderSignle, index + 1, orderState);
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
		const platformOrderID = String(get(orderSignle, 'order_id', ''));
		const orderSyns = find(ordersSync, (oS) => String(oS.external_number) === platformOrderID);
		return new Promise(async (resolve, reject) => {
			setOnFillData(true);
			let timeout = 0;
			// await handleClearData();

			const orderBlock = $(`[href="${pathname}?ref=seller-platform-mcnav&order_id=${platformOrderID}"]`).parents(
				'.panel-body-row'
			)[0];

			if (pathname.startsWith('')) $(orderBlock).css('background-color', 'red');
			if (!orderBlock) {
				resolve(false);
			}

			if (!head($(`input[name=trackingCode-${platformOrderID}]`))) {
				await clickButton(
					`>.flag > div:last-child>div[role="presentation"]>div:first-child button`,
					orderBlock
				);
				await sleep(3000);
			}

			// await fillTextInput(`input[name=trackingCode-${platformOrderID}]`, get(orderSyns, 'tracking_number', ''));

			const trackingXpath = `#mark-as-complete-overlay input[name="trackingCode-${platformOrderID}"]`;
			let timeOutTrackingInput = 0;
			while (true) {
				if (timeOutTrackingInput == 30) {
					return resolve(false);
				}
				if ($(trackingXpath).length) break;
				await sleep(500);
				timeOutTrackingInput++;
			}
			const trackingInputElem = $(trackingXpath);
			trackingInputElem.focus();
			trackingInputElem.val('');
			document.execCommand('insertText', false, get(orderSyns, 'tracking_number', ''));
			trackingInputElem.blur();

			const carrierIDs = {
				'Vietnam Post': '298',
				'Vietnam Post EMS': '323',
				Evergreen: '122',
				DHL: '4',
				TNT: '110',
				Aramex: '111',
				FedEx: '3',
				UPS: '2',
			};

			const carrierID = get(carrierIDs, get(orderSyns, 'tracking_company', ''));

			if ($(`select[name=carrierNameSelect-${platformOrderID}]`))
				if (carrierID) {
					await fillSelect(`select[name=carrierNameSelect-${platformOrderID}]`, undefined, carrierID);
				} else {
					await fillSelect(`select[name=carrierNameSelect-${platformOrderID}]`, undefined, -1);
					await sleep(1000);
					const carrierXpath = `#mark-as-complete-overlay input[name="carrierName-${platformOrderID}"]`;
					let timeOutTrackingInput = 0;
					while (true) {
						if (timeOutTrackingInput == 30) {
							return resolve(false);
						}
						if ($(carrierXpath).length) break;
						await sleep(500);
						timeOutTrackingInput++;
					}
					const carrierInputEle = $(carrierXpath);
					carrierInputEle.focus();
					carrierInputEle.val('');
					document.execCommand('insertText', false, get(orderSyns, 'tracking_company', ''));
					carrierInputEle.blur();

					await sleep(2000);
					clickXButton(`//button[text()="Complete order"]`);
				}
			await sleep(1000);
			resolve(true);
		}).then(() => {
			setOnFillData(false);
		});
	}

	return (
		<>
			<Notification ErrorMsg={ErrorMsg} SuccessMsg={SuccessMsg} Loading={Loading} />
			<h4 className="text-center">Order list</h4>
			<div className="mt-2">
				<Table responsive>
					<thead>
						<tr>
							<td>
								<input
									type="checkbox"
									checked={!find(orders, (order) => !order.checked)}
									value="checkall"
									onChange={(e) =>
										setOrders(
											map(orders, (order) => ({
												...order,
												checked: e.target.checked,
											}))
										)
									}
								/>
							</td>
							<td>#</td>
							<td className="text-center">Status</td>
							<td className="text-center">Action</td>
						</tr>
					</thead>
					<tbody>
						{map(orders, (order, index) => {
							const orderSyns = find(
								ordersSync,
								(oS) => String(oS.external_number) === String(get(order, 'order_id', ''))
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
							if (
								orderSyns &&
								get(orderSyns, 'status', 'New') !== 'Trash' &&
								orderSyns?.tracking_number
							) {
								rowSpan++;
							}
							if (order?.ErrorMsg) {
								rowSpan++;
							}
							return [
								<tr key={get(order, 'order_id', '') + index}>
									<td rowSpan={rowSpan}>
										<input
											type="checkbox"
											checked={!!order.checked}
											value={get(order, 'order_id', '')}
											onChange={(e) =>
												setOrders(
													map(orders, (o) =>
														order.order_id === o.order_id
															? { ...o, checked: !order.checked }
															: o
													)
												)
											}
										/>
									</td>
									<td className={`${rowSpan > 1 ? 'border-bottom-none' : ''}`}>
										<strong
											className="cursor-pointer"
											onClick={() =>
												setOrders(
													map(orders, (o) =>
														order.order_id === o.order_id
															? { ...o, checked: !order.checked }
															: o
													)
												)
											}
										>
											{get(order, 'order_id', '')}
										</strong>
										<div className="d-flex flex-column">
											{map(get(order, 'transactions'), (transaction) => {
												return (
													<div className="d-flex align-items-center">
														<img
															src={get(transaction, ['product', 'image_url_75x75'], '#')}
															style={{ width: 32, height: 32, marginRight: 2 }}
														/>{' '}
														<span
															style={{
																fontSize: 10,
																whiteSpace: 'nowrap',
																overflow: 'hidden',
																textOverflow: 'ellipsis',
																width: 75,
															}}
														>
															x {get(transaction, 'quantity', 1)} (
															{map(get(transaction, 'variations'), (variation) => {
																return get(variation, 'value', '');
															}).join(' - ')}
															)
														</span>
													</div>
												);
											})}
										</div>
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
										{orderSyns && get(orderSyns, 'status', 'New') !== 'Trash' ? (
											orderSyns?.tracking_number && !get(order, ['fulfillment', 'is_complete']) ? (
												<Button
													size="sm"
													color="primary"
													className=""
													onClick={() => {
														handleFillTracking(order);
													}}
													disabled={!currentDocker?.domain}
												>
													<DownloadCloud size={14} />
												</Button>
											) : (
												false
											)
										) : (
											<Button
												size="sm"
												color="success"
												className=""
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
									return orderSyns &&
										get(orderSyns, 'status', 'New') !== 'Trash' &&
										orderSyns?.tracking_number ? (
										<tr key={get(orderSyns, '_id', '') + index + 'tracking'}>
											<td colSpan={3}>
												<p className="text-right mb-1">
													Tracking Number: <strong>{orderSyns?.tracking_number}</strong>
												</p>
												<p className="text-right mb-1">
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
										<tr key={get(order, 'order_id', '') + index + 'noti'}>
											<td colSpan={3}>
												<p className="text-danger text-right mb-1">{order?.ErrorMsg}</p>
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
						<Spinner color="info" />
					</div>
				) : (
					false
				)}
			</div>
			<BottomBar>
				<Button
					size="xs"
					color="primary"
					className="py-1 d-flex justify-content-center align-items-center flex-column"
					onClick={() => {
						handleGetOrderData();
						setSuccessMsg('');
						setErrorMsg('');
					}}
				>
					<RefreshCw size={14} /> <span style={{ marginLeft: '3px' }}>Reload data</span>
				</Button>
				<Button
					size="xs"
					color="primary"
					className="py-1 d-flex justify-content-center align-items-center flex-column"
					onClick={() => handleFillTracking()}
				>
					<Save size={14} /> <span style={{ marginLeft: '3px' }}>Fill tracking</span>
				</Button>
				<Button
					size="xs"
					color="success"
					className="py-1 d-flex justify-content-center align-items-center flex-column"
					onClick={() => handleSaveOrder()}
					disabled={!currentDocker?.domain || !find(orders, (order) => order.checked)}
				>
					<Save size={14} /> <span style={{ marginLeft: '3px' }}>Save orders</span>
				</Button>
			</BottomBar>
		</>
	);
}
