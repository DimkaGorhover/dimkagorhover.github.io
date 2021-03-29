import React from 'react';
import { HashRouter as ReactRouter } from 'react-router-dom';
import { Navigation } from './Navigation';
import { Routers } from './Routers';
import { Noop } from './components/common';

export const App = () => {
  return (
    <ReactRouter basename={process.env.PUBLIC_URL}>
      <header>
        <Navigation />
      </header>
      <main>
        <Routers />
      </main>
      <footer>
        <Noop />
      </footer>
    </ReactRouter>
  );
};
