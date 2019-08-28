import React, {Component} from 'react';

class ContactEntry extends Component {
    render() {
        const {name, link} = this.props;
        return (
            <li>
                <a href={link} rel="noopener noreferrer" target="_blank">{name}</a>
            </li>
        )
    }
}

export default class Contacts extends Component {

    render() {

        const contacts = this.props.contacts.map(function (currentValue, index, array) {
            return (
                <ContactEntry name={currentValue.name} link={currentValue.link} />
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
