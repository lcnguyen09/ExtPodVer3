import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { filter, find, get, head, last, map, sortBy, split, startsWith } from "lodash";
import { Alert, Card, CardBody, CardHeader, Col, Input, Row, Spinner, Tooltip, UncontrolledTooltip } from "reactstrap";

export default function ItemInfo({
    title,
    images
}: {
    title: string,
    images: Array<string>
}) {
    return <>
        <h5>Item Info</h5>
        <div className="text-justify"><strong>{title}</strong></div>
        <div className="container-fluid mt-2">
            <Row>
                {
                    map(
                        filter(
                            map(images, img => startsWith(img, "//") ? window.location.protocol + img : img),
                            img => !startsWith(img, "data:image")
                        ),
                        (img, index) => {
                            return <Col sm={4} className="mb-2 px-1" key={index}><img src={img} width="100%" height="100%" /></Col>
                        }
                    )

                }
            </Row>
        </div>
    </>
}