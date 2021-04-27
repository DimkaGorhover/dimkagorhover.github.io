import { Jumbotron, ListGroup, Pagination } from 'react-bootstrap';
import { useTitle } from '../common';
import { Link as RouterLink, Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import { SimpleMinioCluster, title as simpleMinioClusterTitle } from './blog/SimpleMinioCluster';
import { JacksonStream, title as jacksonStreamTitle } from './blog/JacksonStream';
import { GradleSources, title as gradleTitle } from './blog/GradleSources';
import { MavenBuildInDocker, title as mavenBuildInDockerTitle } from './blog/MavenBuildInDocker';

function useBlogRoutes() {
  const { path } = useRouteMatch();
  return {
    jacksonStreaming  : `${path}/jacksonStreaming`,
    minioCluster      : `${path}/minio`,
    gradleSources     : `${path}/gradleSources`,
    mavenBuildInDocker: `${path}/mavenBuildInDocker`,
    root              : path,
  };
}

const BlogPage = () => {
  const routes = useBlogRoutes();
  useTitle('Blog Page');
  return (
    <>
      <Jumbotron>
        <h1>Blog</h1>
      </Jumbotron>

      <ListGroup>
        <ListGroup.Item as={RouterLink} to={routes.minioCluster}>
          {simpleMinioClusterTitle}
        </ListGroup.Item>
        <ListGroup.Item as={RouterLink} to={routes.jacksonStreaming}>
          {jacksonStreamTitle}
        </ListGroup.Item>
        <ListGroup.Item as={RouterLink} to={routes.gradleSources}>
          {gradleTitle}
        </ListGroup.Item>
        <ListGroup.Item as={RouterLink} to={routes.mavenBuildInDocker}>
          {mavenBuildInDockerTitle}
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
  const routes = useBlogRoutes();
  return (
    <>
      <Switch>
        <Route exact path={routes.jacksonStreaming} component={JacksonStream} />
        <Route exact path={routes.minioCluster} component={SimpleMinioCluster} />
        <Route exact path={routes.gradleSources} component={GradleSources} />
        <Route exact path={routes.mavenBuildInDocker} component={MavenBuildInDocker} />
        <Route exact path={routes.root} component={BlogPage} />
        <Route path={'*'}>
          <Redirect to={routes.root} />
        </Route>
      </Switch>
    </>
  );
};

export const Blog = () => {
  return <Routes />;
};
