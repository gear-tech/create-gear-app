import { ApiPromise, WsProvider } from '@polkadot/api';
import { REACT_APP_NETWORK } from '../const';

async function initApi() {
  const wsProvider = new WsProvider(REACT_APP_NETWORK);
  const api = await ApiPromise.create({ provider: wsProvider });

  return api;
}

export default initApi;
