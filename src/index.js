import React from 'react';
import ReactDOM from 'react-dom';
import { positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import './index.css';
import App from './App';
import { ApiProvider } from './api/apiContext';

// optional configuration
const options = {
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
};

ReactDOM.render(
  <ApiProvider>
    <AlertProvider template={AlertTemplate} {...options}>
      <App />
    </AlertProvider>
  </ApiProvider>,
  document.getElementById('root'),
);
