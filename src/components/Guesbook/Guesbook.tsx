import React from 'react';
import { Welcome } from './Welcome/Welcome';
import { Form } from './Form/Form';
import { MessageList } from './MessageList/MessageList';

export const Guestbook = () => {

  const list = [
    {
      address: 'DchivRo8afQEiK731M3MtFZwbAE1tj3zzUFCpiZqpy1zYLE',
      msg: 'Hello is it me?'
    },
    {
      address: '14zy72LYvcMiUzsacFSR1xzQsG84Pujby98LvWSVtzSiS3ti',
      msg: 'Hello is it me?'
    },
    {
      address: '13rvhBRU2Hmnk68AVn5igNnaBU91MG38SHMB9Bo3r8p8vsWa',
      msg: 'Hello is it me?'
    },
    {
      address: '1REAJ1k691g5Eqqg9gL7vvZCBG7FCCZ8zgQkZWd4va5ESih',
      msg: 'Hello is it me?'
    }
  ]

  return (
    <>
      <Welcome />
      <Form />
      <MessageList list={list}/>
    </>
  );
};
