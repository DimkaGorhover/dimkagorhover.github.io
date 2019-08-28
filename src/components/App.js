import React, {Component} from 'react';
import About from "./About";
import Experience from "./Experience";
import {Container, Col} from 'react-bootstrap';

export default class App extends Component {
    render() {
        return (
            <div>
                <Container>
                    <Col xs={6}>
                        <About/>
                    </Col>
                    <Col xs={4}>
                        <img src="irzpGTIa_400x400.jpg" className="photo" alt="photo"/>
                    </Col>
                </Container>
                <Container>
                    <Experience/>
                </Container>
            </div>
        )
    }
}
