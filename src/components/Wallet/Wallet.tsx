import React from 'react';
import Identicon from '@polkadot/react-identicon';
import { useUser } from '../../context/UserContext';
import { useModal } from '../../context/ModalContext';
import { AccountList } from '../../components/AccountList/AccountList';

import { ReactComponent as LogoutIcon } from '../../images/logout.svg';

import './Wallet.scss';

export const Wallet = () => {
  const { currentAccount, setCurrentAccount, accountBalance } = useUser();
  const { openModal } = useModal();
  const { selectAccount, injectedAccounts } = useUser();

  console.log(injectedAccounts);

  const handleLogout = () => {
    setCurrentAccount(null);
    localStorage.removeItem('savedAccount');
  };

  const handleModal = () => {
    const content = injectedAccounts ? (
      <AccountList list={injectedAccounts} toggleAccount={selectAccount} />
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
    );

    openModal({
      title: 'Connect',
      content
    });
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
              onClick={handleModal}
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
              <LogoutIcon />
            </button>
          </>
        )) || (
          <button
            className="user-wallet__connect-button"
            type="button"
            onClick={handleModal}
          >
            Connect
          </button>
        )}
      </div>
    </>
  );
};
