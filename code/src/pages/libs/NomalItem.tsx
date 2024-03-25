import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import { Button, Col, Input, Label, Row, Table } from 'reactstrap';
import { ArrowRight, Save } from 'react-feather';
import UiContext from './../../contexts/ui.context';
// import { useInfoLazyQuery } from '../../graphql/graphql';
import Notification from './../../components/Notification';
import BottomBar from './../../components/BottomBar';
import $ from 'jquery';
import { ExtRule as ExtensionRule } from './ExtRule';
import {
	clone,
	filter,
	find,
	findIndex,
	get,
	head,
	includes,
	last,
	map,
	remove,
	set,
	split,
	startsWith,
	trim,
	union,
} from 'lodash';

var getLocation = function (href: any) {
	var l = document.createElement('a');
	l.href = href;
	return l;
};

export default function NomalItem() {
	const { appMode, setAppHide, movingOnElm, autoPage } = UiContext.UseUIContext();

	// const [infoQuery] = useInfoLazyQuery({ fetchPolicy: 'network-only' });

	const [Loading, setLoading] = useState<boolean>(true);
	const [ErrorMsg, setErrorMsg] = useState('');
	const [SuccessMsg, setSuccessMsg] = useState('');
	const [HasCheck, setHasCheck] = useState<boolean>(false);

	// const [ExtensionRule, setExtensionRule] = useState<any>(ExtRule);
	const [__NEXT_DATA__, setNextData] = useState<any>({});
	// Printbase/Shopbase
	const [__INITIAL_STATE__, setInitialState] = useState<any>({});

	const [item, setItem] = useState<any>({});
	const [items, setItems] = useState<Array<any>>([]);

	// const [ItemTitle, setItemTitle] = useState('');
	// const [ItemImages, setItemImages] = useState<Array<string>>([]);
	const [ItemImagesSelected, setItemImagesSelected] = useState<Array<string>>([]);
	useEffect(() => {
		console.log('OKOKOK');
		// getRule();
		setLoading(false);
		try {
			const nextData = $('body').attr('tmp___NEXT_DATA__');
			if (nextData) setNextData(JSON.parse(nextData));
		} catch (error) {}
		try {
			const initialStateTag = $('#__INITIAL_STATE__')[0].textContent;
			if (initialStateTag) setInitialState(JSON.parse(initialStateTag));
		} catch (error) {}
		getItemInfo();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// function getRule() {
	// 	setGraphqlForAccount()
	// 		.then(() => infoQuery({ fetchPolicy: 'network-only' }))
	// 		.then((response: any) => {
	// 			setExtensionRule(response?.data?.info?.extension_rule);
	// 			setLoading(false);
	// 			console.log(response?.data?.info?.extension_rule);
	// 		});
	// }

	useEffect(() => {
		if (__INITIAL_STATE__?.product?.product?.title || __NEXT_DATA__?.props?.pageProps?.product?.title) {
			getItemInfo();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [__INITIAL_STATE__, __NEXT_DATA__]);

	useEffect(() => {
		if (HasCheck) {
			if (!item?.name && !items.length) {
				setAppHide(appMode !== 'dev');
			}
		}
	}, [HasCheck, appMode, item?.name, items.length, setAppHide]);

	// useEffect(() => {
	// 	setItemTitle(getItemName());
	// // eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [__INITIAL_STATE__.product.product.title, __NEXT_DATA__.props.pageProps.product.title]);

	// useEffect(() => {
	// 	setItemImages(getItemImages());
	// // eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [__INITIAL_STATE__.product.product.images, __NEXT_DATA__.props.pageProps.product.gallery]);

	function getItemInfo(htmlDOM: any = null) {
		console.log('Start getItemInfo');
		const item = {
			id: getOriginID(htmlDOM),
			name: getItemName(htmlDOM),
			origin_name: getItemName(htmlDOM),
			images: getItemImages(htmlDOM),
		};
		if (htmlDOM) {
			return item;
		}
		if (item?.name && item?.images?.length) {
			setItem(item);
			setHasCheck(true);
		} else {
			getItemsInfo();
		}
	}

	function getItemsInfo(htmlDOM: any = null) {
		console.log('Start getItem(s)Info');
		if (!htmlDOM) htmlDOM = $('html');
		const getItemsFromSite = (configRules: any, index: number = 0): any => {
			const configRule = get(configRules, index, null);
			if (!configRule) {
				return [];
			}
			const items: Array<any> = [];
			console.log(htmlDOM.find(get(configRule, 'block', '')).first());
			$.each(
				htmlDOM.find(get(configRule, 'block', '')).first().find(get(configRule, 'loop', '')),
				(index: number, element: any) => {
					console.log('element: ', element);
					const name = trim($(element).find(get(configRule, 'name', '')).first().text());
					let itemUrl = $(element)
						.find(get(configRule, 'url', ''))
						.first()
						.attr(get(configRule, 'url_attr', 'href')) as any;
					if (itemUrl && itemUrl.startsWith('/')) {
						itemUrl = window.location.origin + itemUrl;
					}
					let imageUrl = $(element)
						.find(get(configRule, 'image', ''))
						.first()
						.attr(get(configRule, 'image_attr', 'src')) as any;
					if (imageUrl && imageUrl.startsWith('//')) {
						imageUrl = window.location.protocol + imageUrl;
						imageUrl = head(imageUrl.split(' ')) || '';
					} else if (imageUrl && imageUrl.startsWith('/')) {
						imageUrl = window.location.origin + imageUrl;
						imageUrl = head(imageUrl.split(' ')) || '';
					}
					if (itemUrl) {
						items.push({
							name: name,
							itemUrl: itemUrl,
							imageUrl: imageUrl,
						});
					}
				}
			);
			if (!items.length) {
				return getItemsFromSite(configRules, index + 1);
			}
			console.log(`%c=======>>> Get Items, Use configRules ==> ${index}`, 'background: #222; color: #bada55');
			return items;
		};
		try {
			// Shopbase/Printbase
			const items = __INITIAL_STATE__.product.products.collection.items.map((item: any) => {
				return {
					name: item.title,
					itemUrl: window.location.origin + '/products/' + item.handle,
					imageUrl: head(map(item.images, (image) => image.src)),
					images: map(item.images, (image) => image.src),
					id: item.id,
					done: true,
				};
			});
			setItems(items);
			setHasCheck(true);
			return;
		} catch (error) {}
		const items = getItemsFromSite(get(ExtensionRule, 'items', []));
		setItems(
			map(items, (item) => {
				return {
					...item,
					checked: autoPage,
				};
			})
		);
		setHasCheck(true);
	}

	function getOriginID(htmlDOM: any = null) {
		const useVar = htmlDOM ? false : true;
		if (!htmlDOM) htmlDOM = $('html');
		const getIdFromSite = (configRules: any, index: number = 0): any => {
			const configRule = get(configRules, index, null);
			if (!configRule) {
				return '';
			}
			return (
				htmlDOM.find(get(configRule, 'block', '')).first()[get(configRule, 'attr', '')]() ||
				getIdFromSite(configRules, index + 1)
			);
		};
		if (!useVar) {
			return getIdFromSite(get(ExtensionRule, 'id', []));
		}
		return __INITIAL_STATE__?.product?.product?.id
			? __INITIAL_STATE__?.product?.product?.id
			: getIdFromSite(get(ExtensionRule, 'id', []));
	}

	function getItemName(htmlDOM: any = null) {
		const useVar = htmlDOM ? false : true;
		if (!htmlDOM) htmlDOM = $('html');
		// let __INITIAL_STATE__ = null;
		// let __NEXT_DATA__ = null;
		// try {
		// 	const nextData = $('body').attr('tmp___NEXT_DATA__');
		// 	if (nextData) __NEXT_DATA__ = JSON.parse(nextData);
		// } catch (error) {}
		// try {
		// 	const initialStateTag = $('#__INITIAL_STATE__')[0].textContent;
		// 	if (initialStateTag) __INITIAL_STATE__ = JSON.parse(initialStateTag);
		// } catch (error) {}
		if (!useVar) {
			return trim(htmlDOM.find(get(ExtensionRule, 'name', '')).first().text());
		}
		console.log(htmlDOM.find(get(ExtensionRule, 'name', '')).first());
		return __INITIAL_STATE__?.product?.product?.title
			? __INITIAL_STATE__?.product?.product?.title
			: __NEXT_DATA__?.props?.pageProps?.product?.title
			? __NEXT_DATA__?.props?.pageProps?.product?.title
			: trim(htmlDOM.find(get(ExtensionRule, 'name', '')).first().text());
	}

	function getItemImages(htmlDOM: any = null) {
		console.log('Start getItemImages');
		const useVar = htmlDOM ? false : true;
		if (!htmlDOM) htmlDOM = $('html');
		const getImageFromSite = (configRules: any, index: number = 0): any => {
			console.log('Start getImageFromSite');
			const configRule = get(configRules, index, null);
			if (!configRule) {
				return [];
			}
			console.log(htmlDOM.find(get(configRule, 'block', '')).first());
			console.log(htmlDOM.find(get(configRule, 'block', '')).first().find(get(configRule, 'loop', '')));
			const images: Array<any> = [];
			$.each(
				htmlDOM.find(get(configRule, 'block', '')).first().find(get(configRule, 'loop', '')),
				(idx: number, element: any) => {
					console.log('element: ', element);
					const attrIndex = findIndex(get(configRule, 'attr', []), (attr: any) => {
						return $(element).attr(attr);
					});
					let imgAttrTmp = $(element).attr(get(configRule, ['attr', attrIndex], '')) as any;
					try {
						var l = getLocation(imgAttrTmp);
						const params = new URLSearchParams(l.search);
						params.delete('width');
						l.search = params.toString();
						imgAttrTmp = l.toString();
						console.log('imgAttrTmp: ', imgAttrTmp);
					} catch (error) {
						console.log('error: ', error);
					}
					let imgUrl = find(split(imgAttrTmp, ' '), (src) => src) as any;
					console.log('imgUrl: ', imgUrl);
					try {
						if (imgUrl && imgUrl.match(/{width}x/gim)) {
							let size = '180';
							if ($(element).attr('data-widths')) {
								const sizes = JSON.parse($(element).attr('data-widths') as any);
								size = last(sizes) as any;
							}
							imgUrl = imgUrl.replace('{width}x', `${size}x`);
						}
					} catch (error) {}
					images.push(imgUrl);
				}
			);
			if (!images.length) {
				return getImageFromSite(configRules, index + 1);
			}
			console.log(`%c=======>>> Get Images, Use configRules ==> ${index}`, 'background: #222; color: #bada55');
			return images;
		};
		if (!useVar) {
			return filter(union(getImageFromSite(get(ExtensionRule, 'images', []), 0)), (imgSrc) => imgSrc);
		}
		return __INITIAL_STATE__?.product?.product?.images
			? filter(
					map(__INITIAL_STATE__?.product?.product?.images, (image) => image?.src),
					(imgSrc) => imgSrc
			  )
			: __NEXT_DATA__?.props?.pageProps?.product?.gallery
			? filter(
					map(__NEXT_DATA__?.props?.pageProps?.product?.gallery, (image) => image?.src),
					(imgSrc) => imgSrc
			  )
			: filter(union(getImageFromSite(get(ExtensionRule, 'images', []), 0)), (imgSrc) => imgSrc);
	}

	return (
		<>
			<Notification ErrorMsg={ErrorMsg} SuccessMsg={SuccessMsg} Loading={Loading} />
			<h3 className="text-center">Item crawl</h3>

			{item?.name ? (
				<div className="mt-2">
					{item?.id ? (
						<div className="d-flex">
							<strong>#ID:</strong>
							<span className="mx-2">{item?.id}</span>
						</div>
					) : (
						false
					)}
					<Row>
						<Col sm={12}>
							<strong>Name:</strong>
						</Col>
						<Col sm={12}>
							<Input
								style={{ fontSize: 13 }}
								value={item?.name}
								onChange={(e) => setItem({ ...item, name: e.target.value })}
							></Input>
							<p style={{ fontSize: 10 }}>
								<strong>Origin name:</strong> {item?.origin_name}
							</p>
						</Col>
					</Row>
					<Row>
						<Col sm={12} className="mt-2">
							<strong>Images:</strong>
						</Col>
						{map(
							filter(
								map(item?.images, (img) =>
									startsWith(img, '//') ? window.location.protocol + img : img
								),
								(img) => !startsWith(img, 'data:image')
							),
							(img, index) => {
								return (
									<Col sm={4} className="mb-2 px-1 ext-imgs-list" key={index}>
										<img
											src={img}
											alt={img}
											width="100%"
											height="100%"
											className={`cursor-pointer border rounded border-3 ${
												includes(ItemImagesSelected, img) ? 'border-success' : ''
											}`}
											onClick={(e) => {
												if (includes(ItemImagesSelected, img)) {
													const oldItemImagesSelected = clone(ItemImagesSelected);
													remove(oldItemImagesSelected, (i) => i === img);
													setItemImagesSelected(oldItemImagesSelected);
												} else {
													setItemImagesSelected(union([...ItemImagesSelected, img]));
												}
											}}
										/>
									</Col>
								);
							}
						)}
					</Row>
				</div>
			) : (
				<div className="mt-2">
					<Table bordered>
						<thead>
							<tr>
								<th>
									<Input
										id="checkall"
										type="checkbox"
										value="checkall"
										onChange={(e: any) => {
											setItems(
												map(items, (item) =>
													item?.status === 'Done' ||
													item?.status === 'Exist' ||
													item?.status === 'Error' ||
													!item?.itemUrl
														? item
														: { ...item, checked: e.target.checked }
												)
											);
										}}
										checked={!!(filter(items, (item) => item?.checked).length === items.length)}
										disabled={false}
									/>
								</th>
								<th className="text-center">Item</th>
							</tr>
						</thead>
						<tbody>
							{map(items, (item, index) => {
								return (
									<tr key={index} id={item?.name}>
										<td width={30}>
											<Input
												id={`item-${index}`}
												type="checkbox"
												value={`item-${index}`}
												onChange={(e: any) => {
													setItems(
														map(items, (item, idx) =>
															index === idx ? { ...item, checked: !item?.checked } : item
														)
													);
												}}
												checked={!!item?.checked}
												disabled={
													item?.status === 'Done' ||
													item?.status === 'Exist' ||
													item?.status === 'Error' ||
													!item?.itemUrl
												}
											/>
										</td>
										<td>
											<div
												className="d-flex flex-row align-items-center cursor-pointer"
												onClick={(e) => {
													e.preventDefault();
													if (item?.itemUrl) {
														if ($(`a[href="${item?.itemUrl}"]`)) {
															movingOnElm(`a[href="${item?.itemUrl}"]`);
															const oldBorder = $(`a[href="${item?.itemUrl}"]`).css(
																'border'
															);
															$(`a[href="${item?.itemUrl}"]`).css(
																'border',
																'1px solid blue'
															);
															setTimeout(() => {
																$(`a[href="${item?.itemUrl}"]`).css(
																	'border',
																	oldBorder
																);
															}, 2000);
														}
														const sortUrl = item?.itemUrl.replace(
															window.location.origin,
															''
														);
														if ($(`a[href="${sortUrl}"]`)) {
															movingOnElm(`a[href="${sortUrl}"]`);
															const oldBorder = $(`a[href="${sortUrl}"]`).css('border');
															$(`a[href="${sortUrl}"]`).css('border', '1px solid blue');
															setTimeout(() => {
																$(`a[href="${sortUrl}"]`).css('border', oldBorder);
															}, 2000);
														}
													}
												}}
											>
												<img
													style={{ minWidth: '60px', width: '60px' }}
													src={item?.imageUrl}
													alt="Poduct img"
												/>
												<span
													className={`p-1 ${item?.status === 'Done' ? 'text-success' : ''} ${
														item?.status === 'Exist' ? 'text-warning' : ''
													} ${item?.status === 'Error' ? 'text-danger' : ''}`}
													style={{ textAlign: 'justify' }}
												>
													{item?.name}
													{item?.status ? ` - ${item?.status}` : ''}
												</span>
											</div>
										</td>
									</tr>
								);
							})}
						</tbody>
					</Table>
				</div>
			)}

			<BottomBar>
				<NomalItemSave
					Loading={Loading}
					setLoading={setLoading}
					ItemId={item?.id}
					ItemTitle={item?.name}
					ItemImages={ItemImagesSelected}
					Items={items}
					getItemInfo={getItemInfo}
					setSuccessMsg={setSuccessMsg}
					setErrorMsg={setErrorMsg}
					setItems={setItems}
				/>
			</BottomBar>
		</>
	);
}

function NomalItemSave({
	Loading,
	setLoading,
	ItemId,
	ItemTitle,
	ItemImages,
	Items,
	getItemInfo,
	setSuccessMsg,
	setErrorMsg,
	setItems,
}: {
	Loading: any;
	setLoading: Dispatch<SetStateAction<boolean>>;
	ItemId: any;
	ItemTitle: string;
	ItemImages: Array<string>;
	Items: Array<any>;
	getItemInfo: any;
	setSuccessMsg: Dispatch<SetStateAction<string>>;
	setErrorMsg: Dispatch<SetStateAction<string>>;
	setItems: Dispatch<SetStateAction<Array<any>>>;
}) {
	const { currentUser, currentToken, templateId, urlRestApi, autoPage } = UiContext.UseUIContext();
	const [ForceCreateNew, setForceCreateNew] = useState<boolean>(false);

	useEffect(() => {
		if (autoPage && Items.length && !Loading) {
			handleSave();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [autoPage, Items]);

	const handleNext = async () => {
		(head($("a[rel='next']").first()) as any).click();
	};

	const handleSave = async () => {
		if (!templateId) {
			return setErrorMsg('Template item ID not setup!');
		}
		if (Items.length) {
			setLoading(true);
			Items = Items.map((i) => {
				return { ...i, done: false };
			});
			setItems(Items);
			// let itemDone = [];
			console.log(Items);
			while (find(Items, (item) => !item.done && item.checked && item.itemUrl)) {
				let item = find(Items, (item) => !item.done && item.checked && item.itemUrl);
				if (item?.itemUrl) {
					if ($(`a[href="${item?.itemUrl}"]`)) {
						// movingOnElm(`a[href="${item?.itemUrl}"]`);
						$(`a[href="${item?.itemUrl}"]`).css('border', '1px solid blue');
					}
					const sortUrl = item?.itemUrl.replace(window.location.origin, '');
					if ($(`a[href="${sortUrl}"]`)) {
						// movingOnElm(`a[href="${sortUrl}"]`);
						$(`a[href="${sortUrl}"]`).css('border', '1px solid blue');
					}
				}

				let index = findIndex(Items, (item) => !item.done && item.checked && item.itemUrl);
				// eslint-disable-next-line no-loop-func
				await new Promise((resolve) => {
					var settings = {
						url: `${urlRestApi}/item-clone-check`,
						data: {
							url: item?.itemUrl,
						},
						method: 'GET',
						timeout: 0,
						headers: {
							Authorization: `Bearer ${currentToken.token}`,
						},
					};
					$.ajax(settings)
						.done((response) => {
							if (response?.data === 'Item has exist!') {
								set(Items, [index, 'done'], true);
								set(Items, [index, 'status'], 'Exist');
								setItems(Items);
								console.log(
									`%c=======>>> ${get(item, 'name', '')} ==> ${get(response, 'data', '')}`,
									'background: #222; color: #c73c3c'
								);
								if (item?.itemUrl) {
									if ($(`a[href="${item?.itemUrl}"]`)) {
										// movingOnElm(`a[href="${item?.itemUrl}"]`);
										$(`a[href="${item?.itemUrl}"]`).css('border', '1px solid orange');
									}
									const sortUrl = item?.itemUrl.replace(window.location.origin, '');
									if ($(`a[href="${sortUrl}"]`)) {
										// movingOnElm(`a[href="${sortUrl}"]`);
										$(`a[href="${sortUrl}"]`).css('border', '1px solid orange');
									}
								}
								resolve(true);
							} else {
								resolve(false);
							}
						})
						.fail((error) => {
							console.log('error: ', error);
							resolve('next');
						});
					// eslint-disable-next-line no-loop-func
				}).then((exist) => {
					if (exist !== true) {
						return new Promise((resolve) => {
							$.ajax({
								url: item.itemUrl,
								method: 'GET',
							})
								.done((res) => {
									const el = document.createElement('html');
									el.innerHTML = res;
									const detailDom = $(el);
									const itemInfo = getItemInfo(detailDom);
									resolve({
										...item,
										...itemInfo,
									});
								})
								.fail((error) => {
									console.log('error: ', error);
									resolve(item);
								});
						}).then(async (itemInfo: any) => {
							console.log('itemInfo: ', itemInfo);
							if (!itemInfo) {
								return Promise.resolve('99');
							}
							if (!itemInfo?.images || !itemInfo?.images?.length) {
								itemInfo.images = [itemInfo?.imageUrl];
							}

							if (!itemInfo || !itemInfo?.name || !itemInfo?.images || !itemInfo?.images?.length) {
								set(Items, [index, 'status'], 'Error');
								set(Items, [index, 'done'], true);
								setItems(Items);
								return Promise.resolve(false);
							}
							return new Promise((resolve) => {
								var settings = {
									url: `${urlRestApi}/item-clone`,
									data: {
										id: templateId,
										name: itemInfo?.name,
										url: itemInfo?.itemUrl,
										images: itemInfo?.images,
										origin_id: ForceCreateNew ? '' : itemInfo?.id || '',
									},
									method: 'GET',
									timeout: 0,
									headers: {
										Authorization: `Bearer ${currentToken.token}`,
									},
								};
								$.ajax(settings)
									.done((response) => {
										set(Items, [index, 'done'], true);
										if (get(response, 'data', '').includes('OK, New Identity is')) {
											set(Items, [index, 'status'], 'Done');
											console.log(
												`%c=======>>> ${get(itemInfo, 'name', '')} ==> ${get(
													response,
													'data',
													''
												)}`,
												'background: #222; color: #bada55'
											);
											resolve('0');
										} else if (get(response, 'data', '') === 'Item not found!') {
											setErrorMsg('Template item ID not setup!');
											Items = Items.map((i) => {
												return { ...i, done: true };
											});
											setItems(Items);
											resolve('1');
										} else if (get(response, 'data', '') === 'Item has exist!') {
											set(Items, [index, 'status'], 'Exist');
											console.log(
												`%c=======>>> ${get(itemInfo, 'name', '')} ==> ${get(
													response,
													'data',
													''
												)}`,
												'background: #222; color: #c73c3c'
											);
											resolve('2');
										}
										setItems(Items);
									})
									.fail(function () {
										set(Items, [index, 'done'], true);
										setItems(Items);
										resolve('3');
									});
							}).then((res) => {
								let color = 'blue';
								switch (res) {
									case '0':
										color = 'green';
										break;
									case '1':
										color = 'red';
										break;
									case '2':
										color = 'orange';
										break;
									case '3':
										color = 'red';
										break;
									default:
										break;
								}

								if (itemInfo?.itemUrl) {
									if ($(`a[href="${itemInfo?.itemUrl}"]`)) {
										// movingOnElm(`a[href="${itemInfo?.itemUrl}"]`);
										$(`a[href="${itemInfo?.itemUrl}"]`).css('border', '1px solid ' + color);
									}
									const sortUrl = itemInfo?.itemUrl.replace(window.location.origin, '');
									if ($(`a[href="${sortUrl}"]`)) {
										// movingOnElm(`a[href="${sortUrl}"]`);
										$(`a[href="${sortUrl}"]`).css('border', '1px solid ' + color);
									}
								}
								return res;
							});
						});
					}
				});
			}
			setLoading(false);
			handleNext();
		} else {
			if (!ItemTitle) {
				return setErrorMsg('Item name not found!');
			}
			if (!ItemImages.length) {
				return setErrorMsg('Item images not found!');
			}
			setLoading(true);
			var settings = {
				url: `${urlRestApi}/item-clone`,
				data: {
					id: templateId,
					name: ItemTitle,
					images: ItemImages,
					origin_id: ForceCreateNew ? '' : ItemId || '',
				},
				method: 'GET',
				timeout: 0,
				headers: {
					Authorization: `Bearer ${currentToken.token}`,
				},
			};

			$.ajax(settings)
				.done(function (response) {
					const data = response?.data;
					setLoading(false);
					setSuccessMsg('');
					setErrorMsg('');
					if (typeof data === 'string') {
						if (data && data.includes('OK, New Identity is')) {
							setSuccessMsg('Item saved successfully!');
						} else {
							if (data.includes('Item not found!')) {
								setErrorMsg('Template item ID not setup!');
							} else {
								setErrorMsg(data);
							}
						}
					} else {
						setErrorMsg('Try again later!');
					}
				})
				.fail((e) => {
					console.log('e: ', e);
					setLoading(false);
				});
		}
	};
	return (
		<div className="d-flex align-items-center">
			<div className="h-100 d-flex align-items-center">
				<Input
					id="forceCreateNew"
					type="checkbox"
					value="forceCreateNew"
					onChange={(e: any) => {
						setForceCreateNew(e.target.checked);
					}}
					checked={ForceCreateNew}
					disabled={false}
				/>
				<Label for="forceCreateNew" className="m-1">
					Ignore check loop item by ID
				</Label>
			</div>
			<Button
				disabled={!ItemImages.length && !filter(Items, (item) => item.checked).length}
				size="xs"
				color="success"
				className="py-1 d-flex justify-content-center align-items-center"
				onClick={handleSave}
			>
				<Save size={14} /> <span style={{ marginLeft: '3px' }}>Save</span>
			</Button>
			{currentUser?.email === 'lechinguyen09@gmail.com' ? (
				<Button
					size="xs"
					color="primary"
					className="py-1 d-flex justify-content-center align-items-center"
					onClick={handleNext}
				>
					<ArrowRight size={14} /> <span style={{ marginLeft: '3px' }}>Next</span>
				</Button>
			) : (
				false
			)}
		</div>
	);
}
