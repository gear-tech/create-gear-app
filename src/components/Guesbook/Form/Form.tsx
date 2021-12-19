import React, { useState } from 'react';
import './Form.scss'

export const Form = () => {
  const [messageContext, setMessageContext] = useState<string>('');
  const [valueContext, setValueContext] = useState<number>(0);

  // Search submit example
  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(messageContext)
    console.log(valueContext)
  };

  return (
    <>
      <form className="message-form">
          <label htmlFor="value" className="message-form__label">Message:</label>
          <input
            type="text"
            id="message"
            className="message-form__message"
            placeholder="Type your message:"
            value={messageContext}
            onChange={(e: any) => setMessageContext(e.target.value)}
            autoComplete="off"
            required
          />
          <label htmlFor="value"  className="message-form__label">Value:</label>
          <input 
            type="number"
            className="message-form__value"
            id="value"
            value={valueContext}
            onChange={(e: any) => setValueContext(e.target.value)}
          />
      </form>
      <button type="button" className="message-form__button success">Add Message</button>
    </>
  );
};
