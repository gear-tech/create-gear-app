import "./App.css";
import { React, useState, useEffect } from "react";
import { web3Accounts, web3Enable } from "@polkadot/extension-dapp";
import SingIn from "./components/SingIn";
import Modal from "./components/Modal";
import AccountsList from "./components/AccountList";

function App({ api }) {
  const [isOpen, setIsOpen] = useState(false);
  const [accounts, setAccouts] = useState(null);
  const [account, setAccout] = useState(null);

  const toggleModal = (event) => {
    event.stopPropagation();
    setIsOpen(!isOpen);
  };

  const chooseAccount = (event, index) => {
    event.stopPropagation();
    accounts.map((acc, i) => {
      acc.isActive = false;
      if (i === index) {
        acc.isActive = true;
        localStorage.setItem('savedAccount', acc.address)
      }
    });
    setAccout(accounts[index]);
  };

  useEffect(() => {
    console.log(account);
  }, [account]);

  useEffect(() => {
    const getAllAccounts = async () => {
      const extensions = await web3Enable("my gear dapp");

      if (extensions.length === 0) {
        return;
      }

      const allAccounts = await web3Accounts();

      allAccounts.forEach(acc => {
        if(acc.address === localStorage.getItem('savedAccount')){
          acc.isActive = true;
          setAccout(acc)
        }
      })
      setAccouts(allAccounts);
    };
    getAllAccounts();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <SingIn toggleModal={toggleModal} currentAccount={account} />
      </header>
      <main>
        <h1>Cubic Game</h1>
      </main>
      {isOpen && (
        <Modal
          title="Sing In"
          content={
            <AccountsList list={accounts} toggleAccount={chooseAccount} />
          }
          handleClose={toggleModal}
        />
      )}
    </div>
  );
}

export default App;
