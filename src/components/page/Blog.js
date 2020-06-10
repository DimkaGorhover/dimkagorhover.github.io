import React from 'react';
import { Alert, Jumbotron } from 'react-bootstrap';

export const Blog = () => {

    React.useEffect(() => {
        document.title = "Blog Page";
    });

    return (
        <div>
            <Jumbotron>
                <h1>Blog</h1>
            </Jumbotron>
            <Alert variant={"warning"}>
                The blog is currently unavailable
            </Alert>
        </div>
    )
}
