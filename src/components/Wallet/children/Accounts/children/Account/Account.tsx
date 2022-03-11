import Identicon from '@polkadot/react-identicon';
import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';
import clsx from 'clsx';
import { LOCAL_STORAGE } from 'consts';
import { useAccount } from 'hooks';
import { toShortAddress } from 'utils';
import { isLoggedIn } from '../../../../utils';
import './Account.scss';

type Props = {
  account: InjectedAccountWithMeta;
  closeModal: () => void;
};

const Account = ({ account, closeModal }: Props) => {
  const { address, meta } = account;
  const { setAccount } = useAccount();
  const className = clsx('account-list__item', isLoggedIn(account) && 'active');

  const switchAccount = () => {
    setAccount(account);
    localStorage.setItem(LOCAL_STORAGE.ACCOUNT, address);
  };

  const handleClick = () => {
    switchAccount();
    closeModal();
  };

  return (
    <button type="button" className={className} onClick={handleClick}>
      <span className="account-list__icon">
        <Identicon value={address} size={25} theme="polkadot" />
      </span>
      <span className="account-list__name">{meta.name}</span>
      <span className="account-list__address">{toShortAddress(address)}</span>
    </button>
  );
};

export { Account };
