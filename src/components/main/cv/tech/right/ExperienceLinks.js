import React from 'react';

const Link = ({ link }) => {
    const { name, url, target = "_blank" } = link
    return (
        <li>
            <a href={url} target={target}>{name ? name : url}</a>
        </li>
    )
}

export const ExperienceLinks = ({ links }) => {
    return links && (
        <div>
            <h5>Links</h5>
            <ul>
                {links.map((link, index) => (<Link key={index} link={link} />))}
            </ul>
        </div>
    )
}
