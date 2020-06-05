import React from 'react';
import { AppHeader } from './header'
import { AppMain } from './main'
import { AppFooter } from './footer'



export const App = () => {

    const wrapperRef = React.useRef()

    const handleClick = () => {
        const wrapper = wrapperRef.current;
        wrapper.classList.toggle('is-nav-open')
    }

    return (
        <div ref={wrapperRef} className="wrapper">
            <div className="nav">
                <icon
                    className="nav__icon"
                    type="menu-fold"
                    onClick={handleClick}/>
                <div className="nav__body">
                    <h3>Main CV</h3>
                    <h3>Tech CV</h3>
                </div>
            </div>
        </div>
    )

    return (
        <div>
            <AppHeader />
            <AppMain />
            <AppFooter />
        </div>
    )
};
