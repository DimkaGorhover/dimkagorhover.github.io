import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Header } from '../cv/Header';
import { About } from '../cv/About';
import { Hobbies } from '../cv/Hobbies';
import { Education } from '../cv/Education';
import { Contacts } from '../cv/Contacts';
import { Skills } from '../cv/Skills';
import { Photo } from '../cv/Photo';
import { Experience } from '../main/cv/tech/right/Experience';

const Line = ({ children }) => {
    return (
        <Row>
            <Col xs={ 12 }>
                { children }
            </Col>
        </Row>
    )
}

export const TechCV = () => {

    React.useEffect(() => {
        document.title = `CV: Dmytro Horkhover`;
    })

    return (
        <div>
            <header>
                <Line><Header /></Line>
            </header>
            <main>
                <Row>
                    <Col xs={2} className="bg-dark">
                        <Photo />
                        <About />
                        <Hobbies />
                    </Col>
                    <Col xs={10}>
                        <Line><Education /></Line>
                        <Line><Contacts /></Line>
                        <Line><Skills /></Line>
                        <Line><Experience /></Line>
                    </Col>
                </Row>
            </main>
            <footer>
                
            </footer>
        </div>
    )
}
