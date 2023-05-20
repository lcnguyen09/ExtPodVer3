import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { get, last, map, startsWith } from "lodash";
import $ from "jquery"
import { Alert } from "reactstrap";


export default function Wanderprints() {
	const [errorMsg, setErrorMsg] = useState("")
	const [itemTitle, setItemTitle] = useState("")
	const [itemImages, setItemImages] = useState([])
	useEffect(() => {
		_dateGet()
	}, [])

	function _dateGet() {
		const itemSlug = last(window.location.pathname?.split("/"))
		const myHeaders = new Headers();
		myHeaders.append("authority", "wanderprints.com");
		myHeaders.append("accept", "application/json, text/javascript, */*; q=0.01");
		myHeaders.append("accept-language", "vi-VN,vi;q=0.9,en-US;q=0.8,en;q=0.7");
		myHeaders.append("if-none-match", "W/\"cacheable:58c4cdedac6b11435d6357cece29f548\"");
		myHeaders.append("referer", window.location.href);
		myHeaders.append("sec-ch-ua", "\"Google Chrome\";v=\"113\", \"Chromium\";v=\"113\", \"Not-A.Brand\";v=\"24\"");
		myHeaders.append("sec-ch-ua-mobile", "?0");
		myHeaders.append("sec-ch-ua-platform", "\"macOS\"");
		myHeaders.append("sec-fetch-dest", "empty");
		myHeaders.append("sec-fetch-mode", "cors");
		myHeaders.append("sec-fetch-site", "same-origin");
		myHeaders.append("user-agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36");
		myHeaders.append("x-requested-with", "XMLHttpRequest");

		fetch(`https://wanderprints.com/products/${itemSlug}.js`, { method: 'GET', headers: myHeaders }).then(response => response.json())
			.then(item => {
				setItemTitle(item?.title)
				setItemImages(item?.images?.map((img: any) => {
					return startsWith(img, "//") ? window.location.protocol + img : img
				}).filter((img: any) => !startsWith(img, "data:image")))
				
			})
			.catch(error => {
				console.log('error: ', error);
				setErrorMsg(error.toString())
			});
	}
	return <div>
		{
			errorMsg && <Alert color="danger" className="text-center mt-1 p-2"><strong>*Error:</strong> <i>{errorMsg}.</i></Alert>
		}
		<div className="text-justify"><strong>{itemTitle}</strong></div>
		<div className="d-flex flex-row justify-content-start flex-wrap mt-1">
			{
				itemImages.map(img => {
					return <img src={img} width="33%" height="100%" />
				})
			}
		</div>
	</div>
}