import React from 'react';

export const ExperienceLinks = ({ links }) => {
    if (links) {

        links = links.map(({ name, url, target }) => (
            <li>
                <a href={url} target={target ? target : "_blank"}>{name ? name : url}</a>
            </li>
        ))

        return (
            <div>
                <h5>Links</h5>
                <ul>
                    {links}
                </ul>
            </div>
        )
    }
    return null
}
