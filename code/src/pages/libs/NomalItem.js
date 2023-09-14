import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Alert, Button, Col, Row, Spinner } from 'reactstrap';
import { Save } from 'react-feather';
import UiContext from '../../contexts/ui.context';
import Notification from '../../components/Notification';
import BottomBar from '../../components/BottomBar';
import $ from 'jquery';
import { clone, filter, get, head, includes, map, remove, split, startsWith, trim, union } from 'lodash';

export default function NomalItem() {
	const { setGraphqlForAccount } = UiContext.UseUIContext();

	const [Loading, setLoading] = useState(true);
	const [ErrorMsg, setErrorMsg] = useState('');
	const [SuccessMsg, setSuccessMsg] = useState('');

	const [ExtensionRule, setExtensionRule] = useState({});
	const [__NEXT_DATA__, setNextData] = useState({});
	const [__INITIAL_STATE__, setInitialState] = useState({});
	const [ItemTitle, setItemTitle] = useState('');
	const [ItemImages, setItemImages] = useState<Array>([]);
	const [ItemImagesSelected, setItemImagesSelected] = useState<Array>([]);
	useEffect(() => {
		getRule();
		try {
			const nextData = $('body').attr('tmp___NEXT_DATA__');
			if (nextData) setNextData(JSON.parse(nextData));
		} catch (error) { }
		try {
			const initialStateTag = $('#__INITIAL_STATE__')[0].textContent;
			if (initialStateTag) setInitialState(JSON.parse(initialStateTag));
		} catch (error) { }
	}, []);

	useEffect(() => {
		setItemTitle(getItemName());
	}, [
		ExtensionRule?.name,
		__INITIAL_STATE__?.product?.product?.title,
		__NEXT_DATA__?.props?.pageProps?.product?.title,
	]);

	useEffect(() => {
		setItemImages(getItemImages());
	}, [
		ExtensionRule?.images,
		__INITIAL_STATE__?.product?.product?.images,
		__NEXT_DATA__?.props?.pageProps?.product?.gallery,
	]);

	function getRule() {
		setGraphqlForAccount().then(() => {
			// infoQuery({ fetchPolicy: 'network-only' }).then((response) => {
			// 	setExtensionRule(response?.data?.info?.extension_rule);
			// 	setLoading(false);
			// });
		})
	}

	function getItemName() {
		return __INITIAL_STATE__?.product?.product?.title
			? __INITIAL_STATE__?.product?.product?.title
			: __NEXT_DATA__?.props?.pageProps?.product?.title
				? __NEXT_DATA__?.props?.pageProps?.product?.title
				: trim($(get(ExtensionRule, 'name', '')).first().text());
	}

	function getImageFromSite(configRules, index) {
		const images = [];
		filter(configRules, (configRule) => {
			$.each($(get(configRule, 'block', '')).first().find(get(configRule, 'loop', '')), (index, element) => {
				const imgAttrTmp = $(element).attr(get(configRule, 'main_attr', ''))
					? $(element).attr(get(configRule, 'main_attr', '')).toString()
					: $(element).attr(get(configRule, 'extra_attr', '')).toString();
				const imgUrl = head(split(imgAttrTmp, ' '));
				if (imgUrl) {
					images.push(imgUrl);
				}
			});
		});
		return images;
	}

	function getItemImages() {
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
			<h3 className='text-center'>Item Info</h3>

			<div className='container-fluid mt-2'>
				<Row>
					<Col sm={12}>
						<strong>Name:</strong>
					</Col>
					<Col sm={12}>{ItemTitle}</Col>
				</Row>
				<Row>
					<Col sm={12} className='mt-2'>
						<strong>Images:</strong>
					</Col>
					{map(
						filter(
							map(ItemImages, (img) => (startsWith(img, '//') ? window.location.protocol + img : img)),
							(img) => !startsWith(img, 'data:image')
						),
						(img, index) => {
							return (
								<Col sm={4} className='mb-2 px-1 ext-imgs-list' key={index}>
									<img
										src={img}
										alt={img}
										width='100%'
										height='100%'
										className={`cursor-pointer border rounded border-3 ${includes(ItemImagesSelected, img) ? 'border-success' : ''
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
			<BottomBar>
				<NomalItemSave
					setLoading={setLoading}
					ItemTitle={ItemTitle}
					ItemImages={ItemImagesSelected}
					setSuccessMsg={setSuccessMsg}
					setErrorMsg={setErrorMsg}
				/>
			</BottomBar>
		</>
	);
}

function NomalItemSave({
	setLoading,
	ItemTitle,
	ItemImages,
	setSuccessMsg,
	setErrorMsg,
}) {
	const { currentDocker, currentToken, templateId } = UiContext.UseUIContext();

	function handleSave() {
		console.log('handleSave: ');
		setLoading(true);
		var settings = {
			url: `${currentDocker?.domain
				? `https://api-${currentDocker?.domain}.${currentDocker?.server}/api/v1/item-clone`
				: '/api/v1/item-clone'
				}`,
			data: {
				id: templateId,
				name: ItemTitle,
				images: ItemImages,
				// origin_id: originId
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
	return (
		<Button
			disabled={!ItemImages.length}
			size='xs'
			color='success'
			className='py-1 d-flex justify-content-center align-items-center'
			onClick={handleSave}
		>
			<Save size={14} /> <span style={{ marginLeft: '3px' }}>Save</span>
		</Button>
	);
}
