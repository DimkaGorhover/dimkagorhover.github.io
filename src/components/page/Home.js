import React from 'react';
import { Link } from 'react-router-dom';
import { Jumbotron } from "react-bootstrap";
import { IconContext } from "react-icons";
import { SocialPanel } from "../cv/SocialPanel";


export const Home = () => {

    React.useEffect(() => {
        document.title = "Home Page";
    });

    return (
        <div>
            <Jumbotron>
                <h1>Home Page</h1>
                <div>
                    <IconContext.Provider value={{ size: '2em' }}>
                        <SocialPanel />
                    </IconContext.Provider>
                </div>
            </Jumbotron>

            <Link to='/cv/main' className='nav-link'>Short CV</Link>
            <Link to='/cv/tech' className='nav-link'>Technical CV</Link>
        </div>
    )
}
