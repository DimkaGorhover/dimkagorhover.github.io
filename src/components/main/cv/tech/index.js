import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { LeftBlock } from "./left";
import { RightBlock } from './right';

export const CV = () => {

    const leftSize = 3

    return (
        <Row>
            <Col xs={leftSize}>
                <LeftBlock />
            </Col>
            <Col xs={12 - leftSize}>
                <RightBlock />
            </Col>
        </Row>
    )
}
