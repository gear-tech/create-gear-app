import { React } from 'react';
import Identicon from '@polkadot/react-identicon';
import toShortAddress from '../../utils';
import {
  AccountList,
  AccountItem,
  AccountAlias,
  AccountIcon,
  AccountAddress,
} from './styles';

const AccountsList = ({ list, toggleAccount }) => {
  const accountItem = list.map((account, index) => (
    <AccountItem
      active={account.isActive}
      key={account.address}
      onClick={(e) => {
        toggleAccount(e, index);
      }}
    >
      <AccountIcon>
        <Identicon value={account.address} size={28} theme="polkadot" />
      </AccountIcon>
      <AccountAlias>{account.meta.name}</AccountAlias>
      <AccountAddress>{toShortAddress(account.address)}</AccountAddress>
    </AccountItem>
  ));

  return <AccountList>{accountItem}</AccountList>;
};

export default AccountsList;
