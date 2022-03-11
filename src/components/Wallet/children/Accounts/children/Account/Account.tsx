import Identicon from '@polkadot/react-identicon';
import clsx from 'clsx';
import { UserAccount } from 'types/user';
import { toShortAddress } from 'utils';
import './Account.scss';

type Props = {
  account: UserAccount;
  closeModal: () => void;
};

const Account = ({ account, closeModal }: Props) => {
  const handleClick = () => {
    // selectAccount(event, index);
    closeModal();
  };

  return (
    <button
      type="button"
      className={clsx('account-list__item', account.isActive && 'active')}
      onClick={handleClick}
    >
      <span className="account-list__icon">
        <Identicon value={account.address} size={25} theme="polkadot" />
      </span>
      <span className="account-list__name">{account.meta.name}</span>
      <span className="account-list__address">
        {toShortAddress(account.address)}
      </span>
    </button>
  );
};

export { Account };
