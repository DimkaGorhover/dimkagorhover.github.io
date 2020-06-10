import React from 'react';
import { Image } from 'react-bootstrap';

export const Photo = () => {
    return (
        <div style={{ alignSelf: 'center' }} >
            <Image src="/static/photo.png" style={{ width: '100%' }} thumbnail />
        </div>
    )
}
