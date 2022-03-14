import React, { useCallback, useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useApi, useAccount } from 'hooks';
import { CONTRACT_ADDRESS, REGISTRY_TYPES } from 'consts';
import { sendMessageToProgram } from '../../service/SendMessage';
import { Message } from '../../types/message';
import { Welcome, Form, Messages } from './children';

export const Guestbook = () => {
  const alert = useAlert();
  const { api } = useApi();
  const { account } = useAccount();

  const [messages, setMessages] = useState<Array<Message>>([]);
  const [refreshPage, setRefreshPage] = useState(false);

  const readState = useCallback(async () => {
    // @ts-ignore
    // TODO: add type
    const buffer = await import('../../out/guestbook.meta.wasm');
    const state = await api.programState.read(CONTRACT_ADDRESS, buffer.default);
    console.log(state.toHuman());
    setMessages(state.toHuman() as Message[]);
  }, [api.programState]);

  useEffect(() => {
    readState();
  }, [readState, refreshPage]);

  const handleSubmit = (event: React.MouseEvent<HTMLElement>, text: string) => {
    // Example of sending a message to the program
    event.preventDefault();

    sendMessageToProgram(
      api,
      CONTRACT_ADDRESS,
      300_000_000,
      { AddMessage: text },
      { handle_input: 'Action', types: REGISTRY_TYPES },
      account!,
      alert,
      () => {
        setRefreshPage(!refreshPage);
      }
    );
  };

  return (
    <>
      <Welcome />
      <Form handleSubmit={handleSubmit} />
      <Messages messages={messages} />
    </>
  );
};
