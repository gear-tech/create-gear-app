import React from 'react';
import Identicon from '@polkadot/react-identicon';
import { useUser } from '../../context/UserContext';
import { useModal } from '../../context/ModalContext';

import { ReactComponent as LogoutIcon } from '../../images/logout.svg';

import './Wallet.scss';

export const Wallet = () => {

  const { currentAccount, setCurrentAccount, accountBalance } = useUser();
  const { toggleModal } = useModal();

  const handleLogout = () => {
    setCurrentAccount(null)
    localStorage.removeItem('savedAccount');
  };

  return (
    <>
      <div className="user-wallet__wrapper">
        {(currentAccount && (
          <>
            <div className="user-wallet__balance">{accountBalance}</div>
            <button type="button" className="user-wallet__user-info" onClick={toggleModal}>
              <Identicon value={currentAccount.address} size={25} theme="polkadot" />
              <span className="user-wallet__name">{currentAccount.meta.name}</span>
            </button>
            <button type="button" className="user-wallet__logout" aria-label="menuLink" onClick={handleLogout}>
              <LogoutIcon />
            </button>
          </>
        )) || (
          <button className="user-wallet__connect-button" type="button" onClick={toggleModal}>
            Connect
          </button>
        )}
      </div>
    </>
  );
};
