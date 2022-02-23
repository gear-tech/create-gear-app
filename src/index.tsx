import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ApiProvider } from './context/api';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import { AlertTemplate } from './components/AlertTemplate';
import { UserProvider } from './context/UserContext';

const options = {
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: '10px',
  transition: transitions.SCALE,
};

ReactDOM.render(
  <React.StrictMode>
    <ApiProvider>
      <UserProvider>
        <AlertProvider template={AlertTemplate} {...options}>
          <App />
        </AlertProvider>
      </UserProvider>
    </ApiProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
