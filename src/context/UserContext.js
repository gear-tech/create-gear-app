import React, { useContext, useEffect, useState } from 'react';
import { useApi } from './ApiContext';

export const UserContext = React.createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [freeBalance, setFreeBalance] = useState(null);
  const { loading, api } = useApi();

  const user = {
    account: account,
    setAccount: setAccount,
    freeBalance: freeBalance,
  };

  useEffect(() => {
    // Do not use API instance if it is not ready
    if (!loading) {
      // Get balance for current account
      const getBalance = async (ADDR) => {
        const { data: balance } = await api.query.system.account(ADDR);
        setFreeBalance(balance.free.toHuman());
      };
      getBalance(account.address);
    }
  }, [account]); // eslint-disable-line react-hooks/exhaustive-deps

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
