import React from 'react';

export const BlankLink = ({ href, name }) => {

    if (href) {
        return (
            <a
                target={"_blank"}
                rel={"noopener noreferrer"}
                href={href}
                style={{
                    color: 'inherit',
                    textDecoration: 'none'
                }}>

                {name}
            </a>
        )
    } else {
        return (<>{name}</>)
    }
}
