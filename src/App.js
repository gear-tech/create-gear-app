import React from 'react';
import { useApi } from './context/ApiContext';
import styled from 'styled-components';
import Wallet from './components/Wallet';
import Form from './components/Form';
import Loader from './components/Loader';

function App() {
  const { loading } = useApi();

  return loading ? (
    <Loader />
  ) : (
    <AppContainer>
      <Header>
        <Wallet />
      </Header>
      <main>
        <h1>Say Hi dApp</h1>
        <p>This is a simple demo dApp for getting started quickly. Happy hack!</p>
        <Form />
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
