import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import { MainCV } from './page/main_cv';

export const App = () => {

    const Home = () => {
        return <h1>Home Page</h1>
    }

    const Tech = () => {
        return <h1>Tech CV Page</h1>
    }

    return (

        <Router>

            <Navbar bg="dark" variant="dark">
                {/* <Navbar.Brand href="/">Dmytro Horkhover</Navbar.Brand> */}
                <Link to='/' className='navbar-brand'>Dmytro Horkhover</Link>
                <Nav className="mr-auto">
                    {/* <Nav.Link href="/cv/main">Main CV</Nav.Link> */}
                    <Link to='/' className='nav-link'>Home</Link>
                    <Link to='/cv/main' className='nav-link'>Main CV</Link>
                    <Link to='/cv/tech' className='nav-link'>Tech CV</Link>
                </Nav>
            </Navbar>

            <Container fluid='lg'>

                <Route exact={true} path='/' component={Home} />
                <Route exact={true} path='/cv/tech' component={Tech} />
                <Route exact={true} path='/cv/main' component={MainCV} />

            </Container>
        </Router>
    )
}