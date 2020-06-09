import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Header } from '../cv/Header';
import { About } from '../cv/About';
import { Contacts } from '../cv/Contacts';
import { Views } from '../cv/Views';
import { Education } from '../cv/Education';
import { Skills } from '../cv/Skills';
import { Photo } from '../cv/Photo';
import { ExpList } from '../cv/ExpList';
import { Languages } from '../cv/Languages'

const Line = ({ children }) => {
    return (
        <Row>
            <Col xs={ 12 }>
                { children }
            </Col>
        </Row>
    )
}

export const MainCV = () => {

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
                    <Col xs={ 9 }>
                        <Line><About /></Line>
                        <Line><Languages /></Line>
                        <Line><Views /></Line>
                        <Line><Contacts /></Line>
                    </Col>
                    <Col xs={ 3 }>
                        <Line><Photo /></Line>
                    </Col>
                </Row>
                <Line><Education /></Line>
                <Line><Skills /></Line>
                <Line><ExpList short={ true } /></Line>
            </main>
            <footer>

            </footer>
        </div>
    )
}
