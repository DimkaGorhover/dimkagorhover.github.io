import { Col, Row } from 'react-bootstrap';

// @deprecated
export const BootstrapLine = ({ children }) => {
  return (
    <Row>
      <Col xs={12}>{children}</Col>
    </Row>
  );
};
