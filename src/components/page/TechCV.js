import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Header } from '../cv/Header';
import { About } from '../cv/About';
import { Views } from '../cv/Views';
import { Hobbies } from '../cv/Hobbies';
import { Education } from '../cv/Education';
import { Skills } from '../cv/Skills';
import { Photo } from '../cv/Photo';
import { Experience } from '../main/cv/tech/right/Experience';

export const TechCV = () => {

    React.useEffect(() => {
        document.title = `CV: Dmytro Horkhover`;
    })

    return (
        <div>
            <Row>
                <Col xs={12}>
                    <Header />
                </Col>
            </Row>
            <Row>
                <Col xs={2} className="bg-dark">
                    <Photo />
                    <About />
                    <Views />
                    <Hobbies />
                </Col>
                <Col xs={10}>
                    <Row>
                        <Col xs={12}>
                            <Education />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <Skills />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <Experience />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}
