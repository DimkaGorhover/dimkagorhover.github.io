import { Col, Row } from 'react-bootstrap';
import { About } from '../components/cv/About';
import { Header } from '../components/cv/Header';
import { Contacts } from '../components/cv/Contacts';
import { Education } from '../components/cv/Education';
import { Skills } from '../components/cv/Skills';
import { Photo } from '../components/cv/Photo';
import { Languages } from '../components/cv/Languages';
import { ShortExpList } from '../components/cv/ShortExpList';
import { useTitle } from '../common';
import { BootstrapLine } from '../components/common/BootstrapLine';

export const MainCV = () => {
  useTitle('CV: Dmytro Horkhover');
  return (
    <>
      <Row>
        <Col xs={9}>
          <Header />
          <About />
          <Languages />
        </Col>
        <Col xs={3}>
          <Photo />
        </Col>
      </Row>

      <BootstrapLine>
        <Contacts />
      </BootstrapLine>

      <BootstrapLine>
        <Education />
      </BootstrapLine>

      <BootstrapLine>
        <Skills />
      </BootstrapLine>

      <BootstrapLine>
        <ShortExpList />
      </BootstrapLine>
    </>
  );
};
