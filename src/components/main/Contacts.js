import React from 'react';

export const Contacts = ({contacts}) => {
    const contactsComponent = contacts
        .map(({name, link}, index) => (
            <li key={index}>
                <a href={link} rel="noopener noreferrer" target="_blank">{name}</a>
            </li>
        ));

    return (
        <div>
            <h3>Contacts:</h3>
            <ul>{contactsComponent}</ul>
        </div>
    )
};
