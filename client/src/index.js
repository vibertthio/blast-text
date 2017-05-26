import React from 'react';
import ReactDOM from 'react-dom';
import ControlBoard from './js/ControlBoard';
import './index.css';
import MuiThemeProvider from '../node_modules/material-ui/styles/MuiThemeProvider';

const App = () => (
  <MuiThemeProvider>
    <ControlBoard />
  </MuiThemeProvider>
);

ReactDOM.render(
  <App />,
  document.getElementById('root'),
);
