import React, {Component} from 'react';
import About from "./About";
import Experience from "./Experience";
import {Container, Col, Row} from 'react-bootstrap';

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
                            <img src="irzpGTIa_400x400.jpg" className="photo" alt="photo"/>
                        </Col>
                    </Row>
                </Container>
                <Container>
                    <Experience/>
                </Container>
            </div>
        )
    }
}
