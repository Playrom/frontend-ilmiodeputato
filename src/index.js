/* eslint-disable import/first */
import dotenv from 'dotenv'

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import {Router} from 'react-router'
import { createBrowserHistory } from 'history'

// Import CSS reset and Global Styles
import './styles/theme.scss';

// import './globals'

// Import root app
import App from './containers/App'

dotenv.config()

const history = createBrowserHistory();

const render = () => {
  ReactDOM.render(
    <Router history={history}>
      <App />
    </Router>,
    document.getElementById('root')
  );
};

render();
