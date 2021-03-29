import { Col, Row } from 'react-bootstrap';
import { About } from '../components/cv/About';
import { Hobbies } from '../components/cv/Hobbies';
import { Education } from '../components/cv/Education';
import { Contacts } from '../components/cv/Contacts';
import { Skills } from '../components/cv/Skills';
import { Photo } from '../components/cv/Photo';
import { Experience } from '../components/cv/exp_old/Experience';
import { useTitle } from '../common';

export const TechCV = ({ leftSize = 3 }) => {
  useTitle('CV: Dmytro Horkhover');
  return (
    <>
      <h1>Dmytro Horkhover</h1>
      <h5>Java Software Engineer</h5>
      <Row>
        <Col xs={leftSize} className='bg-dark'>
          <Photo />
          <About />
          <Hobbies />
        </Col>
        <Col xs={12 - leftSize}>
          <Education />
          <Contacts importantOnly={false} />
          <Skills />
          <Experience />
        </Col>
      </Row>
    </>
  );
};
