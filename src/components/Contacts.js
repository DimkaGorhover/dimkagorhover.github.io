import React, {Component} from 'react';

export default class Contacts extends Component {

    render() {

        const contacts = this.props.contacts.map(function (contactEntry, index, array) {
            const {name, link} = contactEntry;
            return (
                <li>
                    <a href={link} rel="noopener noreferrer" target="_blank">{name}</a>
                </li>
            );
        });

        return (
            <div>
                <h3>Contacts:</h3>
                <ul>{contacts}</ul>
            </div>
        )
    }
}
