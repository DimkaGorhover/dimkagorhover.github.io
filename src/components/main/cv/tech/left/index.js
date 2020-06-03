import React from 'react';
import { Photo } from './Photo';
import { About } from './About';
import { } from 'react-bootstrap';

export const LeftBlock = () => {
    return (
        <div style={{
            backgroundColor: '#333',
            color: '#eee',
            width: '100%',
            height: '100%',
            padding: '10px'
        }}>
            <Photo />
            <About />
        </div>
    )
}
