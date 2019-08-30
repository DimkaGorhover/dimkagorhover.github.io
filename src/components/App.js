import React from 'react';
import About from "./About";
import {Experience} from "./Experience";
import {Col, Container, Row} from 'react-bootstrap';

const App = () => {
    return (
        <Container>
            <Row>
                <Col xs={8}>
                    <About/>
                </Col>
                <Col xs={4}>
                    <img src={"static/photo.jpg"} className="photo" alt="_photo_" />
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <Experience/>
                </Col>
            </Row>
        </Container>
    )
};

export default App;
