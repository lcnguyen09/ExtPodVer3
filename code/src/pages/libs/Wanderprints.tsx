import { useEffect, useState } from "react"
import { chunk, filter, find, get, head, last, map, sortBy, split, startsWith } from "lodash";
import $ from "jquery"
import { Alert, Button, Card, CardBody, CardHeader, Col, Input, NavLink, Row, Spinner } from "reactstrap";
import { ChevronDown, Save } from "react-feather"
import ItemInfoComponent from "./../../components/ItemInfo"
import Notification from "./../../components/Notification"
import { useSavePersonalizeItemMutation } from "./../../graphql_task/graphql";

const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('item');
const urlItem = last(window.location.pathname?.split("/"))

const itemSlug = myParam ? myParam : urlItem

const shop = "great-family-shop.myshopify.com"

export default function Wanderprints() {
	const [Loading, setLoading] = useState<boolean>(true)
	const [Page, setPage] = useState<any>(1)
	const [ErrorMsg, setErrorMsg] = useState("")
	const [SuccessMsg, setSuccessMsg] = useState("")
	const [ItemInfo, setItemInfo] = useState<any>(null)
	const [PersonalizedSetting, setPersonalizedSetting] = useState<any>(null)
	const [PersonalizedSetOps, setPersonalizedSetOps] = useState<any>([])
	const [PersonalizedProduct, setPersonalizedProduct] = useState<any>([])
	// const [ProductFullInfo, setProductFullInfo] = useState<any>(null)
	const [savePersonalizeItem] = useSavePersonalizeItemMutation({ fetchPolicy: "network-only" })

	useEffect(() => {
		if (itemSlug) {
			_itemInfoFetch()
			_itemPersonalizedFetch()
		}
	}, [])

	useEffect(() => {
		if (PersonalizedSetting?.productConfig?.initial_product_id) {
			_itemLibFetch(PersonalizedSetting?.productConfig?.initial_product_id).then(() => {
				const allProductId: Array<any> = []
				filter(PersonalizedSetOps, pOps => {
					filter(get(pOps, "values"), value => {
						if (get(value, "product_id")) {
							allProductId.push(get(value, "product_id"))
						}
					})
				})
				Promise.all(map(allProductId, _itemLibFetch)).then(() => setLoading(false))
			})
		}
	}, [PersonalizedSetting?.productConfig?.initial_product_id]) // eslint-disable-line

	function _itemInfoFetch() {
		$.ajax({ url: `https://wanderprints.com/products/${itemSlug}.js` }).done(response => {
			try { response = typeof response === "string" ? JSON.parse(response) : response } catch (error) { }
			setItemInfo(response)
		}).fail(error => {
			setErrorMsg(error.toString())
		})
	}

	function _itemPersonalizedFetch() {
		$.ajax({ url: `https://sh.customily.com/api/settings/unified/${itemSlug}?shop=${shop}`, headers: { SameSite: "None" } }).done(response => {
			try { response = typeof response === "string" ? JSON.parse(response) : response } catch (error) { }
			setPersonalizedSetting(response)
			setPersonalizedSetOps(sortBy(get(head(get(response, "sets", [])), "options", []), "sort_id"))
		}).fail(error => {
			setErrorMsg(error.toString())
		})
	}

	function _itemLibFetch(productId: any) {
		if (!productId) return Promise.resolve(true)
		return new Promise(resolve => {
			$.ajax({ url: `https://app.customily.com/api/Product/GetProduct?productId=${productId}`, headers: { SameSite: "None" } }).done(response => {
				try { response = typeof response === "string" ? JSON.parse(response) : response } catch (error) { }
				setPersonalizedProduct([
					...PersonalizedProduct,
					response
				])
				resolve(true)
			}).fail(error => {
				setErrorMsg(error.toString())
				resolve(true)
			})
		})
	}

	function handleSubmit() {
		let images = filter(
			map(get(ItemInfo, "images", []), img => startsWith(img, "//") ? window.location.protocol + img : img),
			img => !startsWith(img, "data:image")
		)

		let url = startsWith(get(ItemInfo, "url", ""), "//")
			? window.location.protocol + get(ItemInfo, "url", "")
			: startsWith(get(ItemInfo, "url", ""), "/")
				? window.location.origin + get(ItemInfo, "url", "")
				: get(ItemInfo, "url", "")
		if (!url) {
			url = window.location.href
		}
		const fullItemInfo = {
			origin_id: get(ItemInfo, "id", ""),
			title: get(ItemInfo, "title", ""),
			slug: get(ItemInfo, "handle", ""),
			description: get(ItemInfo, "description", ""),
			images: images,
			url: url,
			initial_product_id: get(PersonalizedSetting, ["productConfig", "initial_product_id"]),
			source: window.location.origin,
			variations: map(get(PersonalizedSetting, ["productConfig", "variations"]), vrt => {
				return {
					origin_id: get(vrt, "id", ""),
					name: get(vrt, "name", ""),
					position: get(vrt, "position", ""),
					values: map(get(vrt, "values"), value => {
						return {
							value: get(value, "value", ""),
							image_id: get(value, "image_id", ""),
						}
					}),
					functions: map(get(vrt, "functions"), fct => {
						return {
							origin_id: get(fct, "id", ""),
							type: get(fct, "type", ""),
							image_id: get(fct, "image_id", "")
						}
					}),
				}
			}),
			options: map(PersonalizedSetOps, option => {
				return {
					origin_id: get(option, "id", ""),
					type: get(option, "type", ""),
					label: get(option, "label", ""),
					sort_id: get(option, "sort_id", ""),
					required: get(option, "required", false),
					hide_visually: get(option, "hide_visually", false),
					values: map(get(option, "values"), value => {
						return {
							origin_id: get(value, "id", ""),
							value: get(value, "value", ""),
							tooltip: get(value, "tooltip", ""),
							bg_color: get(value, "bg_color", ""),
							bg_color_alpha: get(value, "bg_color_alpha", ""),
							sort_id: get(value, "sort_id", ""),
							image_id: get(value, "image_id", ""),
							product_id: get(value, "product_id", ""),
							thumb_image: get(value, "thumb_image", ""),
						}
					}),
					functions: map(get(option, "functions"), fct => {
						return {
							origin_id: get(fct, "id", ""),
							type: get(fct, "type", ""),
							image_id: get(fct, "image_id", "")
						}
					}),
					conditions: map(get(option, "conditions"), cdt => {
						return {
							origin_id: get(cdt, "id", ""),
							action: get(cdt, "action", ""),
							watch_option: get(cdt, "watch_option", ""),
							desired_value: get(cdt, "desired_value", ""),
							combination_operator: get(cdt, "combination_operator", ""),
						}
					}),
				}
			}),
			libraries: map(PersonalizedProduct, PsnlProduct => {
				return {
					origin_id: get(PsnlProduct, "id", ""),
					width: get(PsnlProduct, "width", ""),
					height: get(PsnlProduct, "height", ""),
					thumb_image: startsWith(get(PsnlProduct, "thumbnailPath", ""), "/")
						? "https://app.customily.com" + get(PsnlProduct, "thumbnailPath", "")
						: get(PsnlProduct, "thumbnailPath", ""),
					preview: map(get(PsnlProduct, ["preview", "imagePlaceHoldersPreview"]), iphp => {
						return {
							origin_id: get(iphp, "id", ""),
							uuid: get(iphp, "uuid", ""),
							width: get(iphp, "width", ""),
							height: get(iphp, "height", ""),
							centerX: get(iphp, "centerX", ""),
							centerY: get(iphp, "centerY", ""),
							rotation: get(iphp, "rotation", ""),
							opacity: get(iphp, "opacity", ""),
							image_library_id: get(iphp, "imageLibraryId", ""),
							z_index: get(iphp, "zIndex", ""),
						}
					})
				}
			})
		}
		setLoading(true)
		setErrorMsg("")
		setSuccessMsg("")
		savePersonalizeItem({
			variables: {
				data: fullItemInfo
			},
			fetchPolicy: "network-only"
		}).then(response => {

			setLoading(false)
			setSuccessMsg("Save successfuly!")
		}).catch(error => {

			setLoading(false)
			setErrorMsg("Error, try again later!")
		})
	}

	function findLibraryId(option: any) {
		const opFunction = head(get(option, "functions", []))
		if (!opFunction) return
		let libraryId = null
		filter(PersonalizedProduct, PsnlProduct => {
			const imagePlaceHoldersPreviews = get(PsnlProduct, ["preview", "imagePlaceHoldersPreview"], [])
			let cLibraryId = get(find(imagePlaceHoldersPreviews, imagePlaceHoldersPreview => {
				return get(opFunction, "image_id", null) &&
					get(imagePlaceHoldersPreview, "id", "") &&
					String(get(imagePlaceHoldersPreview, "id", "")) === String(get(opFunction, "image_id", null))
			}), "imageLibraryId", "")
			if (cLibraryId) {
				libraryId = cLibraryId
			}
		})
		return libraryId
	}

	function renderOptions() {
		const PsnlOpsChuck = chunk(PersonalizedSetOps, 10)
		let PsnlOpsChuckForRender: any = []
		for (let index = 0; index < parseInt(Page); index++) {
			PsnlOpsChuckForRender = [
				...PsnlOpsChuckForRender,
				...get(PsnlOpsChuck, index, [])
			]
		}
		return map(PsnlOpsChuckForRender, option => {
			return <div key={get(option, "id", "")} className="mt-2">
				<div><strong>{get(option, "label", "")}</strong></div>
				<div className="container-fluid">{renderOption(option)}</div>
			</div>
		})
	}


	function renderOption(option: any) {
		const opType = get(option, "type", "")
		const values = sortBy(get(option, "values", []), "sort_id")
		const id = get(option, "id")
		switch (opType) {
			case "Dropdown":
				return <Input type="select" name={id}>
					{
						map(values, value => {
							return <option key={get(value, "id", "")} value={get(value, "id", "")}>{get(value, "value", "")}</option>
						})
					}
				</Input>
			case "Text Input":
				return <Input type="text" name={id} />
			case "Swatch":
				// if (get(option, "hide_visually")) return false
				return <Row className={`flex-row flex-nowrap item-options-row ${Array.isArray(values) && values.length > 6 ? "ext-scroll" : ""}`}>
					{
						map(values, value => {
							return <Col sm="2" key={get(value, "id", "")} className="text-center align-items-center justify-content-center p-0 item-options-col border"
								style={{ backgroundColor: get(value, "bg_color", "") }}
								onClick={() => {
									const libraryId = findLibraryId(option)
									if (!libraryId) return

									$.ajax({ url: `https://app.customily.com/api/Libraries/${libraryId}/Elements/Position/${get(value, "image_id", "")}`, headers: { SameSite: "None" } }).done(response => {
										try { response = typeof response === "string" ? JSON.parse(response) : response } catch (error) { }
										const imageName = last(split(response?.Path, "/"))
										window.open(`https://cdn.customily.com/product-images/${imageName}`)
									}).fail(error => {

										setErrorMsg(error.toString())
									})
								}} >
								{get(value, "thumb_image", null) ? <img src={get(value, "thumb_image", "")} alt={get(value, "id", "")} width="100%" height="auto" /> : false}
							</Col>
						})
					}
				</Row>
			default:
				break;
		}
	}

	return itemSlug ? <div>
        <Notification ErrorMsg={ErrorMsg} SuccessMsg={SuccessMsg} Loading={Loading} />
		<ItemInfoComponent title={get(ItemInfo, "title")} images={get(ItemInfo, "images", [])} />

		<Card className="mt-3 mb-3">
			<CardHeader><strong>Personalized options</strong></CardHeader>
			<CardBody>
				{renderOptions()}
				<div className="mt-3 d-flex flex-row justify-content-between">
					<NavLink onClick={() => setPage(9999)} className='ml-1 d-flex flex-nowrap justify-content-end align-content-center align-items-center text-primary' style={{ cursor: "pointer" }}>
						<span style={{ marginLeft: "3px" }} className='text-nowrap'>Show all</span>
						<ChevronDown style={{ marginLeft: "3px" }} size={14} />
					</NavLink>
					<NavLink onClick={() => setPage(parseInt(Page) + 1)} className='ml-1 d-flex flex-nowrap justify-content-end align-content-center align-items-center text-primary' style={{ cursor: "pointer" }}>
						<span style={{ marginLeft: "3px" }} className='text-nowrap'>Show more</span>
						<ChevronDown style={{ marginLeft: "3px" }} size={14} />
					</NavLink>
				</div>
			</CardBody>
		</Card>
		<div className="position-absolute start-0 bottom-0 end-0 bg-white d-flex justify-content-end align-items-right p-2 border-top footer-action">
			<Button size="xs" color="success" className="py-1 d-flex justify-content-center align-items-center" onClick={handleSubmit}><Save size={14} /> <span style={{ marginLeft: "3px" }}>Save item</span></Button>
		</div>
	</div> : <>Item not found</>
}