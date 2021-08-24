import React from "react";
import { ModalWarapper, ModalBox, ModalCloseX, ModalClose, Title } from "./styles";
import { ReactComponent as CloseSVG } from "../../../close.svg";

const Modal = ({ content, title, handleClose }) => {
  return (
    <ModalWarapper>
      <ModalBox>
        <ModalClose onClick={handleClose}>
          <ModalCloseX>
            <CloseSVG />
          </ModalCloseX>
        </ModalClose>
        <Title>{title}</Title>
        {content}
      </ModalBox>
    </ModalWarapper>
  );
};

export default Modal;
