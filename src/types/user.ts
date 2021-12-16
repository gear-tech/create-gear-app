import type { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';

export interface UserAccount extends InjectedAccountWithMeta {
    isActive?: boolean;
}
