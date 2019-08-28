import React, {Component} from 'react';

class Contacts extends Component {

    render() {

        let {contacts} = this.props;

        contacts = contacts.map(function (currentValue, index, array) {
            return (
                <li>
                    <a href={currentValue.link} rel="noopener noreferrer" target="_blank">{currentValue.name}</a>
                </li>
            );
        });

        return (
            <div>
                <h3>Contacts:</h3>
                <ul>
                    {contacts}
                </ul>
            </div>
        )
    }
}

export default Contacts