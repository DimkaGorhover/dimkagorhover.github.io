import { Container } from 'react-bootstrap';
import { Redirect, Route, Switch } from 'react-router-dom';
import { links } from './data/links';
import { Home as HomePage } from './page/Home';
import { Blog as BlogPage } from './page/Blog';
import { TechCV as TechCVPage } from './page/TechCV';
import { MainCV as MainCVPage } from './page/MainCV';

export const Routers = () => {
  const { home, blog, cv_tech, cv_main } = links;
  return (
    <Container fluid="lg" className="main-container">
      <Switch>
        <Route exact path={home.url()} component={HomePage} />
        <Route path={blog.url()} component={BlogPage} />
        <Route exact path={cv_tech.url()} component={TechCVPage} />
        <Route exact path={cv_main.url()} component={MainCVPage} />
        <Route path={'*'}>
          <Redirect to={'/'} />
        </Route>
      </Switch>
    </Container>
  );
};
