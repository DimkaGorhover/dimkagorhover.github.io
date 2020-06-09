import React from 'react';

export const Photo = () => {
    return (
        <div style={{
            alignSelf: 'center',
            padding: "10px"
        }}>
            <img src={"/static/photo.png"}
                alt="_photo_"
                style={{
                    width: '100%'
                }} />
        </div>
    )
}
