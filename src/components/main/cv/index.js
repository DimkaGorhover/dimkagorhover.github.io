import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { LeftBlock } from "./tech/left";
import { RightBlock } from './tech/right';

export const CV = () => {
    return (
        <Row>
            <Col xs={3}>
                <LeftBlock />
            </Col>
            <Col xs={9}>
                <RightBlock />
            </Col>
        </Row>
    )
}
