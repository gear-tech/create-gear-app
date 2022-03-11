import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';
import { LOCAL_STORAGE } from 'consts';

export const isLoggedIn = ({ address }: InjectedAccountWithMeta) =>
  localStorage.getItem(LOCAL_STORAGE.ACCOUNT) === address;
