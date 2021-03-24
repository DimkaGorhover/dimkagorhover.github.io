import { Jumbotron, ListGroup, Pagination } from 'react-bootstrap';
import { useTitle } from '../common';
import { Link as RouterLink, Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import { Minio } from './blog/Minio';
import { JacksonStream } from './blog/JacksonStream';

const BlogPage = () => {
  const { url } = useRouteMatch();
  useTitle('Blog Page');
  return (
    <>
      <Jumbotron>
        <h1>Blog</h1>
      </Jumbotron>

      <ListGroup>
        <ListGroup.Item as={RouterLink} to={`${url}/minio`}>
          Minio Cluster
        </ListGroup.Item>
        <ListGroup.Item as={RouterLink} to={`${url}/jackson_streaming`}>
          Jackson Stream Parsing
        </ListGroup.Item>
      </ListGroup>

      <br />

      <Pagination>
        <Pagination.First />
        <Pagination.Prev />
        <Pagination.Item>{'1'}</Pagination.Item>
        <Pagination.Next />
        <Pagination.Last />
      </Pagination>
    </>
  );
};

const Routes = () => {
  const { path } = useRouteMatch();
  return (
    <>
      <Switch>
        <Route exact path={`${path}/jackson_streaming`} component={JacksonStream} />
        <Route exact path={`${path}/minio`} component={Minio} />
        <Route exact path={`${path}`} component={BlogPage} />
        <Route path={'*'}>
          <Redirect to={`${path}`} />
        </Route>
      </Switch>
    </>
  );
};

export const Blog = () => {
  return <Routes />;
};
