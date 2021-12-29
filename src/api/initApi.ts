import { GearApi } from '@gear-js/api';
import { Balance } from '@polkadot/types/interfaces';
import { UnsubscribePromise } from '@polkadot/api/types';
import { REACT_APP_NETWORK } from '../config';

class NodeApi {
  get api(): GearApi | null {
    return this._api;
  }

  private address: string;

  private chain: string | null;

  private _api: GearApi | null = null;

  readonly subscriptions: Record<string, UnsubscribePromise> = {};

  constructor(address = 'ws://localhost:9944') {
    this.address = address;
    this.chain = null;
    this.subscriptions = {};
  }

  async init() {
    this._api = await GearApi.create({
      providerAddress: this.address,
    });
  }

  public subscribeBalanceChange(address: string, cb: (event: Balance) => void) {
    if (this._api && !('balanceEvents' in this.subscriptions)) {
      this.subscriptions.balanceEvents =
        this._api.gearEvents.subsribeBalanceChange(address, (val: any) => {
          cb(val);
        });
    }
  }

  public unsubscribeBalanceChange() {
    if ('balanceEvents' in this.subscriptions) {
      (async () => {
        (await this.subscriptions.balanceEvents)();
      })();
    }
  }
}

export const nodeApi = new NodeApi(REACT_APP_NETWORK);
