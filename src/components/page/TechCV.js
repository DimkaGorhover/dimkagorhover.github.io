import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Header } from '../cv/Header';
import { About } from '../cv/About';
import { Hobbies } from '../cv/Hobbies';
import { Education } from '../cv/Education';
import { Contacts } from '../cv/Contacts';
import { Skills } from '../cv/Skills';
import { Photo } from '../cv/Photo';
import { Experience } from '../cv/exp_old/Experience';
import { BootstrapLine as Line } from '../commons/BootstrapLine';

export const TechCV = () => {

    React.useEffect(() => {
        document.title = `CV: Dmytro Horkhover`;
    })

    const leftSize = 3

    return (
        <div>
            <header>
                <Line><Header /></Line>
            </header>
            <main>
                <Row>
                    <Col xs={leftSize} className="bg-dark">
                        <Photo />
                        <About />
                        <Hobbies />
                    </Col>
                    <Col xs={12 - leftSize}>
                        <Line><Education /></Line>
                        <Line><Contacts importantOnly={false} /></Line>
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
