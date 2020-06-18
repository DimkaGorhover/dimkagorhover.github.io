import React from 'react';
import { Jumbotron } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { links } from '../../data/links';
import { BootstrapLine as Line } from '../commons/BootstrapLine';

export const Home = () => {

    React.useEffect(() => {
        document.title = "Home Page";
    });

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
