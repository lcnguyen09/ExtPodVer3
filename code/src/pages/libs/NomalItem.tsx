import { Dispatch, SetStateAction, useEffect, useState } from 'react';
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
import { useProductPresetLazyQuery } from './../../graphql/graphql';
import Select, { StylesConfig } from 'react-select';

const colourStyles: StylesConfig = {
	control: (styles) => ({ ...styles, backgroundColor: 'white' }),
	menu: (styles) => ({ ...styles, maxHeight: '150px', overflow: 'hidden', padding: '0 6px' }),
	option: (styles) => ({ ...styles, maxHeight: '150px' }),
};

var getLocation = function (href: any) {
	var l = document.createElement('a');
	l.href = href;
	return l;
};

const convertToJpeg = function (img: any) {
	var canvas = document.createElement('canvas');
	var context = canvas.getContext('2d') as any;

	canvas.width = img.width;
	canvas.height = img.height;
	context.drawImage(img, 0, 0);
	return canvas.toDataURL('image/jpeg');
};

export default function NomalItem() {
	const {
		appMode,
		setAppHide,
		movingOnElm,
		autoPage,
		currentDocker,
		setAppLoading,
		setGraphqlForHub,
		productPresetId,
		setProductPresetId,
	} = UiContext.UseUIContext();

	// const [infoQuery] = useInfoLazyQuery({ fetchPolicy: 'network-only' });

	const [Loading, setLoading] = useState<boolean>(true);
	const [ErrorMsg, setErrorMsg] = useState('');
	const [SuccessMsg, setSuccessMsg] = useState('');
	const [HasCheck, setHasCheck] = useState<boolean>(false);

	const [productPresets, setProductPresets] = useState<any>({});
	const [productPreset, setProductPreset] = useState<any>(null);

	// const [ExtensionRule, setExtensionRule] = useState<any>(ExtRule);
	// Printbase/Shopbase

	const [item, setItem] = useState<any>({});
	const [items, setItems] = useState<Array<any>>([]);

	const [ItemImagesSelected, setItemImagesSelected] = useState<Array<string>>([]);

	const [fetchProductPresetQuery] = useProductPresetLazyQuery({ fetchPolicy: 'network-only' });
	useEffect(() => {
		setLoading(false);
		getItemInfo();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (HasCheck) {
			if (!item?.name && !items.length) {
				setAppHide(true);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [HasCheck, appMode, item?.name, items.length]);

	useEffect(() => {
		if (currentDocker?.domain && (item?.name || items.length)) {
			fetchProductPreset();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentDocker, item?.name, items.length]);

	function fetchProductPreset() {
		setLoading(true);
		setGraphqlForHub()
			.then(() => fetchProductPresetQuery({ fetchPolicy: 'network-only' }))
			.then((res: any) => {
				setProductPresets(res.data?.productPreset);
				setLoading(false);
				if (find(res.data?.productPreset, (preset) => preset?._id === productPresetId)) {
					setProductPreset(find(res.data?.productPreset, (preset) => preset?._id === productPresetId));
				}
			});
	}

	function getItemInfo(htmlDOM: any = null) {
		const item = {
			id: getOriginID(htmlDOM),
			name: getItemName(htmlDOM),
			origin_name: getItemName(htmlDOM),
			images: getItemImages(htmlDOM),
		};

		item.images = map(item.images, (imgSrc: any) => {
			console.log('imgSrc: ', imgSrc);
			if (window.location.host === 'www.temu.com' || window.location.host === 'temu.com') {
				imgSrc = head(imgSrc.split('?imageView'));
			}
			// var imageRaw = new Image();
			// imageRaw.src = imgSrc;
			// var imageConverted = new Image();

			// var canvas = document.createElement('canvas');
			// var context = canvas.getContext('2d') as any;

			// canvas.width = imageRaw.width;
			// canvas.height = imageRaw.height;
			// context.drawImage(imageRaw, 0, 0);
			// console.log(canvas.toDataURL('image/jpeg'));
			// imageConverted.src = canvas.toDataURL('image/jpeg');
			// document.body.appendChild(imageConverted);

			return imgSrc;
		});

		console.log(item);

		if (htmlDOM) {
			return item;
		}
		if (item?.name) {
			setItem(item);
			setHasCheck(true);
		} else {
			getItemsInfo();
		}
	}

	function getItemsInfo(htmlDOM: any = null) {
		if (!htmlDOM) htmlDOM = $('html');
		const getItemsFromSite = (configRules: any, index: number = 0): any => {
			const configRule = get(configRules, index, null);
			if (!configRule) {
				return [];
			}
			const items: Array<any> = [];
			$.each(
				htmlDOM.find(get(configRule, 'block', '')).first().find(get(configRule, 'loop', '')),
				(index: number, element: any) => {
					try {
						let name = '';
						if (get(configRule, 'name_attr', '') === 'text_only') {
							name = $(element)
								.find(get(configRule, 'name', ''))
								.first()
								.clone()
								.children()
								.remove()
								.end()
								.text();
						} else {
							name = $(element).find(get(configRule, 'name', '')).first().text();
						}
						name = trim(name);

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
						if (imageUrl) {
							imageUrl = imageUrl.replace('&width=30', '&width=300');
						}
						if (itemUrl) {
							items.push({
								name: name,
								itemUrl: itemUrl,
								imageUrl: imageUrl,
							});
						}
					} catch (error) {
						console.log('error: ', error);
					}
				}
			);
			if (!items.length) {
				return getItemsFromSite(configRules, index + 1);
			}
			return items;
		};
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
		return getIdFromSite(get(ExtensionRule, 'id', []));
	}

	function getItemName(htmlDOM: any = null) {
		const useVar = htmlDOM ? false : true;
		if (!htmlDOM) htmlDOM = $('html');
		if (!useVar) {
			return trim(htmlDOM.find(get(ExtensionRule, 'name', '')).first().text());
		}
		return trim(htmlDOM.find(get(ExtensionRule, 'name', '')).first().text());
	}

	function getItemImages(htmlDOM: any = null) {
		const useVar = htmlDOM ? false : true;
		if (!htmlDOM) htmlDOM = $('html');
		const getImageFromSite = (configRules: any, index: number = 0): any => {
			const configRule = get(configRules, index, null);
			if (!configRule) {
				return [];
			}
			const images: Array<any> = [];
			console.log(
				'getItemImages block',
				htmlDOM.find(get(configRule, 'block', '')).first().find(get(configRule, 'loop', ''))
			);
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
					} catch (error) {
						console.log('error: ', error);
					}
					let imgUrl = find(split(imgAttrTmp, ' '), (src) => src) as any;
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
			return images;
		};
		if (!useVar) {
			return filter(union(getImageFromSite(get(ExtensionRule, 'images', []), 0)), (imgSrc) => imgSrc);
		}
		return filter(union(getImageFromSite(get(ExtensionRule, 'images', []), 0)), (imgSrc) => imgSrc);
	}

	return (
		<>
			<Notification ErrorMsg={ErrorMsg} SuccessMsg={SuccessMsg} Loading={Loading} />
			<h3 className="text-center mb-2">Item crawl</h3>
			<hr />
			{item?.name ? (
				<div className="mt-2">
					<Row>
						{item?.id && (
							<Col sm={12} className="d-flex">
								<strong>#ID:</strong>
								<span className="mx-2">{item.id}</span>
							</Col>
						)}
						<Col sm={12}>
							<strong>Name:</strong>
						</Col>
						<Col sm={12}>
							<Input
								style={{ fontSize: 13 }}
								value={item?.name}
								onChange={(e) => setItem({ ...item, name: e.target.value })}
							></Input>
							<p style={{ fontSize: 10 }} className="mb-1">
								<strong>Origin name:</strong> {item?.origin_name}
							</p>
						</Col>
						<Col sm={12}>
							<strong>Product type:</strong>
						</Col>
						<Col sm={12}>
							<Select
								className="basic-single w-100"
								classNamePrefix="ext-select"
								placeholder="Select your hub"
								isClearable={true}
								isLoading={productPresets === null || productPresets === undefined}
								isSearchable={true}
								name="color"
								options={map(productPresets, (preset) => {
									return {
										id: get(preset, '_id', ''),
										value: get(preset, '_id', ''),
										label: (
											<div className="d-flex flex-column">
												<strong>{get(preset, 'name', '')}</strong>
											</div>
										),
									};
								})}
								styles={colourStyles}
								onChange={(data) => {
									const productPreset = find(
										productPresets,
										(preset) => preset?._id === get(data, 'id', '')
									);
									setProductPreset(productPreset);
									setProductPresetId(productPreset?._id);
								}}
								value={{
									id: productPreset?._id,
									value: productPreset?._id,
									label: productPreset?._id ? (
										<div className="d-flex flex-column">
											<strong>{get(productPreset, 'name', '')}</strong>
										</div>
									) : (
										<></>
									),
								}}
							/>
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
	const { currentUser, currentToken, templateId, productPresetId, urlRestApi, autoPage } = UiContext.UseUIContext();
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
		if (!templateId && !productPresetId) {
			return setErrorMsg('Template item ID/Product type not setup!');
		}
		if (Items.length) {
			setLoading(true);
			Items = Items.map((i) => {
				return { ...i, done: false };
			});
			setItems(Items);
			// let itemDone = [];
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
									resolve(item);
								});
						}).then(async (itemInfo: any) => {
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
										product_id: productPresetId,
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
					product_id: productPresetId,
					name: ItemTitle,
					images: ItemImages,
					origin_id: ForceCreateNew ? '' : ItemId || '',
					url: window.location.href,
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
