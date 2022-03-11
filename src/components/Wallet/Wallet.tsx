import { useEffect, useState } from 'react';
import Identicon from '@polkadot/react-identicon';
import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';
import { ReactComponent as Logout } from 'images/logout.svg';
import { Modal } from 'components/Modal/Modal';
import { useAccount } from 'hooks';
import { useAccounts, useBalance } from './hooks';
import { Accounts, NoExtension } from './children';
import './Wallet.scss';

const Wallet = () => {
  const { account, setAccount } = useAccount();
  const accounts = useAccounts();
  const balance = useBalance();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isLoggedIn = ({ address }: InjectedAccountWithMeta) =>
    localStorage.getItem('account') === address;

  useEffect(() => {
    if (accounts) setAccount(accounts.find(isLoggedIn));
  }, [accounts, setAccount]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    setAccount(undefined);
    localStorage.removeItem('account');
  };

  return (
    <>
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
              onClick={handleLogout}
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
      {isModalOpen && (
        <Modal caption="Connect" close={closeModal}>
          {accounts ? (
            <Accounts accounts={accounts} closeModal={closeModal} />
          ) : (
            <NoExtension />
          )}
        </Modal>
      )}
    </>
  );
};

export { Wallet };
