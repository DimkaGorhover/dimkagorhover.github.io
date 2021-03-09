import { Col, Row } from 'react-bootstrap';
import { About } from '../components/cv/About';
import { Hobbies } from '../components/cv/Hobbies';
import { Education } from '../components/cv/Education';
import { Contacts } from '../components/cv/Contacts';
import { Skills } from '../components/cv/Skills';
import { Photo } from '../components/cv/Photo';
import { Experience } from '../components/cv/exp_old/Experience';
import { BootstrapLine as Line } from '../components/commons/BootstrapLine';
import { useTitle } from "../common";

export const TechCV = () => {

  useTitle('CV: Dmytro Horkhover')

  const leftSize = 3

  return (
    <>
      <Line>
        <div>
          <h1>Dmytro Horkhover</h1>
          <h5>Java Software Engineer</h5>
        </div>
      </Line>
      <Row>
        <Col xs={leftSize} className="bg-dark">
          <Photo/>
          <About/>
          <Hobbies/>
        </Col>
        <Col xs={12 - leftSize}>
          <Line><Education/></Line>
          <Line><Contacts importantOnly={false}/></Line>
          <Line><Skills/></Line>
          <Line><Experience/></Line>
        </Col>
      </Row>
    </>
  )
}
