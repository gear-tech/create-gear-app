import React from 'react';
import ReactDOM from 'react-dom';
import { positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import './index.css';
import App from './App';
import { ApiProvider } from './context/ApiContext';
import { UserProvider } from './context/UserContext';

// optional configuration
const options = {
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
};

ReactDOM.render(
  <ApiProvider>
    <UserProvider>
      <AlertProvider template={AlertTemplate} {...options}>
        <App />
      </AlertProvider>
    </UserProvider>
  </ApiProvider>,
  document.getElementById('root'),
);
