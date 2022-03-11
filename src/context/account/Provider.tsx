import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';
import { useState } from 'react';
import { Props } from '../types';
import { AccountContext } from './Context';

const { Provider } = AccountContext;

const useAccount = () => {
  const [account, setAccount] = useState<InjectedAccountWithMeta>();

  return { account, setAccount };
};

const AccountProvider = ({ children }: Props) => (
  <Provider value={useAccount()}>{children}</Provider>
);

export { AccountProvider };
