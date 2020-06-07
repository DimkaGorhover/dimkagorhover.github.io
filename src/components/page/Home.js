import React from 'react';
import { Link } from 'react-router-dom';

export const Home = () => {
    React.useEffect(() => {
        document.title = "Home";
    });
    return (
        <div>
            <h1>Home Page</h1>
            <Link to='/cv/main' className='nav-link'>Short CV</Link>
            <Link to='/cv/tech' className='nav-link'>Technical CV</Link>
        </div>
    )
}
