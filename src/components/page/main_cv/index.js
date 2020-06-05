import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { About } from '../../cv/About';
import { Views } from '../../cv/Views';
import { Hobbies } from '../../cv/Hobbies';
import { Education } from '../../cv/Education';
import { Skills } from '../../cv/Skills';
import { Photo } from '../../cv/Photo';

export const MainCV = () => {

    return (
        <div>
            <Row>
                <Col xs={2}>
                    <Row><Photo /></Row>
                </Col>
                <Col xs={1}>

                </Col>
                <Col xs={9}>
                    <Row><About /></Row>
                    <Row><Hobbies /></Row>
                    <Row><Views /></Row>
                </Col>
            </Row>
            <Row><Education /></Row>
            <Row><Skills /></Row>
        </div>
    )
}
