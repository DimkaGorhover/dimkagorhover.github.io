import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Header } from '../cv/Header';
import { About } from '../cv/About';
import { Contacts } from '../cv/Contacts';
import { Views } from '../cv/Views';
import { Hobbies } from '../cv/Hobbies';
import { Education } from '../cv/Education';
import { Skills } from '../cv/Skills';
import { Photo } from '../cv/Photo';
import { ExpList } from '../cv/ExpList';
import { Languages} from '../cv/Languages'

const Line = ({ component }) => {
    return (
        <Row>
            <Col xs={12}>
                {component}
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
            <Row>
                <Col xs={12}>
                    <Header />
                </Col>
            </Row>
            <Row>
                
                <Col xs={7}>
                    <Line component={<About />} />
                    <Line component={<Languages />}/>
                    <Line component={<Hobbies />} />
                    <Line component={<Views />} />
                </Col>
                <Col xs={3}>
                    <Line component={<Contacts />} />
                </Col>
                <Col xs={2}>
                    <Line component={<Photo />} />
                </Col>
            </Row>
            <Line component={<Education />} />
            <Line component={<Skills />} />
            <Line component={<ExpList short={true} />} />
        </div>
    )
}
