import React from 'react';

export const Contacts = ({contacts}) => {
    const contactsComponent = contacts
        .map(({name, link}) => <a href={link} rel="noopener noreferrer" target="_blank">{name}</a>)
        .map((block) => <li>{block}</li>);

    return (
        <div>
            <h3>Contacts:</h3>
            <ul>{contactsComponent}</ul>
        </div>
    )
};
