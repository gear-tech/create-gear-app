import styled from "styled-components";

const WalletWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Wallet = styled.div`
  display: inline-flex;
  padding: 5px 10px;
  border: 0.1em solid #aaa;
  border-radius: 10px;
  font-size: 1.5em;
  margin-right: 0;
  cursor: pointer;
  &:hover {
    border: 0.1em solid #2e9ddd;
  }
`;

const AccountName = styled.span`
  padding: 0 5px;
`;

const BalanceInfo = styled.div`
  padding: 0.7em 0.5em;
`;

export { WalletWrapper, Wallet, AccountName, BalanceInfo };
