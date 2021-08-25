import { ApiPromise, WsProvider } from '@polkadot/api';

// Connecting to RPC node

async function initApi() {
  const wsProvider = new WsProvider('ws://127.0.0.1:9944');
  const api = await ApiPromise.create({ provider: wsProvider });

  return api;
}

export default initApi;
