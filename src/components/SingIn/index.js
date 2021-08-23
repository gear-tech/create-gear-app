import { React } from "react";
import Identicon from "@polkadot/react-identicon";
import { BalanceInfo } from "./styles";

const SingIn = ({ toggleModal, currentAccount, balance }) => {
  let singIn;

  if (currentAccount !== null) {
    singIn = currentAccount.meta.name;
  } else {
    singIn = "Sing In";
  }

  return (
    <div className="singin-box">
      {balance && (
        <BalanceInfo>{balance}</BalanceInfo>
      )}
      <div className="singin" onClick={toggleModal}>
        {currentAccount && (
          <Identicon
            value={currentAccount.address}
            size={28}
            theme={"polkadot"}
          />
        )}
        <span className="singin-name">{singIn}</span>
      </div>
    </div>
  );
};

export default SingIn;
