import React from 'react';
import { contacts } from "../../data/cv_data";

const Link = ({ link, name }) => {

    return (
        <li>
            <a href={link} rel="noopener noreferrer" target="_blank">{name}</a>
        </li>
    )
}

const Noop = () => <></>

export const Contacts = () => {

    return (
        <div>
            <h4>Contacts</h4>
            <ul style={{ marginLeft: "-1rem" }}>
                {contacts.map((props, i) => {
                    return props.important === false ? <Noop key={i} /> : (<Link key={i} {...props} />)
                })}
            </ul>
        </div>
    )
};
