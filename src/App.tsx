import React from 'react';
import { useApi } from './context/ApiPromiseContext';
import { ReactComponent as Logo } from './images/logo.svg';
import { Loader } from './components/Loader/Loader';
import { Wallet } from './components/Wallet/Wallet';
import { Guestbook } from './components/Guesbook/Guesbook'

import './App.css';

function App() {
  const { isApiReady } = useApi();

  return (
    <div className="wrapper">
      {(!isApiReady && <Loader />) || (
        <>
          <section className="header-section">
            <div className="container">
              <a href="/" className="logo">
                <Logo />
              </a>
              <Wallet />
            </div>
          </section>

          <div className="main-section-content">
            <div className="container">
              <Guestbook />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
