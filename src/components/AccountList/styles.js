import styled from "styled-components";

const AccountList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1em;
`;

const AccountItem = styled.div`
  margin: 0.5em;
  height: 3.5em;
  line-height: 3.5em;
  font-size: 1em;
  border-radius: 1em;
  border: 0.15em solid #e6007a;
  cursor: pointer;

  &.active {
    background: #e6007a;
  }
  &:hover {
    background: #e6007a;

    .account-address {
      color: #ffffff;
    }
  }
`;

export { AccountList, AccountItem };
