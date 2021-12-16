import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ApiProvider } from './context/ApiContext';
import { UserProvider } from './context/UserContext';
import { ModalProvider } from './context/ModalContext';

ReactDOM.render(
  <React.StrictMode>
    <ApiProvider>
      <UserProvider>
        <ModalProvider>
          <App />
        </ModalProvider>
      </UserProvider>
    </ApiProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
