import {React} from "react";
import toShortAddress from "../../utils"
import { AccountList, AccountItem  } from "./styles";

const AccountsList = ({ list, toggleAccount }) => {

  const account = list.map((account, index) => {
    return (
      <AccountItem key={index} onClick={(e) => {toggleAccount(e, index)}}>
        {account.meta.name}
        {toShortAddress(account.address)}
      </AccountItem>
    );
  });

  return <AccountList>{account}</AccountList>;
};

export default AccountsList;
