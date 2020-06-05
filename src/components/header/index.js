import React from 'react';
import './style.scss'
import { Container } from 'react-bootstrap';

export const AppHeader = () => {
    return (
        <header>
            <Container fluid='xl'>
                <h1>CV: Dmytro Horkhover</h1>
                <h5>Java Software Engineer</h5>
            </Container>
        </header>
    )
}
