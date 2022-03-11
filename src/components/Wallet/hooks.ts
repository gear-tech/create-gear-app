import { useEffect, useState } from 'react';
import { web3Accounts, web3Enable } from '@polkadot/extension-dapp';
import {
  InjectedAccountWithMeta,
  InjectedExtension,
} from '@polkadot/extension-inject/types';
import { Balance } from '@polkadot/types/interfaces';
import { useApi, useAccount } from 'hooks';

export const useAccounts = () => {
  const [accounts, setAccounts] = useState<InjectedAccountWithMeta[]>();

  const getAccounts = (extensions: InjectedExtension[]) =>
    extensions.length > 0 ? web3Accounts() : undefined;

  useEffect(() => {
    setTimeout(() => {
      web3Enable('Gear App').then(getAccounts).then(setAccounts);
    }, 300);
  }, []);

  return accounts;
};

export const useBalance = () => {
  const { api } = useApi();
  const { account } = useAccount();
  const [balance, setBalance] = useState<Balance>();

  useEffect(() => {
    if (account) {
      const { address } = account;

      api.balance.findOut(address).then(setBalance);
      api.gearEvents.subscribeToBalanceChange(address, setBalance);
    }
  }, [api, account]);

  return balance?.toHuman();
};
