import { UserAccount } from 'types/user';
import { Account, Empty } from './children';
import './Accounts.scss';

type Props = {
  list: UserAccount[];
  closeModal: () => void;
};

const Accounts = ({ list, closeModal }: Props) => {
  const isAnyAccount = list.length > 0;

  const getAccounts = () =>
    list.map((account) => (
      <Account account={account} closeModal={closeModal} />
    ));

  return (
    <div className="account-list__wrapper">
      {isAnyAccount ? getAccounts() : <Empty />}
    </div>
  );
};

export { Accounts };
