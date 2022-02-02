import { web3FromSource } from '@polkadot/extension-dapp';
import { GearApi } from '@gear-js/api';
import { UserAccount } from '../types/user';
import { InjectedExtension } from '@polkadot/extension-inject/types';

export const sendMessageToProgram = async (
  api: GearApi,
  destination: string,
  gas: number,
  payload: any,
  types: any,
  account: UserAccount,
  alert: any,
  callback?: () => void,
) => {
  if (account == null) {
    alert.error(`Wallet not connected`);
    return;
  }

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
    await api.message.signAndSend(
      account.address,
      { signer: injector.signer },
      (data: any) => {
        if (data.status.isInBlock) {
          alert.info(`In block`);
        }

        if (data.status.isFinalized) {
          data.events.forEach((event: any) => {
            const { method } = event.event;

            if (method === 'DispatchMessageEnqueued') {
              alert.success(`Finalized`);
              if (callback) {
                callback();
              }
            }

            if (method === 'ExtrinsicFailed') {
              alert.error(`Extrinsic Failed`);
            }
          });
        }

        if (data.status.isInvalid) {
          alert.error(`Invalid Transaction`);
        }
      },
    );
  } catch (error) {
    alert.error(`${error}`);
    console.error('transaction failed', error);
  }
};
