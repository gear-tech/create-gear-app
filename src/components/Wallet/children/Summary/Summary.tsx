import Identicon from '@polkadot/react-identicon';
import { ReactComponent as Logout } from 'images/logout.svg';
import { LOCAL_STORAGE } from 'consts';
import { useAccount } from 'hooks';
import { useBalance } from './hooks';
import './Summary.scss';

type Props = {
  openModal: () => void;
  closeModal: () => void;
};

const Summary = ({ openModal, closeModal }: Props) => {
  const { account, setAccount } = useAccount();
  const balance = useBalance();

  const logOut = () => {
    setAccount(undefined);
    localStorage.removeItem(LOCAL_STORAGE.ACCOUNT);
  };

  const handleClick = () => {
    logOut();
    closeModal();
  };

  return (
    <div className="user-wallet__wrapper">
      {account ? (
        <>
          <div className="user-wallet__balance">{balance}</div>
          <button
            type="button"
            className="user-wallet__user-info"
            onClick={openModal}
          >
            <Identicon value={account.address} size={25} theme="polkadot" />
            <span className="user-wallet__name">{account.meta.name}</span>
          </button>
          <button
            type="button"
            className="user-wallet__logout"
            aria-label="menuLink"
            onClick={handleClick}
          >
            <Logout />
          </button>
        </>
      ) : (
        <button
          className="user-wallet__connect-button"
          type="button"
          onClick={openModal}
        >
          Connect
        </button>
      )}
    </div>
  );
};

export { Summary };
