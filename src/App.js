import "./App.css";
import { React, useState, useEffect } from "react";
import { web3Accounts, web3Enable, web3FromSource } from "@polkadot/extension-dapp";
import SingIn from "./components/SingIn";
import Modal from "./components/Modal";
import AccountsList from "./components/AccountList";

function App({ api }) {
  const [isOpen, setIsOpen] = useState(false);
  const [accounts, setAccouts] = useState(null);
  const [account, setAccout] = useState(null);
  const [balance, setBalance] = useState(null)

  const [destination, setDestination] = useState('');
  const [amount, setAmount] = useState(10);

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
        getBalance(acc.address);
      }
    });
    setAccout(accounts[index]);

  };

  useEffect(() => {
    console.log(account);
  }, [account]);

  const getBalance = async (ADDR) => {
    const { data: balance } = await api.query.system.account(ADDR);
    setBalance(balance.free.toHuman());
  }

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
          setAccout(acc);
          getBalance(acc.address)
        }
      })
      setAccouts(allAccounts);
    };
    getAllAccounts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const FROM_MILI = 1000000000000;

    const transferExtrinsic = api.tx.balances.transfer(destination, amount * FROM_MILI)
    
    const injector = await web3FromSource(account.meta.source);

    transferExtrinsic.signAndSend(account.address, { signer: injector.signer }, ({ status }) => {
        if (status.isInBlock) {
            console.log(`Completed at block hash #${status.asInBlock.toString()}`);
        } else {
            console.log(`Current status: ${status.type}`);
        }
    }).catch((error) => {
        console.log(':( transaction failed', error);
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <SingIn toggleModal={toggleModal} currentAccount={account} balance={balance} />
      </header>
      <main>
        <h1>Cubic Game</h1>
        <form>
          <div className="highlight">
            <label htmlFor='destination'>Destination: </label>
            <input type='text' id='destination' value={destination} onChange={(e) => setDestination(e.target.value)} autoComplete="off" required/>
          </div>
          <div className="highlight">
            <label htmlFor='amount'>Amount</label>
            <input type='number' id='amount' value={amount} onChange={(e) => setAmount(e.target.value)} autoComplete="off" required/>
          </div>
          <button type="button" onClick={handleSubmit}>Send</button>
        </form>
        
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
