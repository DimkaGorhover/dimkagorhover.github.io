import React, {Component} from 'react';

class HelloWorld extends Component {

    state = {
        isOpen: true
    };

    render() {
        const {message} = this.props;
        return (
            <div>
                <h1>{message}</h1>
                <button onClick={this.alertHelloWorld}>
                    click button
                </button>
            </div>
        )
    }

    alertHelloWorld = () => {

        this.setState({
            isOpen: !this.state.isOpen
        });

        alert("Hello World " + this.state.isOpen)
    }
}

export default HelloWorld