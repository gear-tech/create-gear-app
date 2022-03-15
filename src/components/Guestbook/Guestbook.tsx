import React, { useEffect, useState } from 'react';
import { useApi } from 'hooks';
import { CONTRACT_ADDRESS } from 'consts';
import { Message } from './types';
import { Welcome, Form, Messages } from './children';
import guestbookMeta from 'out/guestbook.meta.wasm';

const Guestbook = () => {
  const { api } = useApi();
  const [messages, setMessages] = useState<Message[]>([]);

  const fetchMessages = () => {
    fetch(guestbookMeta)
      .then((res) => res.arrayBuffer())
      .then((arrayBuffer) => Buffer.from(arrayBuffer))
      .then((buffer) => api.programState.read(CONTRACT_ADDRESS, buffer))
      .then((state) => state.toHuman() as Message[])
      .then(setMessages);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(fetchMessages, []);

  return (
    <>
      <Welcome />
      <Form fetchMessages={fetchMessages} />
      <Messages messages={messages} />
    </>
  );
};

export { Guestbook };
