import { Jumbotron } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { links } from '../data/links';
import { BootstrapLine as Line } from '../components/commons/BootstrapLine';
import { useTitle } from "../common";

export const Home = () => {

  useTitle('Home Page')

  const linksContent = [
    links.cv_main,
    links.cv_tech
  ].map(({ name, url }) => (
    <Line>
      <Link to={url()}>{name()}</Link>
    </Line>
  ))

  return (
    <Jumbotron>
      <Line>
        <h1>Home Page</h1>
      </Line>
      {linksContent}
    </Jumbotron>
  )
}
