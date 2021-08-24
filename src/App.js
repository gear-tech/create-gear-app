import "./App.css";
import { React, useState, useCallback } from "react";
import { web3FromSource } from "@polkadot/extension-dapp";
import Wallet from "./components/Wallet";

function App({ api }) {
  const [account, setAccout] = useState(null);
  const [destination, setDestination] = useState("");
  const [amount, setAmount] = useState(0);

  // Setting account state
  const handleAccount = useCallback((acc) => {
    setAccout(acc);
  }, []);

  // Form submit example
  const handleSubmit = async (e) => {
    e.preventDefault();

    const FROM_MILI = 1000000000000;

    const transferExtrinsic = api.tx.balances.transfer(
      destination,
      amount * FROM_MILI
    );

    const injector = await web3FromSource(account.meta.source);

    transferExtrinsic
      .signAndSend(account.address,{ signer: injector.signer },({ status }) => {
          if (status.isInBlock) {
            console.log(`Completed at block hash #${status.asInBlock.toString()}`);
          } else {
            console.log(`Current status: ${status.type}`);
          }
        }
      )
      .catch((error) => {
        console.log(":( transaction failed", error);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <Wallet handleAccount={handleAccount} api={api} />
      </header>
      <main>
        <h1>Say Hi dApp</h1>
        <p>This is a simple demo dApp for getting started quickly. Happy hack!</p>
        <form>
          <div className="highlight">
            <label htmlFor="destination">Massage: </label>
            <input
              type="text"
              id="destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              autoComplete="off"
              required
            />
          </div>
          <p>
            <label htmlFor="amount">Amount:</label>
            <input
              type="number"
              id="amount"
              step="0.01" 
              min="0" 
              max="100"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              autoComplete="off"
            />
          </p>
          <button type="button" className="sendButton" onClick={handleSubmit}>
            Send
          </button>
        </form>
      </main>
    </div>
  );
}

export default App;
