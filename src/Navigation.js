import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link as RouterLink } from 'react-router-dom';
import { links } from './data/links';
import { SocialPanel } from './components/cv/SocialPanel';

export const Navigation = () => {
  return (
    <>
      <Navbar bg={'dark'} variant={'dark'} expand={'sm'}>

        <Navbar.Brand as={RouterLink} to={links.home.url()}>
          Dmytro Horkhover
        </Navbar.Brand>
        <Navbar.Toggle aria-controls={'basic-navbar-nav'} />
        <Navbar.Collapse id={'basic-navbar-nav'}>

          <Nav className={'mr-auto'}>

            <Nav.Link as={RouterLink} to={links.home.url()}>
              Home
            </Nav.Link>
            <Nav.Link as={RouterLink} to={links.blog.url()}>
              Blog
            </Nav.Link>

            <NavDropdown title='CV' id='basic-nav-dropdown'>

              <NavDropdown.Item as={RouterLink} to={links.cv_main.url()}>
                Main CV
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={RouterLink} to={links.cv_tech.url()}>
                Technical CV
              </NavDropdown.Item>

            </NavDropdown>
          </Nav>

          <Nav className={'mr-right'}>
            <SocialPanel />
          </Nav>

          {/*<Form inline>*/}
          {/*    <FormControl type='text' placeholder='Search' className='mr-sm-2' disabled />*/}
          {/*    <Button variant='outline-success' disabled>Search</Button>*/}
          {/*</Form>*/}

        </Navbar.Collapse>

      </Navbar>
    </>
  );
};
