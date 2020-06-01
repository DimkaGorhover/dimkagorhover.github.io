import React, { Component } from 'react';
import { Col, Container, Row, Button } from 'react-bootstrap';
import { About } from "./About";
import { Experience } from "./Experience";
import './style.scss'

export const AppMain = () => {
    return (
        <Container>
            <Row>
                <Col xs={8}>
                    <About />
                </Col>
                <Col xs={4} id='photo'>
                    <img src={"static/photo.jpg"} className={'photo'} alt="_photo_" />
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <Experience />
                </Col>
            </Row>
        </Container>
    )
}
