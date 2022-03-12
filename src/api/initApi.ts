import { GearApi } from '@gear-js/api';
import { UnsubscribePromise } from '@polkadot/api/types';
import { REACT_APP_NETWORK } from 'consts';

class NodeApi {
  get api(): GearApi | null {
    return this._api;
  }

  private address: string;

  private chain: string | null;

  private _api: GearApi | null = null;

  readonly subscriptions: Record<string, UnsubscribePromise> = {};

  constructor(address: string) {
    this.address = address;
    this.chain = null;
    this.subscriptions = {};
  }

  async init() {
    this._api = await GearApi.create({
      providerAddress: this.address,
    });

    return this._api;
  }
}

export const nodeApi = new NodeApi(REACT_APP_NETWORK);
