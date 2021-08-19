import styled from "styled-components";

const ModalWarapper = styled.div`
  position: fixed;
  background: #00000050;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
`;

const ModalBox = styled.div`
  position: relative;
  width: 30em;
  @media (max-width: 768px) {
    width: 20em;
  }
  margin: 0 auto;
  height: auto;
  max-height: 70vh;
  margin-top: calc(100vh - 85vh - 20px);
  background: #fff;
  padding: 20px;
  border: 1px solid rgb(51, 51, 51);
  border-radius: 24px;
  background: #222222;
  color: rgb(255, 255, 255);
  overflow: auto;
`;

const ModalClose = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 10;
  padding: 0;
  color: rgba(0, 0, 0, 0.45);
  font-weight: 700;
  line-height: 1;
  text-decoration: none;
  background: transparent;
  border: 0;
  outline: 0;
  cursor: pointer;
  transition: color 0.3s;
`;

const ModalCloseX = styled.span`
  display: block;
  width: 56px;
  height: 56px;
  font-size: 16px;
  font-style: normal;
  line-height: 56px;
  text-align: center;
  text-transform: none;
  text-rendering: auto;
`;

const Title = styled.h2`
    font-size: 1.6em;
    font-weight: 400; 
`;


export { ModalWarapper, ModalBox, ModalCloseX, ModalClose, Title };
