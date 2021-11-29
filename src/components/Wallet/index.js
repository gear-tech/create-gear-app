import { React, useEffect, useState } from 'react';
import { useUser } from '../../context/UserContext';
import SignIn from '../SignIn';
import Modal from '../Modal';
import AccountsList from '../AccountList';

const Wallet = () => {
  const { selectAccount, allAccounts } = useUser();
  const [isOpen, setIsOpen] = useState(false);

  // Toggle modal window
  const toggleModal = (event) => {
    event.stopPropagation();
    setIsOpen(!isOpen);
  };

  
  return (
    <>
      <SignIn toggleModal={toggleModal} />
      {isOpen && (
        <Modal
          title="Sign In"
          content={
            allAccounts ? <AccountsList list={allAccounts} toggleAccount={selectAccount} /> : "Couldn't find the accounts"
          }
          handleClose={toggleModal}
        />
      )}
    </>
  );
};

export default Wallet;
