import React from 'react';
import ReactDOM from 'react-dom';
import { positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import './index.css';
import App from './App';
import initApi from './api/api';

// optional configuration
const options = {
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
};

initApi()
  .then((api) => {
    ReactDOM.render(
      <AlertProvider template={AlertTemplate} {...options}>
        <App api={api} />
      </AlertProvider>,
      document.getElementById('root'),
    );
  })
  .catch(console.error);
