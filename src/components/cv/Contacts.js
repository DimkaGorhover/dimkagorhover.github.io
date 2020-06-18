import React from 'react';
import { contacts } from "../../data/cv_data";
import { Noop } from '../commons/Noop';
import { BlankLink } from '../commons/BlankLink';

export const Contacts = ({ importantOnly = true }) => {

    const links = contacts.map(({ name, link, important }, i) => {
        return (importantOnly && important === false)
            ? (<Noop key={i} />)
            : (<li key={i}>
                <BlankLink name={name} href={link} />
            </li>)
    })

    return (
        <div>
            <h4>Contacts</h4>
            <ul style={{ marginLeft: "-1em" }}>
                {links}
            </ul>
        </div>
    )
}
