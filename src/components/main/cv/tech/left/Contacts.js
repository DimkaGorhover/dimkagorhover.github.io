import React from 'react';

export const Contacts = ({ contacts }) => {
    const contactsComponent = contacts
        .map(({ name, link }, index) => (
            <li key={index}>
                <a href={link} rel="noopener noreferrer" target="_blank" style={{ color: "#CCC" }}>{name}</a>
            </li>
        ));

    return (
        <div>
            <h4>Contacts</h4>
            <ul style={{
                marginLeft: "-1rem"
            }}>
                {contactsComponent}
            </ul>
        </div>
    )
};
