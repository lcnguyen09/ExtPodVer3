import { useEffect, useState } from 'react';
import { Button, Input, Label, Spinner } from 'reactstrap';
import { PlusCircle } from 'react-feather';
import UiContext from './../../../contexts/ui.context';
import { useItemsInfoLazyQuery } from '../../../graphql/graphql';
import Notification from './../../../components/Notification';
import BottomBar from './../../../components/BottomBar';
import $ from 'jquery';
import { filter, find, flatMapDeep, get, head, map, startsWith, toLower, toUpper, trim } from 'lodash';

export default function (Identifier: any) {
	const {
		appMode,
		sleep,
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

	const { currentDocker, currentToken } = UiContext.UseUIContext();

	const [site, setSite] = useState(window.location.host);
	const [pathname, setPathname] = useState(window.location.pathname);

	const [Loading, setLoading] = useState<boolean>(false);
	const [ErrorMsg, setErrorMsg] = useState('');
	const [SuccessMsg, setSuccessMsg] = useState('');

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
			let timeout = 0;
			if ($(`img[src="/images/icons/cancel-icon.svg"]`).length) {
				const promisesAttrClear: any = [];
				timeout = 0;
				filter($(`img[src="/images/icons/cancel-icon.svg"]`), (index: number) => {
					timeout += 2000;
					promisesAttrClear.push(
						new Promise(async (resolve, reject) => {
							await sleep(timeout);
							await clickButton(`img[src="/images/icons/cancel-icon.svg"]`);
							return resolve(true);
						})
					);
					timeout += 3000;
					promisesAttrClear.push(
						new Promise(async (resolve, reject) => {
							await sleep(timeout);
							await clickButton(`button.rrt-ok-btn`);
							return resolve(true);
						})
					);
				});
				await Promise.allSettled(promisesAttrClear);
				await sleep(1000);
			}

			if ($(`img[src="/images/icons/red-cross.svg"]`).length) {
				const promisesImgClear: any = [];
				timeout = 0;
				filter($(`img[src="/images/icons/red-cross.svg"]`), (index: number) => {
					timeout += 500;
					promisesImgClear.push(
						new Promise(async (resolve, reject) => {
							await sleep(timeout);
							await clickButton(`img[src="/images/icons/red-cross.svg"]`);
							return resolve(true);
						})
					);
				});
				await Promise.allSettled(promisesImgClear);
				await sleep(3000);
			}

			resolve(true);
		});
	};

	const handleFillData = async () => {
		let timeout = 0;
		setErrorMsg('');
		setSuccessMsg('');
		setOnFillData(true);
		console.log(itemInfo);
		if (get(itemInfo, 'name', '').length > 120) {
			setErrorMsg('Item title is too long');
		}

		if (get(itemInfo, 'description', '').length > 3000) {
			setErrorMsg('Item description is too long');
		}

		let minPrice = parseFloat(itemInfo?.price);
		let maxPrice = parseFloat(itemInfo?.price);
		const prices = map(itemInfo?.attribute_specifics_modify, (attribute_specifics) =>
			parseFloat(attribute_specifics.sale_price)
		);
		if (prices.length) {
			minPrice = Math.min.apply(Math, prices);
			maxPrice = Math.max.apply(Math, prices);
		}
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
		await fillTextArea(`textarea`, description);
		await fillTextInput(`input#product-price[name="price"]`, minPrice);
		await fillSelect(`select[name="zone_id"]`, 'World Wide');
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
		timeout = 0;
		await Promise.allSettled(
			map([...determinedAttrs, ...undefinedAttrs], async (prety_attribute, index) => {
				if (index) {
					timeout += 100;
					let selector = `//button[text()="Add Option"]`;
					if (prety_attribute?.attribute_type !== 'Color' && prety_attribute?.attribute_type !== 'Size') {
						selector = `//button[text()="Add Custom Option"]`;
					}
					await sleep(timeout);
					await clickXButton(selector);
				}
				return Promise.resolve();
			})
		);

		timeout = 0;
		await Promise.allSettled(
			map(determinedAttrs, async (prety_attribute, index) => {
				timeout += 150;
				const elm = head($(`option[value="${toLower(prety_attribute?.attribute_type)}"]:eq(${index})`)) as any;
				await sleep(timeout);
				await fillSelect(elm.parentElement, prety_attribute?.attribute_type);
				return Promise.resolve();
			})
		);

		timeout = 0;
		await Promise.allSettled(
			map(undefinedAttrs, async (prety_attribute, index) => {
				timeout += 150;
				await sleep(timeout);
				await fillTextInput(`input#option-title:eq(${index})`, prety_attribute?.attribute_type);
				return Promise.resolve();
			})
		);

		let quantity = Array.isArray(itemInfo?.attribute_specifics_modify)
			? itemInfo?.attribute_specifics_modify.length
			: 9;
		await fillTextInput(`input#product-available-inventory`, quantity ? quantity : 1);

		const promises: any = [];
		timeout = 0;
		filter([...determinedAttrs, ...undefinedAttrs], (prety_attribute, index: number) => {
			filter(get(prety_attribute, 'options', []), (op, idx: number) => {
				const promise = new Promise(async (resolve, reject) => {
					timeout += 150;
					await sleep(timeout);
					await ($(`input.ReactTags__tagInputField:eq(${index})`).first() as any)?.focus();
					await fillTextInput(`input.ReactTags__tagInputField:eq(${index})`, op?.plf_value);
					await ($('input#ext-item-id-input').first() as any)?.focus();
					return resolve(true);
				});
				promises.push(promise);
			});
		});
		await sleep(3000);
		await Promise.allSettled(promises);
		const selectorQuery = `table.variants-table-container input[name='price']:not([id*="product-price"]):visible`;
		const selector = $(selectorQuery);
		const selectorQuantity = `table.variants-table-container input[name='quantity']:not([id*="product-price"])`;
		const button = `table.variants-table-container button[type='button']`;
		timeout = 0;
		const promisesPrice: any = [];
		const promisesAttrRemove: any = [];
		filter(selector, (elm, index) => {
			let valMerge = $(`input[name="variantCheck"]:eq(${index})`).first().val();
			const valueAttr = find(itemInfo?.attribute_specifics_modify, (attribute_specifics_modify) => {
				return (
					toUpper(map(attribute_specifics_modify?.name_value, (name_value) => name_value?.value).join('-')) === valMerge
				);
			});
			const price = valueAttr?.sale_price;
			const promise = new Promise(async (resolve, reject) => {
				timeout += 250;
				await sleep(timeout);
				await fillTextInput(`${selectorQuery}:eq(${index})`, parseFloat(price ? price : maxPrice).toFixed(2));
				await fillTextInput(`${selectorQuantity}:eq(${index})`, 1);
				return resolve(true);
			});
			promisesPrice.push(promise);
		});
		await Promise.allSettled(promisesPrice);

		timeout = 0;
		filter(selector, (elm, index) => {
			let valMerge = $(`input[name="variantCheck"]:eq(${index})`).first().val();
			const valueAttr = find(itemInfo?.attribute_specifics_modify, (attribute_specifics_modify) => {
				return (
					toUpper(map(attribute_specifics_modify?.name_value, (name_value) => name_value?.value).join('-')) === valMerge
				);
			});
			const price = valueAttr?.sale_price;
			const promise = new Promise(async (resolve, reject) => {
				timeout += 50;
				if (!price && $(`${button}:eq(${index})`).first().attr('aria-checked') === 'true') {
					timeout += 50;
					await sleep(timeout);
					await clickButton(`${button}:eq(${index})`);
				}
				return resolve(true);
			});
			promisesAttrRemove.push(promise);
		});
		await Promise.allSettled(promisesAttrRemove);

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

		await sleep(2000);
		await fillInputFile(`input[type="file"]:not([id*="my-image-file"])`, pictures);
		setOnFillData(false);

		if (autoSave) {
			let count = 0;
			const intVal = setInterval(async () => {
				if ($(`.get-files-primary .main-img-container`).length === pictures.length) {
					setSuccessMsg('Saving...');
					await sleep(2000);
					await clickXButton(`//button/span[text()="Save"]`);
					clearInterval(intVal);
				} else if (
					$(`.get-files-primary .main-img-container`).length &&
					$(`.get-files-primary .main-img-container`).length !== pictures.length
				) {
					count++;
					if (count > 5) {
						return setErrorMsg('Image upload failed, please check again then click save product');
					}
				}
			}, 500);
			return setSuccessMsg('Fill data done. Wait for photo to upload');
		}
		setSuccessMsg('Fill data done.');
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

	return (
		<>
			<Notification ErrorMsg={ErrorMsg} SuccessMsg={SuccessMsg} Loading={Loading} />
			<h4 className='text-center'>Add item</h4>
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
				<div className='text-center'>{itemInfo?.name}</div>
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
