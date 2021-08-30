import styled from 'styled-components';

const LoaderWrapper = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-content: space-between;
  align-items: center;
  flex-direction: column;
`;

const LoaderMessage = styled.div`
  color: #fefefe;
  font-size: 1.5em;
`;



export { LoaderWrapper, LoaderMessage };
