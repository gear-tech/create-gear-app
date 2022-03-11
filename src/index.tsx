import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ApiProvider } from './context/api';
import { AccountProvider } from 'context/account';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import { AlertTemplate } from './components/AlertTemplate';

const options = {
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: '10px',
  transition: transitions.SCALE,
};

ReactDOM.render(
  <React.StrictMode>
    <ApiProvider>
      <AccountProvider>
        <AlertProvider template={AlertTemplate} {...options}>
          <App />
        </AlertProvider>
      </AccountProvider>
    </ApiProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
