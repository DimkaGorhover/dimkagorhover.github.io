import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { About } from '../cv/About';
import { Header } from '../cv/Header';
import { Contacts } from '../cv/Contacts';
import { Education } from '../cv/Education';
import { Skills } from '../cv/Skills';
import { Photo } from '../cv/Photo';
import { Languages } from '../cv/Languages'
import { ShortExpList } from '../cv/ShortExpList';
import { BootstrapLine as Line } from '../commons/BootstrapLine';

export const MainCV = () => {

    React.useEffect(() => {
        document.title = `CV: Dmytro Horkhover`;
    })

    return (
        <div>
            <header>

            </header>
            <main>
                <Row>
                    <Col xs={9}>
                        <Line><Header /></Line>
                        <Line><About /></Line>
                        <Line><Languages /></Line>
                    </Col>
                    <Col xs={3}>
                        <Line><Photo /></Line>
                    </Col>
                </Row>
                <Line><Contacts /></Line>
                <Line><Education /></Line>
                <Line><Skills /></Line>
                <Line><ShortExpList /></Line>
            </main>
            <footer>

            </footer>
        </div>
    )
}
