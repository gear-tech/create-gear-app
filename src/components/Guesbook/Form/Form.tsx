import React, { useState } from 'react';
import { useAlert } from 'react-alert';
import { useApi } from '../../../context/ApiPromiseContext';
import { useUser } from '../../../context/UserContext';
import { CONTRACT_ADDRESS, REGISTRY_TYPES } from '../../../config';
import { sendMessageToProgram } from '../../../service/SendMessage';

import './Form.scss';

export const Form = () => {
  const alert = useAlert();
  const { api } = useApi();
  const { currentAccount } = useUser();

  const [messageContext, setMessageContext] = useState<string>('');
  const [valueContext, setValueContext] = useState<number>(0);

  // Example of sending a message to the program
  const handleSubmit = (event: any) => {
    event.preventDefault();

    sendMessageToProgram(
      api,
      CONTRACT_ADDRESS,
      300_000_000,
      { AddMessage: messageContext },
      { handle_input: 'Action', types: REGISTRY_TYPES },
      currentAccount!,
      alert
    );
  };

  return (
    <form className="message-form">
      <input
        id="message"
        type="text"
        placeholder="Type your message:"
        value={messageContext}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setMessageContext(event.target.value)
        }
        autoComplete="off"
        required
      />
      <footer>
        <div className="counter">
          <div className="title">Value:</div>
          <span
            className="minus"
            onClick={() => {
              if (valueContext > 0) {
                setValueContext(valueContext - 1);
              }
            }}
          ></span>
          <input
            type="number"
            min="0"
            step="0.1"
            className="message-form__value"
            id="value"
            readOnly
            value={valueContext}
            onChange={(e: any) => setValueContext(e.target.value)}
          />
          <span
            className="plus"
            onClick={() => setValueContext(valueContext + 1)}
          ></span>
        </div>
        <button className="message-form__button success" onClick={handleSubmit}>
          Add message
        </button>
      </footer>
    </form>
  );
};
