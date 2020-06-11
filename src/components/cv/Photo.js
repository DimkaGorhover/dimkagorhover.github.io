import React from 'react';
import { Image } from 'react-bootstrap';

export const Photo = () => {
    return (
        <div style={{ alignSelf: 'center' }} >
            <Image src="/static/IMG_20190609_191430__01.jpg" style={{ width: '100%' }} thumbnail />
        </div>
    )
}
