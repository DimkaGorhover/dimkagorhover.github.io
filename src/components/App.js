import React, {Component} from 'react';
import About from "./About";
import Experience from "./Experience";
import {Col, Container, Row} from 'react-bootstrap';

export default class App extends Component {

    render() {
        return (
            <div>
                <Container>
                    <Row>
                        <Col xs={8}>
                            <About/>
                        </Col>
                        <Col xs={4}>
                            <img src={"static/photo.jpg"} className="photo" alt={"photo"}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <Experience/>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
