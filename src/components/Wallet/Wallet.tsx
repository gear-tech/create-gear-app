import { useEffect, useState } from 'react';
import { useAccount } from 'hooks';
import { useAccounts } from './hooks';
import { isLoggedIn } from './utils';
import { Account, AccountsModal } from './children';

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
      <Account openModal={openModal} closeModal={closeModal} />
      {isModalOpen && (
        <AccountsModal accounts={accounts} closeModal={closeModal} />
      )}
    </>
  );
};

export { Wallet };
