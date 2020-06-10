import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { HashRouter as Router, Link as RouterLink, Route, Switch } from 'react-router-dom';

import { MainCV as MainCVPage } from './page/MainCV';
import { TechCV as TechCVPage } from './page/TechCV';
import { Home as HomePage } from './page/Home';
import { Blog as BlogPage } from "./page/Blog";
import { SocialPanel } from "./cv/SocialPanel";

const links = {
    home: "/",
    blog: "/blog",
    cv_tech: "/cv/tech",
    cv_main: '/cv/main'
}

const Navigation = () => {
    return (
        <div>
            <Navbar bg="dark" variant="dark" expand={"md"}>

                <Navbar.Brand as={RouterLink} to={links.home}>Dmytro Horkhover</Navbar.Brand>
                <Navbar.Toggle aria-controls={"basic-navbar-nav"} />
                <Navbar.Collapse id={"basic-navbar-nav"}>

                    <Nav className={"mr-auto"}>

                        <Nav.Link as={RouterLink} to={links.home}>Home</Nav.Link>
                        <Nav.Link as={RouterLink} to={links.blog}>Blog</Nav.Link>

                        <NavDropdown title="CV" id="basic-nav-dropdown">

                            <NavDropdown.Item as={RouterLink} to={links.cv_main}>Main CV</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item as={RouterLink} to={links.cv_tech}>Technical CV</NavDropdown.Item>

                        </NavDropdown>
                    </Nav>

                    <Nav className={"mr-right"}>
                        <SocialPanel />

                    </Nav>

                    {/*<Form inline>*/}
                    {/*    <FormControl type="text" placeholder="Search" className="mr-sm-2" disabled />*/}
                    {/*    <Button variant="outline-success" disabled>Search</Button>*/}
                    {/*</Form>*/}

                </Navbar.Collapse>

            </Navbar>
        </div>
    )
}

const Routers = () => {
    return (
        <Container fluid='lg' className="main-container">
            <Switch>
                <Route exact={true} path={links.home} component={HomePage} />
                <Route exact={true} path={links.blog} component={BlogPage} />
                <Route exact={true} path={links.cv_tech} component={TechCVPage} />
                <Route exact={true} path={links.cv_main} component={MainCVPage} />
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
