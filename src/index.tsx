import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ApiPromiseProvider } from './context/ApiPromiseContext';
import { UserProvider } from './context/UserContext';
import { ModalProvider } from './context/ModalContext';

ReactDOM.render(
  <React.StrictMode>
    <ApiPromiseProvider>
      <UserProvider>
        <ModalProvider>
          <App />
        </ModalProvider>
      </UserProvider>
    </ApiPromiseProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
