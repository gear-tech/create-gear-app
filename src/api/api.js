import { ApiPromise, WsProvider } from '@polkadot/api';

// Connecting to RPC node

export async function initApi() {
    
    const wsProvider = new WsProvider('wss://rpc.polkadot.io');
    const api = await ApiPromise.create({ provider: wsProvider });
  
    return api
}  