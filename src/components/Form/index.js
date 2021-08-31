import { React, useState } from 'react';
import { web3FromSource } from '@polkadot/extension-dapp';
import { useAlert } from 'react-alert';
import { useApi } from '../../context/ApiContext';
import { useUser } from '../../context/UserContext';
import {
  Highlight,
  Label,
  Input,
  InputNumber,
  Button,
} from './styles';

const Form = () => {
  const [destination, setDestination] = useState('');
  const [amount, setAmount] = useState(0);
  const [account, setAccount] = useUser();

  const alert = useAlert();
  const { api } = useApi();

  // Form submit example
  const handleSubmit = async (e) => {
    e.preventDefault();

    const FROM_MILI = 1000000000000;
    const transferExtrinsic = api.tx.balances.transfer(destination, amount * FROM_MILI);
    const injector = await web3FromSource(account.meta.source);

    transferExtrinsic.signAndSend(account.address, { signer: injector.signer }, ({ status }) => {
      if (status.isInBlock) {
        alert.success(`Completed`);
      } else {
        alert.show(`Current status: ${status.type}`);
      }
    })
      .catch((error) => {
        alert.error(':( transaction failed', error);
      });
  };

  return (
    <form>
      <Highlight>
        <Label htmlFor="destination">Message: </Label>
        <Input
          type="text"
          id="destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          autoComplete="off"
          required
        />
      </Highlight>
      <p>
        <Label htmlFor="amount">Amount:</Label>
        <InputNumber
          type="number"
          id="amount"
          step="0.01"
          min="0"
          max="100"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          autoComplete="off"
        />
      </p>
      <Button type="button" className="sendButton" onClick={handleSubmit}>
        Send
      </Button>
    </form>
  );
};

export default Form;
