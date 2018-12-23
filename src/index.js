import dotenv from 'dotenv'

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import {Router} from 'react-router'
import createHistory from 'history/createBrowserHistory';

// Import CSS reset and Global Styles
import './styles/theme.scss';

// Import root app
import App from './containers/App'

dotenv.config()

const history = createHistory();

const render = () => {
  ReactDOM.render(
    <Router history={history}>
      <App />
    </Router>,
    document.getElementById('root')
  );
};

render();
