import { web3FromSource } from '@polkadot/extension-dapp';
import { GearApi } from '@gear-js/api';
import { UserAccount } from '../types/user';
import { InjectedExtension } from '@polkadot/extension-inject/types';

export const sendMessage = async (api: GearApi, destination: string, gas: number, payload: any, abi: any, account: UserAccount, callback?: any) => {
  const injector: InjectedExtension = await web3FromSource(account.meta.source);

  try {
    const message = {
      destination,
      payload,
      gasLimit: gas,
      value: 0,
    };
    
    await api.message.submit(message, abi);
  } catch (error) {
    console.error(`${error}`);
  }

  try {
    await api.message.signAndSend(account.address, { signer: injector.signer }, ({ status }) => {
        console.log(`Current status: ${status}`);
    });
    console.log(`Completed`);
    callback();
  } catch (error) {
    console.error(':( transaction failed', error);
  }
};
