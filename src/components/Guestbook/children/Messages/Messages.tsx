import React from 'react';
import Identicon from '@polkadot/react-identicon';
import { toShortAddress } from 'utils';
import { Message } from 'types/message';
import './Messages.scss';

type Props = {
  messages: Message[];
};

const Messages = ({ messages }: Props) => {
  const messagesItem = messages.map((item: Message, index: number) => (
    <div className="messages-list__message" key={index}>
      <div className="messages-list__user-info">
        <div className="messages-list__user-icon">
          <Identicon value={item.autor} size={25} theme="polkadot" />
        </div>
        <div className="messages-list__user-name">
          {toShortAddress(item.autor)}
        </div>
      </div>
      <div className="messages-list__user-message">
        <p>{item.text}</p>
      </div>
    </div>
  ));

  return <div className="messages-list">{messagesItem.reverse()}</div>;
};

export { Messages };
