import React from 'react';

import { useModal } from '../../context/ModalContext';

import './Modal.scss';
import { ReactComponent as CloseSVG } from '../../images/close.svg';

type ModalConfig = {
  title?: string;
  content: any;
};

export const Modal = ({ content, title }: ModalConfig) => {
  const { closeModal } = useModal();

  return (
    <div className="modal__wrapper">
      <div className="modal__box">
        <button className="modal__close" type="button" onClick={closeModal}>
          <span className="modal__close-x">
            <CloseSVG />
          </span>
        </button>
        {title && <h2 className="modal__title">{title}</h2>}
        <div className="modal__content">{content}</div>
      </div>
    </div>
  );
};
