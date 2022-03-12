import { useEffect, useState } from 'react';
import { Modal } from 'components/Modal/Modal';
import { useAccount } from 'hooks';
import { useAccounts } from './hooks';
import { isLoggedIn } from './utils';
import { Accounts, NoExtension, Summary } from './children';

const Wallet = () => {
  const { setAccount } = useAccount();
  const accounts = useAccounts();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (accounts) setAccount(accounts.find(isLoggedIn));
  }, [accounts, setAccount]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Summary openModal={openModal} closeModal={closeModal} />
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
