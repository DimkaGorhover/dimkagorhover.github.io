import React from 'react';
import { render } from 'react-dom'
import { App } from "./App";
import './index.scss'

// https://github.com/facebook/create-react-app
// https://learn.javascript.ru/screencast/react#react-state
// https://dev.to/javascripterika/deploy-a-react-app-as-a-github-user-page-with-yarn-3fka

render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
  document.getElementById("root"));
