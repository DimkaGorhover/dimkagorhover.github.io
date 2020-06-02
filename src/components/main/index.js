import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { LeftBlock } from "./left";
import { RightBlock } from './right';

export const AppMain = () => {
    return (
        <div className='container-xl'>
            <Row>
                <Col xs={3}>
                    <LeftBlock />
                </Col>
                <Col xs={9}>
                    <RightBlock />
                </Col>
            </Row>
        </div>
    )
}
