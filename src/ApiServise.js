import { web3FromSource } from '@polkadot/extension-dapp';
import { getWasmMetadata } from '@gear-js/api'

export const sendMessage = async (api, destination, gas, payload, account, alert, callback) => {
  const injector = await web3FromSource(account.meta.source);

  try {
    const message = {
      destination,
      payload,
      gasLimit: gas,
      value: 0,
    };
    
    await api.message.submit(message, abi);
  } catch (error) {
    console.error(`${error.name}: ${error.message}`);
  }

  try {
    await api.message.signAndSend(account.address, { signer: injector.signer }, ({ status }) => {
        alert.show(`Current status: ${status}`);
    });
    alert.success(`Completed`);
    callback();
  } catch (error) {
    alert.error(':( transaction failed', error);
  }
};
