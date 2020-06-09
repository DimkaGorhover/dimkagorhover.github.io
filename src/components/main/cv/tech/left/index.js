import React from 'react';
import { } from 'react-bootstrap';
import { About } from '../../../../cv/About';
import { Photo } from '../../../../cv/Photo';

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
