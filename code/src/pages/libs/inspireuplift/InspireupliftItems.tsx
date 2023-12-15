import { useEffect, useState } from 'react';
import { Button, Col, Input, Label, Media, Row, Spinner, Table } from 'reactstrap';
import { PlayCircle, PlusCircle } from 'react-feather';
import UiContext from './../../../contexts/ui.context';
import { useItemsInfoLazyQuery, usePutItemToStoreMutation } from '../../../graphql/graphql';
import Notification from './../../../components/Notification';
import BottomBar from './../../../components/BottomBar';
import $ from 'jquery';
import { cloneDeep, filter, find, findIndex, flatMapDeep, get, head, last, map, set, startsWith, toLower, toUpper, trim } from 'lodash';
import Select, { StylesConfig } from 'react-select';

const colourStyles: StylesConfig = {
    control: (styles) => ({ ...styles, backgroundColor: 'white' }),
    menu: (styles) => ({ ...styles, maxHeight: '150px', overflow: "hidden", padding: '0 6px' }),
    option: (styles) => ({ ...styles, maxHeight: "150px" })
};

export default function ({ Identifier, storeData, setOnMulti }: any) {
    const {
        appMode,
        $x,
        sleep,
        movingOnElm,
        fillTextInput,
        fillReactTab,
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

    const [itemIdTxt, setItemIdTxt] = useState<string>(
        ''
    );
    const [itemInfos, setItemInfos] = useState<any>([]);
    const [itemTypes, setItemTypes] = useState<any>([]);
    const [currentType, setCurrentType] = useState<any>({});
    const [onFillData, setOnFillData] = useState<boolean>(false);

    useEffect(() => {
        setLoading(false);
        handleGetTypeData()
    }, []);

    // useEffect(() => {
    // if (itemInfo) {
    // 	handleFillData();
    // }
    // }, [itemInfo]);

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
        console.log('handleClearData');
        return new Promise(async (resolve, reject) => {
            let index = 0;
            if ($(`img[src="/images/icons/cancel-icon.svg"]`).length) {
                index = 0;
                while ($(`img[src="/images/icons/cancel-icon.svg"]`)[index]) {
                    console.log($(`img[src="/images/icons/cancel-icon.svg"]`)[index]);
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


    const handleFillDatas = async () => {
        setOnFillData(true);
        setOnMulti(true);
        while (
            find(itemInfos, (info: any) => {
                return !info?.current_status || info?.current_status === 'Pending';
            })
        ) {
            await handleFillData();
        }
        await clickButton(`a[href="/product/list?type=all"]`);
        setOnFillData(false);
        setOnMulti(false);
    };

    const handleFillData = async () => {
        let index = 0;
        setErrorMsg('');
        setSuccessMsg('');
        setWarningMsg([]);
        let errorMsg = [];
        let itemInfo = find(itemInfos, (info: any) => {
            return !info?.current_status || info?.current_status === 'Pending';
        });
        const itemInfoIndex = findIndex(itemInfos, (info: any) => {
            return !info?.current_status || info?.current_status === 'Pending';
        });
        console.log(itemInfoIndex);
        if (!itemInfo) {
            return;
        }
        let ItemInfos = itemInfos;
        set(ItemInfos, [itemInfoIndex, 'current_status'], 'Filling Data');
        setItemInfos(ItemInfos);

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


        await sleep(1000);

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

        if (errorMsg.length) {
            set(ItemInfos, [itemInfoIndex, 'errorMsg'], errorMsg.join('; '));
            setItemInfos(ItemInfos);
            return
        }



        console.log('ItemInfos: ', ItemInfos);
        console.log(itemInfoMap);
        await movingOnElm(`tr#${itemInfoMap?.identity}`, `#podorder-ext-app-body-card`, 0);
        await sleep(1000);
        await clickButton(`a[href="/product/list?type=all"]`);
        await sleep(1000);
        while (!head($x(`//Button/div[text()="Add Product"]`))) {
            await sleep(1000);
        }
        await clickXButton(`//Button/div[text()="Add Product"]`);

        while (!head($(`input#product-title[name="title"]`)) || !head($(`select[name="zone_id"]`))) {
            await sleep(3000);
        }
        await sleep(3000);

        let shippingCost = get(itemInfoMap, ['shipping_preset_info', 'shipping_cost'], '') ? get(itemInfoMap, ['shipping_preset_info', 'shipping_cost'], '') : '5'
        shippingCost = parseFloat(shippingCost)

        const isWorldWideShip = get(itemInfoMap, ['shipping_preset_info', 'global_shipping'], '') === 'Accepted';

        if (isWorldWideShip) {
            if (!head($x(`//option[text()="World Wide"]`))) {
                errorMsg.push('Shipping Zone is no option to ship World Wide');
            }
        } else {
            if (!head($x(`//option[text()="United States"]|//option[text()="United states"]|//option[text()="united states"]|//option[text()="US"]|//option[text()="us"]|//option[text()="Us"]|//option[text()="uS"]`))) {
                errorMsg.push('Shipping Zone is no option to ship to (US/United States). Create Shipping with name: "US" or "United States"');
            }
        }
        if (errorMsg.length) {
            set(ItemInfos, [itemInfoIndex, 'errorMsg'], errorMsg.join('; '));
            setItemInfos(ItemInfos);
            return
        }

        let minPrice = parseFloat(itemInfoMap?.price);
        let maxPrice = parseFloat(itemInfoMap?.price);
        const prices = map(itemInfoMap?.attribute_specifics_modify, (attribute_specifics) =>
            parseFloat(attribute_specifics.sale_price)
        );
        if (prices.length) {
            minPrice = Math.min.apply(Math, prices) + (extendShippingPrice ? shippingCost : 0);
            maxPrice = Math.max.apply(Math, prices) + (extendShippingPrice ? shippingCost : 0);
        }

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
            set(itemInfos, [itemInfoIndex, 'errorMsg'], 'The product does not belong to any category, please set up a category');
            setItemInfos(ItemInfos);
            return
        }

        await handleClearData();

        await fillTextInput(`input#product-title[name="title"]`, titleReplace);

        const lastCateName = trim(get(last(platform_category), 'name'))
		await fillTextInput(`input[name="product-category"]`, lastCateName);

		while (!$(`div.suggested-categories-container`).length) {
			await sleep(2000);
		}

		if ($x(`//div[contains(@class, 'suggested-categories-container')]//span[text()="${lastCateName}"]`).length) {
			clickXButton(`//div[contains(@class, 'suggested-categories-container')]//span[text()="${lastCateName}"]`);
		} else {
			clickXButton(`//div[contains(@class, 'suggested-categories-container')]/div[1]`);
		}


        await fillTextInput(`input#product-price[name="price"]`, minPrice.toFixed(2));

        if (isWorldWideShip) {
            await fillSelect(`select[name="zone_id"]`, 'World Wide');
        } else {
            if (head($x(`//option[text()="United States"]`))) {
                await fillSelect(`select[name="zone_id"]`, 'United States');
            } else if (head($x(`//option[text()="United states"]`))) {
                await fillSelect(`select[name="zone_id"]`, 'United states');
            } else if (head($x(`//option[text()="united states"]`))) {
                await fillSelect(`select[name="zone_id"]`, 'united states');
            } else if (head($x(`//option[text()="US"]`))) {
                await fillSelect(`select[name="zone_id"]`, 'US');
            } else if (head($x(`//option[text()="us"]`))) {
                await fillSelect(`select[name="zone_id"]`, 'us');
            } else if (head($x(`//option[text()="Us"]`))) {
                await fillSelect(`select[name="zone_id"]`, 'Us');
            } else if (head($x(`//option[text()="uS"]`))) {
                await fillSelect(`select[name="zone_id"]`, 'uS');
            } else {
                await fillSelect(`select[name="zone_id"]`, 'US');
            }
        }

        await fillSelect(`select[name="processing_time"]`, dispatchTime + ' days');
        await fillCheckbox(`input#sell-stock[name="continueSelling"][type="checkbox"]`, true);
        if (Array.isArray(itemInfoMap?.prety_attributes) && itemInfoMap?.prety_attributes.length) {
            await fillCheckbox(`input#shippment-detail[name="hasProductOptions"][type="checkbox"]`, true);
        }
        await sleep(1000);
        if ($(`img[src="/images/icons/cancel-icon.svg"]:eq(3)`).length) {
            await sleep(2000);
            await clickButton(`img[src="/images/icons/cancel-icon.svg"]:eq(3)`);
            await sleep(1000);
            await clickButton(`button.rrt-ok-btn`);
        }

        if ($(`img[src="/images/icons/cancel-icon.svg"]:eq(2)`).length) {
            await sleep(2000);
            await clickButton(`img[src="/images/icons/cancel-icon.svg"]:eq(2)`);
            await sleep(1000);
            await clickButton(`button.rrt-ok-btn`);
        }

        if ($(`img[src="/images/icons/cancel-icon.svg"]:eq(1)`).length) {
            await sleep(2000);
            await clickButton(`img[src="/images/icons/cancel-icon.svg"]:eq(1)`);
            await sleep(1000);
            await clickButton(`button.rrt-ok-btn`);
        }

        const determinedAttrs = filter(itemInfoMap?.prety_attributes, (prety_attribute, index) => {
            return prety_attribute?.attribute_type === 'Color' || prety_attribute?.attribute_type === 'Size';
        });
        const undefinedAttrs = filter(itemInfoMap?.prety_attributes, (prety_attribute, index) => {
            return prety_attribute?.attribute_type !== 'Color' && prety_attribute?.attribute_type !== 'Size';
        });
        index = 0;
        const allAttr = [...determinedAttrs, ...undefinedAttrs]
        console.log('allAttr: ', allAttr);
        while (allAttr[index]) {
            if (index > 0) {
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

        index = 0
        while (determinedAttrs[index]) {
            const prety_attribute = determinedAttrs[index];
            const elm = head($(`option[value="${toLower(prety_attribute?.attribute_type)}"]:eq(${index})`)) as any;
            await sleep(150);
            await fillSelect(elm.parentElement, prety_attribute?.attribute_type);
            index++;
        }

        index = 0
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
        index = 0
        while (allAttr[index]) {
            const prety_attribute = allAttr[index];
            let idx = 0
            const options = get(prety_attribute, 'options', [])
            while (options[idx]) {
                const op = options[idx];
                await sleep(300);
                // await ($(`input.ReactTags__tagInputField:eq(${index})`).first() as any)?.focus();
                await fillReactTab(`input.ReactTags__tagInputField:eq(${index})`, op?.plf_value);
                await sleep(100);
                // await ($('input#ext-item-id-input').first() as any)?.focus();
                idx++;
            }
            index++;
        }
        await sleep(1000);

        const selectorQuery = `table.variants-table-container input[name='price']:not([id*="product-price"]):visible`;
        const selector = $(selectorQuery);
        const selectorQuantity = `table.variants-table-container input[name='quantity']:not([id*="product-price"])`;
        const button = `table.variants-table-container button[type='button']`;
        index = 0
        while (selector[index]) {
            let valMerge = $(`input[name="variantCheck"]:eq(${index})`).first().val();
            const valueAttr = find(itemInfoMap?.attribute_specifics_modify, (attribute_specifics_modify) => {
                return (
                    toUpper(map(attribute_specifics_modify?.name_value, (name_value) => name_value?.value).join('-')) === valMerge
                );
            });
            const price = valueAttr?.sale_price + (extendShippingPrice ? shippingCost : 0);
            await sleep(250);
            await fillTextInput(`${selectorQuery}:eq(${index})`, parseFloat(price ? price : maxPrice).toFixed(2));
            await fillTextInput(`${selectorQuantity}:eq(${index})`, 20);
            index++;
        }

        index = 0
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

        // if (get(platform_category, [0, 'name'])) {
        //     await fillSelect(`select[name="productMain"]:eq(0)`, trim(get(platform_category, [0, 'name'])));
        //     await sleep(500);
        // }
        // if (get(platform_category, [1, 'name'])) {
        //     await fillSelect(`select[name="productMain"]:eq(1)`, trim(get(platform_category, [1, 'name'])));
        //     await sleep(500);
        // }
        // if (get(platform_category, [2, 'name'])) {
        //     await fillSelect(`select[name="productMain"]:eq(2)`, trim(get(platform_category, [2, 'name'])));
        //     await sleep(500);
        // }
        // if (get(platform_category, [3, 'name'])) {
        //     await fillSelect(`select[name="productMain"]:eq(3)`, trim(get(platform_category, [3, 'name'])));
        //     await sleep(500);
        // }
        // if (get(platform_category, [4, 'name'])) {
        //     await fillSelect(`select[name="productMain"]:eq(4)`, trim(get(platform_category, [4, 'name'])));
        //     await sleep(500);
        // }

        await fillTextArea(`textarea`, description);

        await sleep(2000);
        const resImg = await fillInputFile(`input[type="file"]:not([id*="my-image-file"])`, pictures);
        await sleep(2000);

        const warningMsg = [];

        while ($x(`//div[text()="Uploading Images"]`).length) {
            await sleep(3000);
        }

        await sleep(3000);
        if ($(`.get-files-primary .main-img-container`).length !== pictures.length) {
            warningMsg.push('Image upload wrong, check again');
            set(ItemInfos, [itemInfoIndex, 'warningMsg'], warningMsg.join('; '));
            setItemInfos(ItemInfos);
        }
        await clickXButton(`//button/span[text()="Save"]`);

        let count = 0
        while (!head($x(`//span[text()="Duplicate"]`)) && count < 15) {
            await sleep(3000);
            count++
        }
        if (count >= 15) {
            set(ItemInfos, [itemInfoIndex, 'current_status'], 'Error');
            setItemInfos(ItemInfos);
            return true
        } else {
            set(ItemInfos, [itemInfoIndex, 'current_status'], warningMsg.length ? 'Done with warning' : 'Done');
            setItemInfos(ItemInfos);
            await handlePutItemToStore(itemInfo)
            return true
        }

    };

    const handleGetItemData = (itemIds: any) => {
        if (!itemIds) {
            return;
        }
        setLoading(true);
        return new Promise((resolve, reject) => {
            setGraphqlForHub()
                .then(() =>
                    itemsInfoQuery({
                        variables: {
                            identities: itemIds,
                        },
                        fetchPolicy: 'network-only',
                    })
                )
                .then((response: any) => {
                    // const itemInfoResponse = head(get(response, ['data', 'itemsInfo']));
                    // if (
                    // 	!Array.isArray(get(itemInfoResponse, 'prety_attributes', [])) ||
                    // 	get(itemInfoResponse, 'prety_attributes', []).length > 3
                    // ) {
                    // 	return setErrorMsg('Too many variant');
                    // }
                    console.log(get(response, ['data', 'itemsInfo']));
                    setItemInfos(map(get(response, ['data', 'itemsInfo']), info => {
                        return {
                            ...info,
                            current_status: "Pending"
                        }
                    }));
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

    const handlePutItemToStore = async (itemInfo: any) => {
        if (!itemInfo?._id || !storeData?.account_id || !storeData?.account_name) {
            return;
        }
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
            <p className='text-danger' style={{textAlign: 'justify'}}>*Please DO NOT MINIMIZE this tab, the OS will interfere with event simulation. Automatically adding products will not be possible.*</p>
            <Notification ErrorMsg={ErrorMsg} SuccessMsg={SuccessMsg} WarningMsg={WarningMsg} Loading={Loading} />
            <div className='mt-2'>
                <div className='mb-3'>
                    <div className='mb-3'>
                        <Label>Item ID(s): </Label>
                        <Input
                            type='text'
                            placeholder='IT-01234-56789'
                            className='bg-white text-black'
                            value={itemIdTxt || ''}
                            required={true}
                            onChange={(e) => {
                                setItemIdTxt(e.target.value);
                            }}
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
                    <p className='d-flex justify-content-end'>
                        <Button
                            size='xs'
                            color='success'
                            className='py-1 d-flex justify-content-center align-items-center'
                            onClick={() => {
                                if (itemIdTxt && itemIdTxt.split(';').length > 0) {
                                    setItemIdTxt('');
                                    handleGetItemData(itemIdTxt.split(';'));
                                }
                            }}
                            disabled={onFillData}
                        >
                            <PlusCircle size={14} /> <span style={{ marginLeft: '3px' }}>Add to queue</span>
                        </Button>
                    </p>
                    <Table>
                        <thead>
                            <tr>
                                <td>Info</td>
                                <td>Status</td>
                            </tr>
                        </thead>
                        <tbody>
                            {map(itemInfos, (itemInfo) => {
                                const image = head(itemInfo.images);
                                return (
                                    <tr key={itemInfo?.identity} id={itemInfo?.identity}>
                                        <td>
                                            <div className='d-flex align-items-center'>
                                                <Media
                                                    id={`item-title-${itemInfo._id}`}
                                                    className='rounded'
                                                    object={true}
                                                    src={get(image, 'src', '')}
                                                    height='50'
                                                    width='50'
                                                    style={{
                                                        width: '50px',
                                                        height: '50px',
                                                    }}
                                                />

                                                <div className='p-1'>
                                                    <span>{itemInfo?.identity}</span>
                                                </div>
                                            </div>
                                            <div className='text-center'>{itemInfo?.name}</div>
                                            <div className='text-center text-danger'>{itemInfo?.errorMsg}</div>
                                            <div className='text-center text-warning'>{itemInfo?.warningMsg}</div>
                                        </td>
                                        <td>{itemInfo?.current_status || 'Pending'}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </div>
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
            <BottomBar className='flex-column'>
                <div className='d-flex justify-content-between align-items-center p-1'>
                    <div className='d-flex align-items-center'>
                        <Input
                            id='autoSave'
                            type='checkbox'
                            value='autoSave'
                            className='mt-0'
                            checked={itemInfos.length > 1}
                            disabled={true}
                        />
                        <Label for='autoSave' className='pl-1'>
                            Auto save
                        </Label>
                    </div>
                    <div className='d-flex align-items-center'>
                        <Input
                            id='extendShippingPrice'
                            type='checkbox'
                            value='extendShippingPrice'
                            className='mt-0'
                            onChange={(e) => {
                                setExtendShippingPrice(e.target.checked);
                            }}
                            checked={extendShippingPrice}
                            disabled={onFillData}
                        />
                        <Label for='extendShippingPrice' className='pl-1'>
                            Extend shipping price
                        </Label></div>
                </div>
                <Button
                    size='xs'
                    color='success'
                    className='py-1 d-flex justify-content-center align-items-center'
                    onClick={() => handleFillDatas()}
                    disabled={!itemInfos.length}
                >
                    <PlayCircle size={14} /> <span style={{ marginLeft: '3px' }}>Start</span>
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
