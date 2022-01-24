import { web3FromSource } from '@polkadot/extension-dapp';
import { GearApi } from '@gear-js/api';
import { UserAccount } from '../types/user';
import { InjectedExtension } from '@polkadot/extension-inject/types';

export const sendMessageToProgram = async (api: GearApi, destination: string, gas: number, payload: any, types: any, account: UserAccount, alert: any, callback?: any) => {
  const injector: InjectedExtension = await web3FromSource(account.meta.source);

  try {
    const message = {
      destination,
      payload,
      gasLimit: gas,
      value: 0,
    };
    
    await api.message.submit(message, types);
  } catch (error) {
    console.error(`${error}`);
  }

  try {
    await api.message.signAndSend(account.address, { signer: injector.signer }, ({ status }) => {
        alert.info(`${status}`)
    });
    alert.success(`Completed`)

    if(callback) {
      callback();
    }
    
  } catch (error) {
    alert.error(`${error}`)
    console.error('transaction failed', error);
  }
};
