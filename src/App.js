import { React, useState, useCallback } from 'react';
import { useApi } from './api/apiContext';
import styled from 'styled-components';
import Wallet from './components/Wallet';
import Form from './components/Form';

function App() {
  const [account, setAccout] = useState(null);

  const { loading } = useApi();
  // Setting account state
  const handleAccount = useCallback((acc) => {
    setAccout(acc);
  }, []);

  return loading ? <p>Loading...</p> : (
    <AppContainer>
      <Header>
        <Wallet handleAccount={handleAccount}/>
      </Header>
      <main>
        <h1>Say Hi dApp</h1>
        <p>This is a simple demo dApp for getting started quickly. Happy hack!</p>
        <Form account={account}/>
      </main>
    </AppContainer>
  );
}

const AppContainer = styled.div`
  color: #fefefe;
`;

const Header = styled.header`
  margin: 0.5em 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  color: #fefefe;
`;

export default App;
