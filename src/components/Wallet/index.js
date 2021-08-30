import { React, useEffect, useState } from 'react';
import { web3Accounts, web3Enable } from '@polkadot/extension-dapp';
import { useApi } from '../../api/apiContext';
import SignIn from '../SignIn';
import Modal from '../Modal';
import AccountsList from '../AccountList';

const Wallet = ({ handleAccount }) => {

  const { api } = useApi();
  console.log(api)

  const [isOpen, setIsOpen] = useState(false);
  const [accounts, setAccouts] = useState(null);
  const [account, setAccout] = useState(null);
  const [freeBalance, setFreeBalance] = useState(null);

  // Toggle modal window
  const toggleModal = (event) => {
    event.stopPropagation();
    setIsOpen(!isOpen);
  };

  // Get balance for current account
  const getBalance = async (ADDR) => {
    const { data: balance } = await api.query.system.account(ADDR);
    setFreeBalance(balance.free.toHuman());
  };

  // Setting current account and save it into the LocalStage
  const chooseAccount = (event, index) => {
    event.stopPropagation();
    accounts.forEach((acc, i) => {
      acc.isActive = false;
      if (i === index) {
        acc.isActive = true;
        localStorage.setItem('savedAccount', acc.address);
        getBalance(acc.address);
      }
    });
    setAccout(accounts[index]);
    handleAccount(accounts[index]);
  };

  // Getting all existing accounts from Polkadot extension
  // If LocalStorage already contains the last chosen account then set it into the State
  useEffect(() => {
    const getAllAccounts = async () => {
      const extensions = await web3Enable('my gear dapp');

      if (extensions.length === 0) {
        return;
      }

      const allAccounts = await web3Accounts();

      allAccounts.forEach((acc) => {
        if (acc.address === localStorage.getItem('savedAccount')) {
          acc.isActive = true;
          setAccout(acc);
          getBalance(acc.address);
          handleAccount(acc);
        }
      });
      setAccouts(allAccounts);
    };
    getAllAccounts();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <SignIn
        toggleModal={toggleModal}
        currentAccount={account}
        balance={freeBalance}
      />
      {isOpen && (
        <Modal
          title="Sign In"
          content={
            accounts ? (
              <AccountsList list={accounts} toggleAccount={chooseAccount} />
            ) : (
              "Couldn't find the accounts"
            )
          }
          handleClose={toggleModal}
        />
      )}
    </>
  );
};

export default Wallet;
