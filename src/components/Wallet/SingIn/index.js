import { React } from "react";
import Identicon from "@polkadot/react-identicon";
import { WalletWrapper, Wallet, AccountName, BalanceInfo } from "./styles";

const SingIn = ({ toggleModal, currentAccount, balance }) => {
  let singIn;

  if (currentAccount !== null) {
    singIn = currentAccount.meta.name;
  } else {
    singIn = "Sing In";
  }

  return (
    <WalletWrapper>
      {balance && <BalanceInfo>{balance}</BalanceInfo>}
      <Wallet onClick={toggleModal}>
        {currentAccount && (
          <Identicon
            value={currentAccount.address}
            size={28}
            theme="polkadot"
          />
        )}
        <AccountName>{singIn}</AccountName>
      </Wallet>
    </WalletWrapper>
  );
};

export default SingIn;
