import { filter, map, startsWith } from "lodash";
import { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";

export default function ItemInfo({
    title,
    images
}: {
    title: string,
    images: Array<string>
}) {
    const [Title, setTitle] = useState<string>("")
    const [Images, setImages] = useState<Array<string>>([])

    useEffect(() => {
        setTitle(title)
    }, [title])

    useEffect(() => {
        setImages(images)
    }, [images])

    return <>
        <h5>Item Info</h5>
        <div className="text-justify"><strong>{Title}</strong></div>
        <div className="container-fluid mt-2">
            <Row>
                {
                    map(
                        filter(
                            map(Images, img => startsWith(img, "//") ? window.location.protocol + img : img),
                            img => !startsWith(img, "data:image")
                        ),
                        (img, index) => {
                            return <Col sm={4} className="mb-2 px-1" key={index}><img src={img} alt={img} width="100%" height="100%" /></Col>
                        }
                    )

                }
            </Row>
        </div>
    </>
}