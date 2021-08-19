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

  const toggleModal = (e) => {
    setIsOpen(!isOpen);
    e.stopPropagation();
  };

  const chooseAccount = (event, index) => {
    console.log(accounts)
    event.currentTarget.className += " active";
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
      console.log(allAccounts.map(acc => acc.isActive = "false"))
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
        <h1>My cool dApp</h1>
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
