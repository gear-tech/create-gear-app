import { GearApi } from '@gear-js/api';
import { REACT_APP_NETWORK } from '../const';

class NodeApi {
  get api(): GearApi | null {
    return this._api;
  }

  private address: string;

  private chain: string | null;

  private _api: GearApi | null = null;

  constructor(address = 'ws://localhost:9944') {
    this.address = address;
    this.chain = null;
  }

  async init() {
    
    this._api = await GearApi.create({ providerAddress: this.address });
  
  }
}

export const nodeApi = new NodeApi(REACT_APP_NETWORK);
