import { useEffect, useState } from 'react';
import { Button, Spinner, Table } from 'reactstrap';
import { RefreshCw, UploadCloud } from 'react-feather';
import UiContext from './../../../contexts/ui.context';
import Notification from './../../../components/Notification';
import BottomBar from './../../../components/BottomBar';
import $ from 'jquery';
import { filter, find, findIndex, get, head, last, map, unionBy } from 'lodash';

export default function ({ Identifier }: any) {
	const { currentDocker, currentToken, templateId, urlRestApi } = UiContext.UseUIContext();

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
		setLoading(true)
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
		})
	}

	function handleGetOrderSync() {
		setLoadingStatus(false);
		$.ajax({
			method: 'GET',
			url: `${urlRestApi}/order/orders?${map(
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
								productId: get(li, 'product_id', ''),
								itemName: get(li, 'name', ''),
							};
						});
						items = unionBy(items, 'productId');
						// if (isDetail()) {
						// 	// return await Promise.all(

						// 	// )
						// 	return [
						// 		{
						// 			"product_id": 3606448,
						// 			"sku": "BMPBVKO8I5",
						// 			"seller_sku": "BMPBVKO8I5",
						// 			"type": "configurable",
						// 			"title": "NEW! Jordan Love Bay 10 Packers 2023-24 Green Jersey Print Fanmade Shirt",
						// 			"video_url": null,
						// 			"video_thumbnail": null,
						// 			"description": "<div><strong>Product Information</strong></div>\n<div>&nbsp; &nbsp; &nbsp; All Over Print Football Jersey &ndash; V-Next Shirt<br />\n<ul>\n<li>High-quality materials without fading, cracking, peeling, or flaking vibrant colors that won&rsquo;t fade.</li>\n<li>Dry clean, hand, or machine wash are also acceptable.</li>\n<li>Dryer-safe without any fading, peeling, or wrinkling, quick-drying.</li>\n<li>Full US size from S to 5XL</li>\n<li>The product is made on demand. No minimum required.</li>\n<li>Made in Vietnam, in-house manufacturing</li>\n<li>Colors: As Design</li>\n<li>Sizes: S, M, L, XL, 2 XL, 3 XL, 4 XL, 5 XL</li>\n<li>Due to the difference between different monitors, the divicture may not reflect the actual color of the item.</li>\n<li>Compare the detail sizes with yours, please allow 1-2 cm variations due to manual measurement.</li>\n</ul>\n</div>\n<div>\n<p><strong>Shipping Info</strong></p>\n<ul>\n<li>Estimated Processing time: 2-6 business days.</li>\n<li>Estimated US Shipping time: 4-9 business days.</li>\n<li>Estimated EU &amp; UK Shipping time: 10-13 business days.</li>\n<li>Estimated CA Shipping time: 10-15 business days.</li>\n</ul>\n<br /><strong>Replacement/Return Policy</strong><br />\n<ul>\n<li>If you are not completely satisfied with your purchase, we will implement to replace another within 30 days without fee if the item is defective, damaged, or an error is made on our end. We do our best to process as quickly as possible.</li>\n<li>If for any reason you are unsatisfied with the item you buy, please contact us so that we can talk about the sollution for you. If you send us the proof like an image, it is easier for us to handle your issue.</li>\n</ul>\n<br /><strong>WE DO NOT SHIP TO HI PR ALASKA PO.BOX We can't accept changing/refunding request if you just do not like this material. This is fan made jersey. The letters are 3D printed.</strong></div>",
						// 			"short_description": "",
						// 			"featured_image_id": 6615552,
						// 			"price": 33.5,
						// 			"compare_at_price": 50,
						// 			"cost_per_item": 16.5,
						// 			"expedite_shipping": null,
						// 			"charge_tax": 1,
						// 			"media_gallery": [
						// 				{
						// 					"id": 6615552,
						// 					"alt": "new-jordan-love-bay-10-packers-2023-24-green-jersey-print-fanmade-shirt (1).jpeg"
						// 				},
						// 				{
						// 					"id": 6615553,
						// 					"alt": "new-jordan-love-bay-10-packers-2023-24-green-jersey-print-fanmade-shirt.jpeg"
						// 				},
						// 				{
						// 					"id": 6615587,
						// 					"alt": "football-jersey.jpeg"
						// 				},
						// 				{
						// 					"id": 6615585,
						// 					"alt": "1689827303_DJu3ws.jpeg"
						// 				},
						// 				{
						// 					"id": 6615586,
						// 					"alt": "1692537798_c7xRTQ.png"
						// 				}
						// 			],
						// 			"seo_title": "NEW! Jordan Love Bay 10 Packers 2023-24 Green Jersey Print F",
						// 			"seo_description": "Product Information  \n       All Over Print Football Jersey &ndash; V-Next Shirt \n \n High-quality materials without fading, cracking, peeling, or flaking vibran",
						// 			"slug": "New-Jordan-Love-Bay-10-Packers-2023-24-Green-Jersey",
						// 			"rating": null,
						// 			"rating_count": null,
						// 			"is_online_channel": 0,
						// 			"status": {
						// 				"id": 2,
						// 				"name": "Approved"
						// 			},
						// 			"adult_status": 0,
						// 			"product_promotion_id": 0,
						// 			"tags": [],
						// 			"product_type": null,
						// 			"vendor": "PrintMasters",
						// 			"seller_id": 21061,
						// 			"stock": 11,
						// 			"inventory": null,
						// 			"variants": [
						// 				{
						// 					"id": 125123224,
						// 					"_id": 0,
						// 					"product_id": 3606448,
						// 					"sku": "BMPBVKO8I5-1",
						// 					"seller_sku": "BMPBVKO8I5-1",
						// 					"compare_at_price": 50,
						// 					"is_continue_sell": 0,
						// 					"available_quantity": 25,
						// 					"title": "S",
						// 					"price": 33.5,
						// 					"image": null,
						// 					"position": 1,
						// 					"attributes": [
						// 						{
						// 							"label": "S",
						// 							"id": "S",
						// 							"text": "S",
						// 							"value_index": 104,
						// 							"code": "size"
						// 						}
						// 					],
						// 					"is_enabled": true,
						// 					"taxable": true,
						// 					"weight": null,
						// 					"weight_unit": null,
						// 					"requires_shipping": true,
						// 					"stock": 11
						// 				},
						// 				{
						// 					"id": 125123225,
						// 					"_id": 0,
						// 					"product_id": 3606448,
						// 					"sku": "BMPBVKO8I5-2",
						// 					"seller_sku": "BMPBVKO8I5-2",
						// 					"compare_at_price": 50,
						// 					"is_continue_sell": 0,
						// 					"available_quantity": 24,
						// 					"title": "M",
						// 					"price": 33.5,
						// 					"image": null,
						// 					"position": 2,
						// 					"attributes": [
						// 						{
						// 							"label": "M",
						// 							"id": "M",
						// 							"text": "M",
						// 							"value_index": 107,
						// 							"code": "size"
						// 						}
						// 					],
						// 					"is_enabled": true,
						// 					"taxable": true,
						// 					"weight": null,
						// 					"weight_unit": null,
						// 					"requires_shipping": true,
						// 					"stock": 11
						// 				},
						// 				{
						// 					"id": 125123226,
						// 					"_id": 0,
						// 					"product_id": 3606448,
						// 					"sku": "BMPBVKO8I5-3",
						// 					"seller_sku": "BMPBVKO8I5-3",
						// 					"compare_at_price": 50,
						// 					"is_continue_sell": 0,
						// 					"available_quantity": 25,
						// 					"title": "L",
						// 					"price": 35.23,
						// 					"image": null,
						// 					"position": 3,
						// 					"attributes": [
						// 						{
						// 							"label": "L",
						// 							"id": "L",
						// 							"text": "L",
						// 							"value_index": 111,
						// 							"code": "size"
						// 						}
						// 					],
						// 					"is_enabled": true,
						// 					"taxable": true,
						// 					"weight": null,
						// 					"weight_unit": null,
						// 					"requires_shipping": true,
						// 					"stock": 11
						// 				},
						// 				{
						// 					"id": 125123227,
						// 					"_id": 0,
						// 					"product_id": 3606448,
						// 					"sku": "BMPBVKO8I5-4",
						// 					"seller_sku": "BMPBVKO8I5-4",
						// 					"compare_at_price": 50,
						// 					"is_continue_sell": 0,
						// 					"available_quantity": 22,
						// 					"title": "XL",
						// 					"price": 35.23,
						// 					"image": null,
						// 					"position": 4,
						// 					"attributes": [
						// 						{
						// 							"label": "XL",
						// 							"id": "XL",
						// 							"text": "XL",
						// 							"value_index": 116,
						// 							"code": "size"
						// 						}
						// 					],
						// 					"is_enabled": true,
						// 					"taxable": true,
						// 					"weight": null,
						// 					"weight_unit": null,
						// 					"requires_shipping": true,
						// 					"stock": 11
						// 				},
						// 				{
						// 					"id": 125123228,
						// 					"_id": 0,
						// 					"product_id": 3606448,
						// 					"sku": "BMPBVKO8I5-5",
						// 					"seller_sku": "BMPBVKO8I5-5",
						// 					"compare_at_price": 79.66,
						// 					"is_continue_sell": 0,
						// 					"available_quantity": 24,
						// 					"title": "2XL",
						// 					"price": 37.68,
						// 					"image": null,
						// 					"position": 5,
						// 					"attributes": [
						// 						{
						// 							"label": "2XL",
						// 							"id": "2XL",
						// 							"text": "2XL",
						// 							"value_index": 122,
						// 							"code": "size"
						// 						}
						// 					],
						// 					"is_enabled": true,
						// 					"taxable": true,
						// 					"weight": null,
						// 					"weight_unit": null,
						// 					"requires_shipping": true,
						// 					"stock": 11
						// 				},
						// 				{
						// 					"id": 125123230,
						// 					"_id": 0,
						// 					"product_id": 3606448,
						// 					"sku": "BMPBVKO8I5-6",
						// 					"seller_sku": "BMPBVKO8I5-6",
						// 					"compare_at_price": 79.66,
						// 					"is_continue_sell": 0,
						// 					"available_quantity": 25,
						// 					"title": "3XL",
						// 					"price": 37.68,
						// 					"image": null,
						// 					"position": 6,
						// 					"attributes": [
						// 						{
						// 							"label": "3XL",
						// 							"id": "3XL",
						// 							"text": "3XL",
						// 							"value_index": 129,
						// 							"code": "size"
						// 						}
						// 					],
						// 					"is_enabled": true,
						// 					"taxable": true,
						// 					"weight": null,
						// 					"weight_unit": null,
						// 					"requires_shipping": true,
						// 					"stock": 11
						// 				},
						// 				{
						// 					"id": 125123232,
						// 					"_id": 0,
						// 					"product_id": 3606448,
						// 					"sku": "BMPBVKO8I5-7",
						// 					"seller_sku": "BMPBVKO8I5-7",
						// 					"compare_at_price": 79.66,
						// 					"is_continue_sell": 0,
						// 					"available_quantity": 25,
						// 					"title": "4XL",
						// 					"price": 39.99,
						// 					"image": null,
						// 					"position": 7,
						// 					"attributes": [
						// 						{
						// 							"label": "4XL",
						// 							"id": "4XL",
						// 							"text": "4XL",
						// 							"value_index": 137,
						// 							"code": "size"
						// 						}
						// 					],
						// 					"is_enabled": true,
						// 					"taxable": true,
						// 					"weight": null,
						// 					"weight_unit": null,
						// 					"requires_shipping": true,
						// 					"stock": 11
						// 				},
						// 				{
						// 					"id": 125123234,
						// 					"_id": 0,
						// 					"product_id": 3606448,
						// 					"sku": "BMPBVKO8I5-8",
						// 					"seller_sku": "BMPBVKO8I5-8",
						// 					"compare_at_price": 79.66,
						// 					"is_continue_sell": 0,
						// 					"available_quantity": 25,
						// 					"title": "5XL",
						// 					"price": 41.69,
						// 					"image": null,
						// 					"position": 8,
						// 					"attributes": [
						// 						{
						// 							"label": "5XL",
						// 							"id": "5XL",
						// 							"text": "5XL",
						// 							"value_index": 146,
						// 							"code": "size"
						// 						}
						// 					],
						// 					"is_enabled": true,
						// 					"taxable": true,
						// 					"weight": null,
						// 					"weight_unit": null,
						// 					"requires_shipping": true,
						// 					"stock": 11
						// 				}
						// 			],
						// 			"categories": [
						// 				17,
						// 				262
						// 			],
						// 			"product_options": [
						// 				{
						// 					"position": 0,
						// 					"label": "size",
						// 					"attribute_code": "size",
						// 					"swatcherType": "text",
						// 					"values": [
						// 						{
						// 							"id": "S",
						// 							"text": "S",
						// 							"value_index": 104,
						// 							"label": "S"
						// 						},
						// 						{
						// 							"id": "M",
						// 							"text": "M",
						// 							"value_index": 107,
						// 							"label": "M"
						// 						},
						// 						{
						// 							"id": "L",
						// 							"text": "L",
						// 							"value_index": 111,
						// 							"label": "L"
						// 						},
						// 						{
						// 							"id": "XL",
						// 							"text": "XL",
						// 							"value_index": 116,
						// 							"label": "XL"
						// 						},
						// 						{
						// 							"id": "2XL",
						// 							"text": "2XL",
						// 							"value_index": 122,
						// 							"label": "2XL"
						// 						},
						// 						{
						// 							"id": "3XL",
						// 							"text": "3XL",
						// 							"value_index": 129,
						// 							"label": "3XL"
						// 						},
						// 						{
						// 							"id": "4XL",
						// 							"text": "4XL",
						// 							"value_index": 137,
						// 							"label": "4XL"
						// 						},
						// 						{
						// 							"id": "5XL",
						// 							"text": "5XL",
						// 							"value_index": 146,
						// 							"label": "5XL"
						// 						}
						// 					],
						// 					"type": "selector"
						// 				}
						// 			],
						// 			"is_personalization": 0,
						// 			"handmade": 0,
						// 			"made_to_order": 0,
						// 			"personalization_optional": 0,
						// 			"personalization_description": "",
						// 			"processing_time": 7,
						// 			"approved_by": null,
						// 			"zone_id": 21606,
						// 			"created_at": "2023-09-13T10:16:22.000000Z",
						// 			"_media_gallery": [
						// 				{
						// 					"id": 6615552,
						// 					"url": "https://cdn.inspireuplift.com/uploads/images/seller_products/1694600149_new-jordan-love-bay-10-packers-2023-24-green-jersey-print-fanmade-shirt1.jpeg",
						// 					"alt": "new-jordan-love-bay-10-packers-2023-24-green-jersey-print-fanmade-shirt (1).jpeg"
						// 				},
						// 				{
						// 					"id": 6615553,
						// 					"url": "https://cdn.inspireuplift.com/uploads/images/seller_products/1694600150_new-jordan-love-bay-10-packers-2023-24-green-jersey-print-fanmade-shirt.jpeg",
						// 					"alt": "new-jordan-love-bay-10-packers-2023-24-green-jersey-print-fanmade-shirt.jpeg"
						// 				},
						// 				{
						// 					"id": 6615587,
						// 					"url": "https://cdn.inspireuplift.com/uploads/images/seller_products/1694600178_football-jersey.jpeg",
						// 					"alt": "football-jersey.jpeg"
						// 				},
						// 				{
						// 					"id": 6615585,
						// 					"url": "https://cdn.inspireuplift.com/uploads/images/seller_products/1694600177_1689827303_DJu3ws.jpeg",
						// 					"alt": "1689827303_DJu3ws.jpeg"
						// 				},
						// 				{
						// 					"id": 6615586,
						// 					"url": "https://cdn.inspireuplift.com/uploads/images/seller_products/1694600178_1692537798_c7xRTQ.png",
						// 					"alt": "1692537798_c7xRTQ.png"
						// 				}
						// 			],
						// 			"gallery_id": 3676061,
						// 			"printful_product": false,
						// 			"hasVariants": true,
						// 			"hasProductOptions": false,
						// 			"bought_with_products": []
						// 		}
						// 	]
						// }
						return await Promise.all(
							map(items, (item) => {
								console.log('item: ', item);
								const productId = item?.productId;
								const itemName = item?.itemName;
								if (!productId || !itemName) {
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
											return get(itemInfo, 'product_id') === productId;
										});
										const itemId = get(itemInfo, 'id', '')
										if (!itemId) {
											return Promise.resolve(null)
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
							return items
						})
					})
					.then((items) => {
						if (findIndex(items, (item) => !item) >= 0 || !Array.isArray(items) || !items.length) {
							const newOrder = map(orders, (o) => {
								return order.id === o.id
									? {
										...o,
										ErrorMsg: 'Cannot find items, or item has been deleted. Pls import in order detail page',
									}
									: o;
							});
							setSuccessMsg('');
							setErrorMsg('Some orders had errors when imported');
							return setOrders(newOrder);
						}
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
						console.log(orderDataForSync);
						return;
						return new Promise((resolve, reject) => {
							const settings = {
								method: 'POST',
								url: `${currentDocker?.domain
									? `${urlRestApi}/order/create`
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
									<td rowSpan={order?.ErrorMsg  ? 2 : 1}>
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
									return order?.ErrorMsg ? <tr key={get(order, 'order_number', '') + index + 'noti'}>
										<td colSpan={3}>
											<p className='text-danger text-right mb-1'>{order?.ErrorMsg}</p>
										</td>
									</tr>
										: false
								})()
							]
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
