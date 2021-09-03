import { React } from 'react';
import Identicon from '@polkadot/react-identicon';
import {
  WalletWrapper, Wallet, AccountName, BalanceInfo,
} from './styles';
import { useUser } from '../../context/UserContext';

const SignIn = ({ toggleModal }) => {

  const { account, freeBalance } = useUser();

  let signIn;

  if (account !== null) {
    signIn = account.meta.name;
  } else {
    signIn = 'Sign In';
  }

  return (
    <WalletWrapper>
      <BalanceInfo>{freeBalance}</BalanceInfo>
      <Wallet onClick={toggleModal}>
        {account && (
          <Identicon
            value={account.address}
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
