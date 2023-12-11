import { useEffect, useState } from 'react';
import { Button, Col, Input, Label, Row, Spinner } from 'reactstrap';
import { PlusCircle } from 'react-feather';
import UiContext from './../../../contexts/ui.context';
import { useItemsInfoLazyQuery, usePutItemToStoreMutation } from '../../../graphql/graphql';
import Notification from './../../../components/Notification';
import BottomBar from './../../../components/BottomBar';
import $ from 'jquery';
import { cloneDeep, filter, find, flatMapDeep, get, head, map, startsWith, toLower, toUpper, trim } from 'lodash';
import Select, { StylesConfig } from 'react-select';

const colourStyles: StylesConfig = {
	control: (styles) => ({ ...styles, backgroundColor: 'white' }),
	menu: (styles) => ({ ...styles, maxHeight: '150px', overflow: "hidden", padding: '0 6px' }),
	option: (styles) => ({ ...styles, maxHeight: "150px" })
};

export default function ({ Identifier, storeData }: any) {
	const {
		appMode,
		sleep,
		$x,
		movingOnElm,
		fillTextInput,
		fillTextArea,
		fillSelect,
		fillCheckbox,
		clickButton,
		clickXButton,
		fillInputFile,
		urlGraphql,
		setGraphqlForHub,
		autoSave,
		setAutoSave,
		extendShippingPrice,
		setExtendShippingPrice
	} = UiContext.UseUIContext();

	const [itemsInfoQuery] = useItemsInfoLazyQuery({ fetchPolicy: 'network-only' });
	const [putItemToStoreMutation] = usePutItemToStoreMutation({ fetchPolicy: 'network-only' });

	const { currentDocker, currentToken } = UiContext.UseUIContext();

	const [site, setSite] = useState(window.location.host);
	const [pathname, setPathname] = useState(window.location.pathname);

	const [Loading, setLoading] = useState<boolean>(false);
	const [ErrorMsg, setErrorMsg] = useState<any>('');
	const [SuccessMsg, setSuccessMsg] = useState<any>('');
	const [WarningMsg, setWarningMsg] = useState<any>([]);

	const [itemId, setItemId] = useState<string>('');
	const [itemInfo, setItemInfo] = useState<any>();
	const [itemTypes, setItemTypes] = useState<any>([]);
	const [currentType, setCurrentType] = useState<any>({});
	const [onFillData, setOnFillData] = useState<boolean>(false);

	useEffect(() => {
		setLoading(false);
		handleGetTypeData()
	}, []);

	useEffect(() => {
		if (itemInfo) {
			handleFillData();
		}
	}, [itemInfo]);

	useEffect(() => {
		setSite(window.location.host);
	}, [window.location.host]);

	useEffect(() => {
		setPathname(window.location.pathname);
	}, [window.location.pathname, window.location.href]);

	const handleGetTypeData = () => {
		var settings = {
			"url": `https://api-${currentDocker?.domain}.${currentDocker?.server}/graphql`,
			"method": "POST",
			"timeout": 0,
			"headers": {
				"authority": "api-lcn-test.podorders.store",
				"accept": "application/json, text/plain, */*",
				"accept-language": "vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5",
				"authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImxlY2hpbmd1eWVuMDlAZ21haWwuY29tIiwicGFzc3dvcmQiOiJhYmMxMjMiLCJ2YWxpZCI6bnVsbH0.H35smLgIHOOp0l21kIfSFU0HzVFCa-h9pbhKSTDou40",
				"content-type": "application/json",
				"sec-ch-ua": "\"Not_A Brand\";v=\"8\", \"Chromium\";v=\"120\", \"Google Chrome\";v=\"120\"",
				"sec-ch-ua-mobile": "?0",
				"sec-ch-ua-platform": "\"macOS\"",
				"sec-fetch-dest": "empty",
				"sec-fetch-mode": "cors",
				"sec-fetch-site": "same-site",
				"user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
				"x-page": "1",
				"x-per-page": "-1",
				"x-requested-with": "XMLHttpRequest",
				"x-time": "09-12-2023 20:13:59.5180"
			},
			"data": JSON.stringify({
				"query": "query { productPreset (_id:\"\",name:\"\",provider:\"\",category:\"\",favorite:false)  { _id,id,name,raw_name,image,description,provider, prety_attributes   { attribute_type,plf_attribute_name, options   { ffm_value,plf_value,plf_price,hex,default } }, attribute_specifics   { sale_price,base_price, name_value   { name,type,value },fix_profit,fixed_profit }, specifics   { key,value,required },fix_profit,fixed_profit,tax_fee_fix,tax_fee,min_price,max_price,category,size_chart,shipping_preset, platform_category   { type, category_selected   { id,level,name,parent } },shipping_cost,shipping_additional_cost,international_shipping_cost,international_shipping_additional_cost,provider_id,print_area_id, platform_specifics   { platform, specifics   { key,value,required } }, print_areas   { position,print },type,print_template,weight,package_width,package_height,package_length, extend_images   { src },price_addition,price,favorite,mockup_count,tags,collections, shipping_preset_info {\n    dispatch_time_max\n    shipping_time_max\n    location\n    location_detail\n    country\n    shipping_service\n    shipping_cost\n    shipping_additional_cost\n    return_accept\n    global_shipping\n    international_shipping_time_max\n    international_location\n    international_shipping_service\n    international_shipping_cost\n    international_shipping_additional_cost\n    international_return_accept\n    default_quantity} }}"
			}),
		};

		$.ajax(settings).done((response) => {
			setItemTypes(response?.data?.productPreset)
		});

	}

	const handleClearData = async () => {
		return new Promise(async (resolve, reject) => {
			let index = 0;
			if ($(`img[src="/images/icons/cancel-icon.svg"]`).length) {
				const promisesAttrClear: any = [];
				index = 0;
				while ($(`img[src="/images/icons/cancel-icon.svg"]`)[index]) {
					await sleep(2000);
					await clickButton(`img[src="/images/icons/cancel-icon.svg"]`);
					await sleep(1000);
					await clickButton(`button.rrt-ok-btn`);
					index++;
				}
				await sleep(1000);
			}

			if ($(`img[src="/images/icons/red-cross.svg"]`).length) {
				index = 0;
				while ($(`img[src="/images/icons/red-cross.svg"]`)[index]) {
					await sleep(500);
					await clickButton(`img[src="/images/icons/red-cross.svg"]`);
					index++;
				}
				await sleep(3000);
			}

			resolve(true);
		});
	};

	const isErrorVariation = (varSpec: any, pretAttr: any) =>
		find(get(varSpec, 'name_value', []), (nvl) => {
			const name = get(nvl, 'name', '');
			const value = get(nvl, 'value', '');
			const nameForCheck = find(pretAttr, (pattr) => pattr.plf_attribute_name === name);
			const valueForCheck = find(get(nameForCheck, 'options', []), (op) => op.plf_value === value);
			if (!valueForCheck) return true;
			return !get(valueForCheck, 'default', false);
		});

	const handleFillData = async () => {
		let index = 0;
		setErrorMsg('');
		setSuccessMsg('');
		setWarningMsg([]);
		console.log("itemInfo", itemInfo);
		console.log("currentType", currentType);
		let itemInfoMap = itemInfo
		let dataType = cloneDeep(currentType);
		if (dataType && dataType?._id) {
			itemInfoMap = {
				...itemInfo,
				description: get(dataType, 'description', ''),
				shipping_preset_info: get(dataType, 'shipping_preset_info', {}),
				price: get(dataType, 'price', ''),
				attribute_specifics: get(dataType, 'attribute_specifics', ''),//
				attribute_specifics_modify: filter(
					dataType.attribute_specifics,
					(aSpec) => !isErrorVariation(aSpec, dataType.prety_attributes)
				),
				include_size_chart: true,
				size_chart: get(dataType, 'size_chart', ''),
				include_extend_images: true,
				extend_images: get(dataType, 'extend_images', ''),
				platform_category: get(dataType, 'platform_category', []),
				prety_attributes: map(get(dataType, 'prety_attributes', ''), pAttr => {
					return {
						...pAttr,
						options: filter(get(pAttr, 'options', []), option => option?.default)
					}
				}),
			}
			console.log("itemInfoMap", itemInfoMap)
		}

		let errorMsg = [];
		if (
			!Array.isArray(get(itemInfoMap, 'prety_attributes', [])) ||
			get(itemInfoMap, 'prety_attributes', []).length > 3
		) {
			errorMsg.push('Too many variant');
		}
		if (get(itemInfoMap, 'name', '').length > 120) {
			errorMsg.push('Item title is too long');
		}

		if (get(itemInfoMap, 'description', '').length > 3000) {
			errorMsg.push('Item description is too long');
		}
		let shippingCost = get(itemInfoMap, ['shipping_preset_info', 'shipping_cost'], '') ? get(itemInfoMap, ['shipping_preset_info', 'shipping_cost'], '') : '5'
		shippingCost = parseFloat(shippingCost)
		let internationalShippingCost = get(itemInfoMap, ['shipping_preset_info', 'international_shipping_cost'], '') ? get(itemInfoMap, ['shipping_preset_info', 'international_shipping_cost'], '') : '9'
		const isWorldWideShip = get(itemInfoMap, ['shipping_preset_info', 'global_shipping'], '') === 'Accepted' || !get(itemInfoMap, 'shipping_preset_info');

		if (isWorldWideShip) {
			if (!head($x(`//option[text()="World Wide"]`))) {
				errorMsg.push('Shipping Zone is no option to ship World Wide');
			}
		} else {
			if (!head($x(`//option[text()="United States"]`)) && !head($x(`//option[text()="US"]`))) {
				errorMsg.push('Shipping Zone is no option to ship to (US/United States)');
			}
		}

		if (errorMsg.length) {
			return setErrorMsg(errorMsg);
		}
		setOnFillData(true);
		let minPrice = parseFloat(itemInfoMap?.price);
		let maxPrice = parseFloat(itemInfoMap?.price);
		const prices = map(itemInfoMap?.attribute_specifics_modify, (attribute_specifics) =>
			parseFloat(attribute_specifics.sale_price)
		);
		if (prices.length) {
			minPrice = Math.min.apply(Math, prices) + (extendShippingPrice ? shippingCost : 0);
			maxPrice = Math.max.apply(Math, prices) + (extendShippingPrice ? shippingCost : 0);
		}
		// let minBasePrice = parseFloat(itemInfo?.price);
		// const basePrices = map(itemInfo?.attribute_specifics_modify, (attribute_specifics) =>
		// 	parseFloat(attribute_specifics.base_price)
		// );
		// if (basePrices.length) {
		// 	minBasePrice = Math.min.apply(Math, basePrices);
		// }

		let titleReplace = get(itemInfoMap, 'name', '');
		titleReplace = titleReplace.replace(/(\[Your Company Name\])/g, '');
		titleReplace = filter(titleReplace.replaceAll(/[\~\`\@\#\$\%\^\+\=\{\}\[\]\;\<\>\?]/gi, '').split(" "), a => a).join(" ")

		let description = get(itemInfoMap, 'description', '');
		description = description.replace(/PRODUCT_HEADER/g, '');
		description = description.replace(/PRODUCT_FOOTER/g, '');
		description = description.replace(/{{PRODUCT_TITLE}}/g, get(itemInfoMap, 'name', ''));
		description = description.replace(/{{PRODUCT_NAME}}/g, get(itemInfoMap, 'name', ''));
		description = description.replace(/PRODUCT_NAME/g, get(itemInfoMap, 'name', ''));

		let pictures = flatMapDeep(get(itemInfoMap, 'images', []), (img) => get(img, 'src', ''));
		if (
			itemInfoMap.include_size_chart &&
			itemInfoMap.size_chart &&
			itemInfoMap.size_chart !== '' &&
			itemInfoMap.size_chart !== null &&
			startsWith(itemInfoMap.size_chart, 'http')
		) {
			pictures = [...pictures, itemInfoMap.size_chart];
		}
		if (itemInfoMap.include_extend_images && itemInfoMap.extend_images && Array.isArray(itemInfoMap.extend_images)) {
			pictures = [
				...pictures,
				...map(
					filter(itemInfoMap.extend_images, (image) => {
						return image.src && image.src !== '' && image.src !== null && startsWith(image.src, 'http');
					}),
					(image) => {
						return image.src;
					}
				),
			];
		}

		const dispatchTime = get(itemInfoMap, ['shipping_preset_info', 'dispatch_time_max'], 5);

		const platform_category = get(
			find(itemInfoMap?.platform_category, (pcate) => {
				return pcate?.type === 'Inspireuplift';
			}),
			'category_selected',
			[]
		);

		if (!platform_category.length) {
			setErrorMsg('The product does not belong to any category, please set up a category');
		}

		await handleClearData();

		await fillTextInput(`input#product-title[name="title"]`, titleReplace);
		// !&*()_-./\|,.
		await fillTextInput(`input#product-price[name="price"]`, minPrice.toFixed(2));

		if (isWorldWideShip) {
			await fillSelect(`select[name="zone_id"]`, 'World Wide');
		} else {
			if (head($x(`//option[text()="United States"]`))) {
				await fillSelect(`select[name="zone_id"]`, 'United States');
			} else {
				await fillSelect(`select[name="zone_id"]`, 'US');
			}
		}
		await fillSelect(`select[name="processing_time"]`, dispatchTime + ' days');
		await fillCheckbox(`input#sell-stock[name="continueSelling"][type="checkbox"]`, true);
		if (Array.isArray(itemInfoMap?.prety_attributes) && itemInfoMap?.prety_attributes.length) {
			await fillCheckbox(`input#shippment-detail[name="hasProductOptions"][type="checkbox"]`, true);
		}
		const determinedAttrs = filter(itemInfoMap?.prety_attributes, (prety_attribute, index) => {
			return prety_attribute?.attribute_type === 'Color' || prety_attribute?.attribute_type === 'Size';
		});
		const undefinedAttrs = filter(itemInfoMap?.prety_attributes, (prety_attribute, index) => {
			return prety_attribute?.attribute_type !== 'Color' && prety_attribute?.attribute_type !== 'Size';
		});
		index = 0;
		const allAttr = [...determinedAttrs, ...undefinedAttrs];
		while (allAttr[index]) {
			if (index) {
				const prety_attribute = allAttr[index];
				let selector = `//button[text()="Add Option"]`;
				if (prety_attribute?.attribute_type !== 'Color' && prety_attribute?.attribute_type !== 'Size') {
					selector = `//button[text()="Add Custom Option"]`;
				}
				await sleep(100);
				await clickXButton(selector);
			}
			index++;
		}

		index = 0;
		while (determinedAttrs[index]) {
			const prety_attribute = determinedAttrs[index];
			const elm = head($(`option[value="${toLower(prety_attribute?.attribute_type)}"]:eq(${index})`)) as any;
			await sleep(150);
			await fillSelect(elm.parentElement, prety_attribute?.attribute_type);
			index++;
		}

		index = 0;
		while (undefinedAttrs[index]) {
			const prety_attribute = undefinedAttrs[index];
			await sleep(150);
			await fillTextInput(`input#option-title:eq(${index})`, prety_attribute?.attribute_type);
			index++;
		}

		let quantity = Array.isArray(itemInfoMap?.attribute_specifics_modify)
			? itemInfoMap?.attribute_specifics_modify.length * 20
			: 99;
		await fillTextInput(`input#product-available-inventory`, quantity ? quantity : 1);

		await sleep(2000);
		index = 0;
		while (allAttr[index]) {
			const prety_attribute = allAttr[index];
			let idx = 0;
			const options = get(prety_attribute, 'options', []);
			while (options[idx]) {
				const op = options[idx];
				await sleep(300);
				await ($(`input.ReactTags__tagInputField:eq(${index})`).first() as any)?.focus();
				await fillTextInput(`input.ReactTags__tagInputField:eq(${index})`, op?.plf_value);
				await sleep(100);
				await ($('input#ext-item-id-input').first() as any)?.focus();
				idx++;
			}
			index++;
		}
		await sleep(1000);

		const selectorQuery = `table.variants-table-container input[name='price']:not([id*="product-price"]):visible`;
		const selector = $(selectorQuery);
		const selectorQuantity = `table.variants-table-container input[name='quantity']:not([id*="product-price"])`;
		const button = `table.variants-table-container button[type='button']`;

		index = 0;
		while (selector[index]) {
			let valMerge = $(`input[name="variantCheck"]:eq(${index})`).first().val();
			const valueAttr = find(itemInfoMap?.attribute_specifics_modify, (attribute_specifics_modify) => {
				return (
					toUpper(map(attribute_specifics_modify?.name_value, (name_value) => name_value?.value).join('-')) === valMerge
				);
			});
			const price = valueAttr?.sale_price + (extendShippingPrice ? shippingCost : 0);
			await sleep(200);
			await fillTextInput(`${selectorQuery}:eq(${index})`, parseFloat(price ? price : maxPrice).toFixed(2));
			await fillTextInput(`${selectorQuantity}:eq(${index})`, 20);
			index++;
		}
		await sleep(1000);
		index = 0;
		while (selector[index]) {
			let valMerge = $(`input[name="variantCheck"]:eq(${index})`).first().val();
			const valueAttr = find(itemInfoMap?.attribute_specifics_modify, (attribute_specifics_modify) => {
				return (
					toUpper(map(attribute_specifics_modify?.name_value, (name_value) => name_value?.value).join('-')) === valMerge
				);
			});
			const price = valueAttr?.sale_price + (extendShippingPrice ? shippingCost : 0);
			if (!price && $(`${button}:eq(${index})`).first().attr('aria-checked') === 'true') {
				await sleep(100);
				await clickButton(`${button}:eq(${index})`);
			}
			index++;
		}

		if (get(platform_category, [0, 'name'])) {
			await fillSelect(`select[name="productMain"]:eq(0)`, trim(get(platform_category, [0, 'name'])));
			await sleep(500);
		}
		if (get(platform_category, [1, 'name'])) {
			await fillSelect(`select[name="productMain"]:eq(1)`, trim(get(platform_category, [1, 'name'])));
			await sleep(500);
		}
		if (get(platform_category, [2, 'name'])) {
			await fillSelect(`select[name="productMain"]:eq(2)`, trim(get(platform_category, [2, 'name'])));
			await sleep(500);
		}
		if (get(platform_category, [3, 'name'])) {
			await fillSelect(`select[name="productMain"]:eq(3)`, trim(get(platform_category, [3, 'name'])));
			await sleep(500);
		}
		if (get(platform_category, [4, 'name'])) {
			await fillSelect(`select[name="productMain"]:eq(4)`, trim(get(platform_category, [4, 'name'])));
			await sleep(500);
		}

		await fillTextArea(`textarea`, description);

		await sleep(2000);
		const resImg = await fillInputFile(`input[type="file"]:not([id*="my-image-file"])`, pictures);

		const warningMsg = [];
		// if (filter(resImg, (res) => res === false)) {
		// 	warningMsg.push('Image upload wrong, check again');
		// }
		// if (filter(resImg, (res) => res === 'webp')) {
		// 	warningMsg.push('Webp image not support, check again');
		// }
		// setWarningMsg(warningMsg);

		while ($x(`//div[text()="Uploading Images"]`).length) {
			await sleep(2000);
		}

		await sleep(3000);
		if ($(`.get-files-primary .main-img-container`).length !== pictures.length) {
			warningMsg.push('Image upload wrong, check again');
			setWarningMsg(warningMsg);
		}

		if (autoSave) {
			await clickXButton(`//button/span[text()="Save"]`);
		}
		setOnFillData(false);
		setSuccessMsg('Fill data done.');

		while (!head($x(`//span[text()="Duplicate"]`))) {
			await sleep(3000);
		}
		setOnFillData(true);
		await handlePutItemToStore()
		setOnFillData(false);

	};

	const handleGetItemData = () => {
		if (!itemId) {
			return;
		}
		setLoading(true);
		return new Promise((resolve, reject) => {
			setGraphqlForHub()
				.then(() =>
					itemsInfoQuery({
						variables: {
							identity: itemId,
						},
						fetchPolicy: 'network-only',
					})
				)
				.then((response: any) => {
					const itemInfoResponse = head(get(response, ['data', 'itemsInfo']));
					setItemInfo(head(get(response, ['data', 'itemsInfo'])));
					setLoading(false);
					resolve(true);
				})
				.catch(() => {
					setErrorMsg('Fail to get item info');
					setLoading(false);
					reject(false);
				});
		});
	};

	const handlePutItemToStore = async () => {
		if (!itemInfo?._id || !storeData?.account_id || !storeData?.account_name) {
			return;
		}
		console.log(itemInfo);
		return new Promise((resolve, reject) => {
			setGraphqlForHub()
				.then(() =>
					putItemToStoreMutation({
						variables: {
							_id: itemInfo?._id,
							account_id: storeData?.account_id,
							account_name: storeData?.account_name,
							account_type: 'Inspireuplift'
						},
						fetchPolicy: 'network-only',
					})
				)
				.then((response: any) => {
					resolve(true);
				})
				.catch(() => {
					reject(false);
				});
		});
	};

	return (
		<>
			<h4 className='text-center'>Add item</h4>
			<Notification ErrorMsg={ErrorMsg} SuccessMsg={SuccessMsg} WarningMsg={WarningMsg} Loading={Loading} />
			<div className='mt-2'>
				<div className='mb-3'>
					<Label>Item ID: </Label>
					<Input
						type='text'
						placeholder='IT-01234-56789'
						className='bg-white text-black'
						value={itemId || ''}
						required={true}
						onChange={(e) => setItemId(e.target.value)}
						valid={false}
						style={{ fontSize: 'initial' }}
						id='ext-item-id-input'
					/>
				</div>
				<div className='mb-3'>
					<Label>Product Type overwrite(optional): </Label>
					<Select
						className="basic-single w-100"
						classNamePrefix="ext-select"
						placeholder="Select your hub"
						isClearable={true}
						isLoading={!Array.isArray(itemTypes) || !itemTypes.length}
						isSearchable={true}
						name="color"
						options={map(itemTypes, type => {
							return {
								id: get(type, "_id", ""),
								value: get(type, "name", ""),
								label: <div className='d-flex flex-column'><strong>{get(type, "name", "")}</strong><i>{get(type, "provider", "")}</i></div>
							}
						})}
						styles={colourStyles}
						onChange={(data) => {
							setCurrentType(find(itemTypes, type => type?._id === get(data, "id", "")))
						}}
						value={
							{
								id: currentType?._id,
								value: get(currentType, "name", ""),
								label: <div className='d-flex flex-column'><strong>{get(currentType, "name", "")}</strong><i>{get(currentType, "provider", "")}</i></div>
							}
						}
					/>
				</div>
				{itemInfo ? (
					<Row>
						<Col sm={12} className='mt-2'>
							<strong>Item name:</strong>
						</Col>
						<Col sm={12} className='mt-1'>
							<div className='text-center'>{itemInfo?.name}</div>
						</Col>
					</Row>
				) : (
					false
				)}

				{itemInfo ? (
					<Row>
						<Col sm={12} className='mt-2'>
							<strong>Images:</strong>
						</Col>
						{map(
							filter(
								map(itemInfo?.images, ({ src }) => (startsWith(src, '//') ? window.location.protocol + src : src)),
								(src) => !startsWith(src, 'data:image')
							),
							(img, index) => {
								return (
									<Col sm={4} className='mb-2 px-1 ext-imgs-list' key={index}>
										<img
											src={img}
											alt={img}
											width='100%'
											height='100%'
											className={`cursor-pointer border rounded border-3`}
										/>
									</Col>
								);
							}
						)}
						{itemInfo?.include_size_chart &&
							itemInfo?.size_chart &&
							itemInfo?.size_chart !== '' &&
							itemInfo?.size_chart !== null &&
							startsWith(itemInfo?.size_chart, 'http') ? (
							<Col sm={4} className='mb-2 px-1 ext-imgs-list'>
								<img
									src={itemInfo?.size_chart}
									alt='Size chart'
									width='100%'
									height='100%'
									className={`cursor-pointer border rounded border-3`}
								/>
							</Col>
						) : (
							false
						)}
						{itemInfo?.include_extend_images && itemInfo?.extend_images && Array.isArray(itemInfo?.extend_images)
							? map(
								filter(
									map(itemInfo?.extend_images, ({ src }) =>
										startsWith(src, '//') ? window.location.protocol + src : src
									),
									(src) => !startsWith(src, 'data:image')
								),
								(img, index) => {
									return (
										<Col sm={4} className='mb-2 px-1 ext-imgs-list' key={`extend-${index}`}>
											<img
												src={img}
												alt={img}
												width='100%'
												height='100%'
												className={`cursor-pointer border rounded border-3`}
											/>
										</Col>
									);
								}
							)
							: false}
					</Row>
				) : (
					false
				)}
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
				<div className='d-flex justify-content-center align-items-center p-1'>
					<Input
						id='autoSave'
						type='checkbox'
						value='autoSave'
						onChange={(e) => {
							setAutoSave(e.target.checked);
						}}
						checked={autoSave}
						disabled={onFillData}
					/>
					<Label for='autoSave' className='pl-1'>
						Auto save
					</Label>
					<Input
						id='extendShippingPrice'
						type='checkbox'
						value='extendShippingPrice'
						onChange={(e) => {
							setExtendShippingPrice(e.target.checked);
						}}
						checked={extendShippingPrice}
						disabled={onFillData}
					/>
					<Label for='extendShippingPrice' className='pl-1'>
						Extend shipping price
					</Label>
				</div>
				<Button
					size='xs'
					color='success'
					className='py-1 d-flex justify-content-center align-items-center'
					onClick={() => handleGetItemData()}
					disabled={onFillData}
				>
					<PlusCircle size={14} /> <span style={{ marginLeft: '3px' }}>Add</span>
				</Button>
				{/* <Button
					size='xs'
					color='success'
					className='py-1 d-flex justify-content-center align-items-center'
					onClick={() => handleClearData()}
				>
					<PlusCircle size={14} /> <span style={{ marginLeft: '3px' }}>Clear data</span>
				</Button>
				<Button
					size='xs'
					color='success'
					className='py-1 d-flex justify-content-center align-items-center'
					onClick={() => handleFillData()}
				>
					<PlusCircle size={14} /> <span style={{ marginLeft: '3px' }}>Fill data again</span>
				</Button> */}
			</BottomBar>
		</>
	);
}
