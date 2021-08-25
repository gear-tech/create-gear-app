import styled from "styled-components";

const AccountList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
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

  ${({ active }) =>
    active &&
    `
    background: #e6007a;
  `}

  &:hover {
    background: #e6007a;

    .account-address {
      color: #ffffff;
    }
  }
`;

const AccountAlias = styled.span`
  font-size: 1.5em;
  padding: 0 0.3em;
`;

const AccountIcon = styled.span`
  display: inline-block;
  position: relative;
  top: 6px;
  width: 28px;
  height: 28px;
  @media (max-width: 768px) {
    display: none;
  }
`;

const AccountAddress = styled.span`
  font-size: 0.8em;
  @media (max-width: 768px) {
    display: none;
  }
`;

export { AccountList, AccountItem, AccountAlias, AccountIcon, AccountAddress };
