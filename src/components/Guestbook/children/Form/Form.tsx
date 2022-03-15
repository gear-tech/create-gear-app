import React, { ChangeEvent, FormEvent, useState } from 'react';
import { CONTRACT_ADDRESS, REGISTRY_TYPES } from 'consts';
import { useAccount, useApi } from 'hooks';
import { useAlert } from 'react-alert';
import { sendMessageToProgram } from 'service/SendMessage';
import './Form.scss';

type Props = {
  fetchMessages: () => void;
};

const Form = ({ fetchMessages }: Props) => {
  const { api } = useApi();
  const { account } = useAccount();
  const alert = useAlert();

  const [message, setMessage] = useState('');
  const [value, setValue] = useState(0);

  const handleMessageChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleMinusClick = () => {
    if (value > 0) {
      setValue((prevValue) => prevValue - 1);
    }
  };

  const handlePlusClick = () => {
    setValue((prevValue) => prevValue + 1);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    // example of sending a message to the program
    e.preventDefault();

    if (account) {
      sendMessageToProgram(
        api,
        CONTRACT_ADDRESS,
        300_000_000,
        { AddMessage: message },
        { handle_input: 'Action', types: REGISTRY_TYPES },
        account,
        alert,
        fetchMessages
      );
    } else {
      alert.error('Wallet not connected');
    }
  };

  return (
    <form className="message-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Type your message:"
        value={message}
        onChange={handleMessageChange}
        required
      />
      <footer>
        <div className="counter">
          <div className="title">Value:</div>
          <span className="minus" onClick={handleMinusClick} />
          <input
            type="number"
            className="message-form__value"
            value={value}
            readOnly
          />
          <span className="plus" onClick={handlePlusClick} />
        </div>
        <button type="submit" className="message-form__button success">
          Add message
        </button>
      </footer>
    </form>
  );
};

export { Form };
