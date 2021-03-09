import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { Navigation } from "./Navigation";
import { Routers } from "./Routers";
import { Noop } from "./components/commons/Noop";

export const App = () => {
  return (
    <Router basename={process.env.PUBLIC_URL}>

      <header>
        <Navigation/>
      </header>

      <main>
        <Routers/>
      </main>

      <footer>
        <Noop/>
      </footer>

    </Router>
  );
};
