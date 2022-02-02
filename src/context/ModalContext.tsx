import React, { useState, useEffect, useContext } from 'react';
import { Modal } from '../components/Modal/Modal';
import { AccountList } from '../components/AccountList/AccountList';
import { useUser } from '../context/UserContext';

type InitContextProps = {
  toggleModal: () => void;
};

export const ModalContext = React.createContext({} as InitContextProps);

export const useModal = () => {
  return useContext(ModalContext);
};

export const ModalProvider = ({ children }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const { selectAccount, injectedAccounts } = useUser();

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <ModalContext.Provider value={{ toggleModal }}>
      {isOpen && (
        <Modal
          title="Connect"
          content={
            injectedAccounts ? (
              <AccountList
                list={injectedAccounts}
                toggleAccount={selectAccount}
                handleClose={toggleModal}
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
            )
          }
          handleClose={toggleModal}
        />
      )}
      {children}
    </ModalContext.Provider>
  );
};
