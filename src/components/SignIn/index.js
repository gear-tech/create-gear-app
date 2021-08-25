import { React } from 'react';
import Identicon from '@polkadot/react-identicon';
import {
  WalletWrapper, Wallet, AccountName, BalanceInfo,
} from './styles';

const SignIn = ({ toggleModal, currentAccount, balance }) => {
  let signIn;

  if (currentAccount !== null) {
    signIn = currentAccount.meta.name;
  } else {
    signIn = 'Sign In';
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
        <AccountName>{signIn}</AccountName>
      </Wallet>
    </WalletWrapper>
  );
};

export default SignIn;
