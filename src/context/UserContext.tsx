import React, { useContext, useEffect, useState } from 'react';
import { web3Accounts, web3Enable } from '@polkadot/extension-dapp';
import { UserAccount } from '../types/user';
import { useApi } from '../context/ApiContext';

type InitContextProps = {
  currentAccount: UserAccount | null;
  injectedAccounts: Array<UserAccount> | null;
  setCurrentAccount: any;
  accountBalance: string | null;
  selectAccount: (
    event: React.MouseEvent<HTMLButtonElement>,
    index: number,
  ) => void;
};

export const UserContext = React.createContext({} as InitContextProps);

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }: any) => {
  const [currentAccount, setCurrentAccount] = useState<UserAccount | null>(
    null,
  );
  const [injectedAccounts, setInjectedAccounts] = useState<
    UserAccount[] | null
  >(null);
  const [accountBalance, setAccountBalance] = useState<string | null>(null);

  const { api } = useApi();

  const getAllAccounts = async () => {
    const extensions = await web3Enable('MyGearApp');

    if (extensions.length === 0) {
      return;
    }

    const allAccounts: UserAccount[] = await web3Accounts();

    allAccounts.forEach((acc) => {
      if (acc.address === localStorage.getItem('savedAccount')) {
        acc.isActive = true;
        setCurrentAccount(acc);
      }
    });
    setInjectedAccounts(allAccounts);
  };

  const selectAccount = (
    event: React.MouseEvent<HTMLButtonElement>,
    index: number,
  ) => {
    event.stopPropagation();
    if (injectedAccounts) {
      injectedAccounts.forEach((acc: UserAccount, i: number) => {
        acc.isActive = false;
        if (i === index) {
          acc.isActive = true;
          localStorage.setItem('savedAccount', acc.address);
        }
      });
      setCurrentAccount(injectedAccounts[index]);
    }
  };

  const user = {
    currentAccount: currentAccount,
    injectedAccounts: injectedAccounts,
    accountBalance: accountBalance,
    setCurrentAccount: setCurrentAccount,
    selectAccount: selectAccount,
  };

  useEffect(() => {
    setTimeout(() => {
      getAllAccounts();
    }, 100);
  }, []);

  useEffect(() => {
    const getBalance = async (ADDR: string) => {
      const { free } = await api.query.balances.account(ADDR);
      setAccountBalance(free.toHuman());
    };

    if (currentAccount && api) {
      getBalance(currentAccount.address);
    }
  }, [currentAccount, api]);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
