import { useEffect, useState } from 'react';
import { web3Accounts, web3Enable } from '@polkadot/extension-dapp';
import {
  InjectedAccountWithMeta,
  InjectedExtension,
} from '@polkadot/extension-inject/types';

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
