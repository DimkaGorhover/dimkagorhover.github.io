import React from 'react';
import {} from 'react-router-dom'

const Link = ({ name, url, target = "_blank" }) => {
    return (
        <li>
            <a href={url} target={target}>{name ? name : url}</a>
        </li>
    )
}

export const ExperienceLinks = ({ links }) => {

    if (!links)
        return (<></>)

    return (
        <div>
            <h5>Links</h5>
            <ul>
                {links.map((link, index) => (<Link key={index} {...link} />))}
            </ul>
        </div>
    )
}
