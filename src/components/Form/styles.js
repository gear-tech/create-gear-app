import styled from 'styled-components';

const Highlight = styled.div`
  border-radius: 5px;
  border-color: #aaaaaa;
  border: 0.15em solid #aaa;
  padding: 0.5em 1em;
  align-items: center;
  display: flex;
  margin-bottom: 1em;
`;

const Label = styled.label`
  color: #888888;
  margin-right: 1em;
`;

const Input = styled.input`
  background: transparent;
  color: inherit;
  cursor: pointer;
  font: inherit;
  outline: none;
  border: none;
  flex: 1;
`;

const InputNumber = styled(Input).attrs({ type: 'number' })`
  
  border-bottom: 0.1em solid #aaaaaa;
  text-align: center;
  max-width: 5em;

  ::-webkit-inner-spin-button,
  ::-webkit-outer-spin-button {
    opacity: 1;
  }
`;

const Button = styled.button`
  border: 0.1em solid #aaaaaa;
  font-size: 1.5em;
  padding: 0.2em 1em;
  background: transparent;
  color: inherit;
  cursor: pointer;
  &:hover {
    border: 0.1em solid #e6007a;
  }
`;

export {
  Highlight, Label, Input, InputNumber, Button,
};
