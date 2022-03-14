import React, { useEffect, useState } from 'react';
import { useApi } from 'hooks';
import { CONTRACT_ADDRESS } from 'consts';
import { Message } from './types';
import { Welcome, Form, Messages } from './children';

export const Guestbook = () => {
  const { api } = useApi();
  const [messages, setMessages] = useState<Message[]>([]);

  const updateMessages = () => {
    // TODO: types
    // @ts-ignore
    import('out/guestbook.meta.wasm')
      .then((buffer) => api.programState.read(CONTRACT_ADDRESS, buffer.default))
      .then((state) => state.toHuman() as Message[])
      .then(setMessages);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(updateMessages, []);

  return (
    <>
      <Welcome />
      <Form updateMessages={updateMessages} />
      <Messages messages={messages} />
    </>
  );
};
