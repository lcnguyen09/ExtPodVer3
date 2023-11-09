import { useEffect, useState } from 'react';
import { Button, Col, Input, Label, Row, Spinner } from 'reactstrap';
import { PlusCircle } from 'react-feather';
import UiContext from './../../../contexts/ui.context';
import { useItemsInfoLazyQuery, usePutItemToStoreMutation } from '../../../graphql/graphql';
import Notification from './../../../components/Notification';
import BottomBar from './../../../components/BottomBar';
import $ from 'jquery';
import { filter, find, flatMapDeep, get, head, map, startsWith, toLower, toUpper, trim } from 'lodash';

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
	const [onFillData, setOnFillData] = useState<boolean>(false);
	const [autoSave, setAutoSave] = useState<boolean>(false);

	useEffect(() => {
		setLoading(false);
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

	const handleFillData = async () => {
		let index = 0;
		setErrorMsg('');
		setSuccessMsg('');
		setWarningMsg([]);
		console.log(itemInfo);
		let errorMsg = [];
		if (get(itemInfo, 'name', '').length > 120) {
			errorMsg.push('Item title is too long');
		}

		if (get(itemInfo, 'description', '').length > 3000) {
			errorMsg.push('Item description is too long');
		}
		const isWorldWideShip = get(itemInfo, ['shipping_preset_info', 'global_shipping'], '') === 'Accepted' || !get(itemInfo, 'shipping_preset_info');

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
		let minPrice = parseFloat(itemInfo?.price);
		let maxPrice = parseFloat(itemInfo?.price);
		const prices = map(itemInfo?.attribute_specifics_modify, (attribute_specifics) =>
			parseFloat(attribute_specifics.sale_price)
		);
		if (prices.length) {
			minPrice = Math.min.apply(Math, prices);
			maxPrice = Math.max.apply(Math, prices);
		}
		// let minBasePrice = parseFloat(itemInfo?.price);
		// const basePrices = map(itemInfo?.attribute_specifics_modify, (attribute_specifics) =>
		// 	parseFloat(attribute_specifics.base_price)
		// );
		// if (basePrices.length) {
		// 	minBasePrice = Math.min.apply(Math, basePrices);
		// }

		let titleReplace = get(itemInfo, 'name', '');
		titleReplace = titleReplace.replace(/(\[Your Company Name\])/g, '');

		let description = get(itemInfo, 'description', '');
		description = description.replace(/PRODUCT_HEADER/g, '');
		description = description.replace(/PRODUCT_FOOTER/g, '');
		description = description.replace(/{{PRODUCT_TITLE}}/g, get(itemInfo, 'name', ''));
		description = description.replace(/{{PRODUCT_NAME}}/g, get(itemInfo, 'name', ''));
		description = description.replace(/PRODUCT_NAME/g, get(itemInfo, 'name', ''));

		let pictures = flatMapDeep(get(itemInfo, 'images', []), (img) => get(img, 'src', ''));
		if (
			itemInfo.include_size_chart &&
			itemInfo.size_chart &&
			itemInfo.size_chart !== '' &&
			itemInfo.size_chart !== null &&
			startsWith(itemInfo.size_chart, 'http')
		) {
			pictures = [...pictures, itemInfo.size_chart];
		}
		if (itemInfo.include_extend_images && itemInfo.extend_images && Array.isArray(itemInfo.extend_images)) {
			pictures = [
				...pictures,
				...map(
					filter(itemInfo.extend_images, (image) => {
						return image.src && image.src !== '' && image.src !== null && startsWith(image.src, 'http');
					}),
					(image) => {
						return image.src;
					}
				),
			];
		}

		const dispatchTime = get(itemInfo, ['shipping_preset_info', 'dispatch_time_max'], 5);

		const platform_category = get(
			find(itemInfo?.platform_category, (pcate) => {
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
		if (Array.isArray(itemInfo?.prety_attributes) && itemInfo?.prety_attributes.length) {
			await fillCheckbox(`input#shippment-detail[name="hasProductOptions"][type="checkbox"]`, true);
		}
		const determinedAttrs = filter(itemInfo?.prety_attributes, (prety_attribute, index) => {
			return prety_attribute?.attribute_type === 'Color' || prety_attribute?.attribute_type === 'Size';
		});
		const undefinedAttrs = filter(itemInfo?.prety_attributes, (prety_attribute, index) => {
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

		let quantity = Array.isArray(itemInfo?.attribute_specifics_modify)
			? itemInfo?.attribute_specifics_modify.length
			: 9;
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
			const valueAttr = find(itemInfo?.attribute_specifics_modify, (attribute_specifics_modify) => {
				return (
					toUpper(map(attribute_specifics_modify?.name_value, (name_value) => name_value?.value).join('-')) === valMerge
				);
			});
			const price = valueAttr?.sale_price;
			await sleep(200);
			await fillTextInput(`${selectorQuery}:eq(${index})`, parseFloat(price ? price : maxPrice).toFixed(2));
			await fillTextInput(`${selectorQuantity}:eq(${index})`, 1);
			index++;
		}
		await sleep(1000);
		index = 0;
		while (selector[index]) {
			let valMerge = $(`input[name="variantCheck"]:eq(${index})`).first().val();
			const valueAttr = find(itemInfo?.attribute_specifics_modify, (attribute_specifics_modify) => {
				return (
					toUpper(map(attribute_specifics_modify?.name_value, (name_value) => name_value?.value).join('-')) === valMerge
				);
			});
			const price = valueAttr?.sale_price;
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
					if (
						!Array.isArray(get(itemInfoResponse, 'prety_attributes', [])) ||
						get(itemInfoResponse, 'prety_attributes', []).length > 3
					) {
						return setErrorMsg('Too many variant');
					}
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
