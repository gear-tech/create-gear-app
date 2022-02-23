import React, { useCallback, useEffect, useState } from 'react';
import { Welcome } from './Welcome/Welcome';
import { Form } from './Form/Form';
import { useAlert } from 'react-alert';
import { useApi } from 'hooks/useApi';
import { useUser } from '../../context/UserContext';
import { CONTRACT_ADDRESS, REGISTRY_TYPES } from 'const';
import { sendMessageToProgram } from '../../service/SendMessage';
import { MessageList } from './MessageList/MessageList';
import { Message } from '../../types/message';

export const Guestbook = () => {
  const alert = useAlert();
  const { api } = useApi();
  const { currentAccount } = useUser();

  const [messages, setMessages] = useState<Array<Message>>([]);
  const [refreshPage, setRefreshPage] = useState(false);

  const readState = useCallback(async () => {
    // @ts-ignore
    // TODO: add type
    const buffer = await import('../../out/guestbook.meta.wasm');
    const state = await api.programState.read(CONTRACT_ADDRESS, buffer.default);
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
      currentAccount!,
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
      <MessageList messages={messages} />
    </>
  );
};
