import React from 'react';
import { AppHeader } from './header'
import { AppMain } from './main'
import { AppFooter } from './footer'

export const App = () => {
    return (
        <div>
            <AppHeader />
            <AppMain />
            <AppFooter />
        </div>
    )
};
