import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { HashRouter as Router, Link as RouterLink, Route, Switch } from 'react-router-dom';
import { SocialPanel } from "./cv/SocialPanel";
import { Blog as BlogPage } from "./page/Blog";
import { Home as HomePage } from './page/Home';
import { MainCV as MainCVPage } from './page/MainCV';
import { TechCV as TechCVPage } from './page/TechCV';
import { links } from '../data/links';

const Navigation = () => {
    return (
        <div>
            <Navbar bg="dark" variant="dark" expand={"md"}>

                <Navbar.Brand as={RouterLink} to={links.home.url()}>Dmytro Horkhover</Navbar.Brand>
                <Navbar.Toggle aria-controls={"basic-navbar-nav"} />
                <Navbar.Collapse id={"basic-navbar-nav"}>

                    <Nav className={"mr-auto"}>

                        <Nav.Link as={RouterLink} to={links.home.url()}>Home</Nav.Link>
                        <Nav.Link as={RouterLink} to={links.blog.url()}>Blog</Nav.Link>

                        <NavDropdown title="CV" id="basic-nav-dropdown">

                            <NavDropdown.Item as={RouterLink} to={links.cv_main.url()}>Main CV</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item as={RouterLink} to={links.cv_tech.url()}>Technical CV</NavDropdown.Item>

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
                <Route exact={true} path={links.home.url()} component={HomePage} />
                <Route exact={true} path={links.blog.url()} component={BlogPage} />
                <Route exact={true} path={links.cv_tech.url()} component={TechCVPage} />
                <Route exact={true} path={links.cv_main.url()} component={MainCVPage} />
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
