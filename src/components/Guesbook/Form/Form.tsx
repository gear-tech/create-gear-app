import React, { useState } from 'react';

import './Form.scss';

export const Form = ({ handleSubmit }: any) => {

  const [messageContext, setMessageContext] = useState<string>('');
  const [valueContext, setValueContext] = useState<number>(0);

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
        <button className="message-form__button success" onClick={(event) => {handleSubmit(event, messageContext)}}>
          Add message
        </button>
      </footer>
    </form>
  );
};
