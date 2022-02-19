import React, { useState } from 'react';
import Identicon from '@polkadot/react-identicon';
import { ReactComponent as Logout } from '../../images/logout.svg';
import { useUser } from '../../context/UserContext';
import { Modal } from '../Modal/Modal';
import { AccountList } from '../AccountList/AccountList';
import './Wallet.scss';

export const Wallet = () => {
  const {
    currentAccount,
    setCurrentAccount,
    accountBalance,
    selectAccount,
    injectedAccounts,
  } = useUser();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    setCurrentAccount(null);
    localStorage.removeItem('savedAccount');
  };

  return (
    <>
      <div className="user-wallet__wrapper">
        {(currentAccount && (
          <>
            <div className="user-wallet__balance">{accountBalance}</div>
            <button
              type="button"
              className="user-wallet__user-info"
              onClick={openModal}
            >
              <Identicon
                value={currentAccount.address}
                size={25}
                theme="polkadot"
              />
              <span className="user-wallet__name">
                {currentAccount.meta.name}
              </span>
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
        )) || (
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
          {injectedAccounts ? (
            <AccountList
              list={injectedAccounts}
              toggleAccount={selectAccount}
              handleClose={closeModal}
            />
          ) : (
            <div className="user-wallet__msg">
              Polkadot extension was not found or disabled. Please{' '}
              <a
                className="user-wallet__msg-link"
                href="https://polkadot.js.org/extension/"
                target="_blank"
                rel="noreferrer"
              >
                install it
              </a>
            </div>
          )}
        </Modal>
      )}
    </>
  );
};
