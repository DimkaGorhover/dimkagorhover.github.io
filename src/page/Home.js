import { Jumbotron, ListGroup } from 'react-bootstrap';
import { Link as RouterLink } from 'react-router-dom';
import { links } from '../data/links';
import { useTitle } from '../common';

const title = 'Home Page';

export const Home = () => {

  useTitle(title);

  const linksContent = [links.cv_main, links.cv_tech].map(({ name, url }, index) => (
    <ListGroup.Item key={index} as={RouterLink} to={url()}>
      {name()}
    </ListGroup.Item>
  ));

  return (
    <>
      <Jumbotron>
        <h1>{title}</h1>
        <ListGroup>
          {linksContent}
        </ListGroup>
      </Jumbotron>
    </>
  );
};
