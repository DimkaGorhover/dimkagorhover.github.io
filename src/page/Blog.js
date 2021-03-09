import { Alert, Jumbotron } from 'react-bootstrap';
import { useTitle } from "../common";

export const Blog = () => {
  useTitle('Blog Page')
  return (
    <>
      <Jumbotron>
        <h1>Blog</h1>
      </Jumbotron>

      <Alert variant={"warning"}>
        The blog is currently unavailable
      </Alert>
    </>
  )
}
