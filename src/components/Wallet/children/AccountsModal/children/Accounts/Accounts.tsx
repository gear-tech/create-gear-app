import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';
import { Account, Empty } from './children';
import './Accounts.scss';

type Props = {
  accounts: InjectedAccountWithMeta[];
  closeModal: () => void;
};

const Accounts = ({ accounts, closeModal }: Props) => {
  const isAnyAccount = accounts.length > 0;

  const getAccounts = () =>
    accounts.map((account, index) => (
      <Account key={index} account={account} closeModal={closeModal} />
    ));

  return (
    <div className="account-list__wrapper">
      {isAnyAccount ? getAccounts() : <Empty />}
    </div>
  );
};

export { Accounts };
