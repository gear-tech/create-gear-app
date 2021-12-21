import { ApiPromise, WsProvider } from '@polkadot/api';
import { REACT_APP_NETWORK } from '../const';

class NodeApi {
  get api(): ApiPromise | null {
    return this._api;
  }

  private address: string;

  private chain: string | null;

  private _api: ApiPromise | null = null;

  constructor(address = 'ws://localhost:9944') {
    this.address = address;
    this.chain = null;
  }

  async init() {
    
    const wsProvider = new WsProvider(this.address);
    this._api = await ApiPromise.create({ provider: wsProvider });

  }
}

export const nodeApi = new NodeApi(REACT_APP_NETWORK);
