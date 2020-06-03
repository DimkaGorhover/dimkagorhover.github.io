import React from 'react';
import { Container } from 'react-bootstrap';
import { CV } from './cv'

export class AppMain extends React.Component {

    state = {
        page: <CV />
    }

    render() {
        const { page } = this.state
        return (
            <Container xl>
                {page}
            </Container>
        )
    }
}
