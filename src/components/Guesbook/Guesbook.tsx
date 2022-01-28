import React, { useCallback, useEffect, useState } from 'react';
import { Welcome } from './Welcome/Welcome';
import { Form } from './Form/Form';
import { useAlert } from 'react-alert';
import { useApi } from '../../context/ApiPromiseContext';
import { useUser } from '../../context/UserContext';
import { CONTRACT_ADDRESS, REGISTRY_TYPES } from '../../config';
import { sendMessageToProgram } from '../../service/SendMessage';
import { MessageList } from './MessageList/MessageList';

export const Guestbook = () => {
  const alert = useAlert();
  const { api } = useApi();
  const { currentAccount } = useUser();

  const [messages, setMessages] = useState<any>([]);
  const [refreshPage, setRefreshPage] = useState(false);

  const readState = useCallback(async () => {

    const response = await fetch('guestbook.meta.wasm');
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    console.log(buffer)
    console.log(CONTRACT_ADDRESS)

    const state = await api.programState.read(
      CONTRACT_ADDRESS,
      buffer,
    );
    console.log(state)
    setMessages(state.toHuman());
  }, []);

  useEffect(() => {
    readState();
  }, [refreshPage]);

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
      },
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
