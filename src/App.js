import './App.css';
import { React, useState, useCallback } from 'react';
import Wallet from './components/Wallet';
import Form from './components/Form';

function App({ api }) {
  const [account, setAccout] = useState(null);
  // Setting account state
  const handleAccount = useCallback((acc) => {
    setAccout(acc);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Wallet handleAccount={handleAccount} api={api} />
      </header>
      <main>
        <h1>Say Hi dApp</h1>
        <p>This is a simple demo dApp for getting started quickly. Happy hack!</p>
        <Form account={account} api={api} />
      </main>
    </div>
  );
}

export default App;
