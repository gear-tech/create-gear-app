import React from 'react';
import Identicon from '@polkadot/react-identicon';
import { toShortAddress } from '../../../utils';

import './MessageList.scss';

type Props = {
  list: Message[];
};

type Message = {
  address: string;
  msg: string;
};

export const MessageList = ({ list }: Props) => {
  const MessageItem = list.map((item: Message, index: number) => (
    <div className="messages-list__message">
      <div className="messages-list__user-info" key={index}>
        <div className="messages-list__user-icon">
          <Identicon value={item.address} size={25} theme="polkadot" />
        </div>
        <div className="messages-list__user-name">
          {toShortAddress(item.address)}
        </div>
      </div>
      <div className="messages-list__user-message">
        <p>{item.msg}</p>
      </div>
    </div>
  ));

  return <div className="messages-list scroll">{MessageItem}</div>;
};
