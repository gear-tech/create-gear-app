import React, { useContext, useEffect, useState } from 'react';
import { web3Accounts, web3Enable } from '@polkadot/extension-dapp';
import { useApi } from './ApiContext';



export const UserContext = React.createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [injectedAccounts, setInjectedAccounts] = useState(null);
  const [freeBalance, setFreeBalance] = useState(null);
  const { loading, gear } = useApi();

  // Getting all existing accounts from Polkadot extension
  // If LocalStorage already contains the last chosen account then set it into the State

  const getAllAccounts = async () => {
    const extensions = await web3Enable('MyGearApp');

    if (extensions.length === 0) {
      return;
    }

    const allAccounts = await web3Accounts();

    allAccounts.forEach((acc) => {
      if (acc.address === localStorage.getItem('savedAccount')) {
        acc.isActive = true;
        setCurrentAccount(acc);
      }
    });
    setInjectedAccounts(allAccounts);
  };

  // Setting current account and save it into the LocalStage
  const selectAccount = (event, index) => {
    event.stopPropagation();
    injectedAccounts.forEach((acc, i) => {
      acc.isActive = false;
      if (i === index) {
        acc.isActive = true;
        localStorage.setItem('savedAccount', acc.address);
      }
    });
    setCurrentAccount(injectedAccounts[index]);
  };

  const user = {
    currentAccount: currentAccount,
    allAccounts: injectedAccounts,
    accountBalance: freeBalance,
    setCurrentAccount: setCurrentAccount,
    selectAccount: selectAccount,
  };

  useEffect(() => {
    setTimeout(() => {
      getAllAccounts();
    }, [100])
  }, []);

  useEffect(() => {
    // Get balance for current account

    const getBalance = async (ADDR) => {
      const freeBalance = await gear.balance.findOut(ADDR);
      setFreeBalance(freeBalance.toHuman());
    };

    if (!loading && currentAccount) {
      getBalance(currentAccount.address);
    }
  }, [currentAccount]); // eslint-disable-line react-hooks/exhaustive-deps

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
