import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { HashRouter as Router, Link, Route } from 'react-router-dom';

import { MainCV as MainCVPage } from './page/MainCV';
import { TechCV as TechCVPage } from './page/TechCV';
import { Home as HomePage } from './page/Home';
import { Switch } from 'react-router-dom/cjs/react-router-dom.min';

const Navigation = () => {
    return (
        <Navbar bg="dark" variant="dark">
            {/* <Navbar.Brand href="/">Dmytro Horkhover</Navbar.Brand> */}

            <Navbar.Brand as={Link} to='/'>Dmytro Horkhover</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />

            <Nav className="mr-auto">
                <NavDropdown title="CV" id="basic-nav-dropdown">

                    <NavDropdown.Item as={Link} to='/cv/main'>Main CV</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item as={Link} to='/cv/tech'>Technical CV</NavDropdown.Item>

                </NavDropdown>
            </Nav>
        </Navbar>
    )
}

const Routers = () => {
    return (
        <Container fluid='lg' className="main-container">
            <Switch>
                <Route exact={true} path='/' component={HomePage} />
                <Route exact={true} path='/cv/tech' component={TechCVPage} />
                <Route exact={true} path='/cv/main' component={MainCVPage} />
            </Switch>
        </Container>
    )
}

export const App = () => {

    return (
        <Router basename={process.env.PUBLIC_URL}>
            <Navigation />
            <Routers />
        </Router>
    )
}
