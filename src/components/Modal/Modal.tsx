import React, { ReactNode, useRef, MouseEvent } from 'react';
import { createPortal } from 'react-dom';
import { ReactComponent as X } from '../../images/close.svg';
import './Modal.scss';

type Props = {
  children: ReactNode;
  caption?: string;
  close: () => void;
};

const Modal = ({ children, caption, close }: Props) => {
  const root = useRef<HTMLElement>(document.getElementById('modal-root')!);

  const handlOverlayClick = ({ target, currentTarget }: MouseEvent) => {
    if (target === currentTarget) close();
  };

  const component = (
    <div className="modal-overlay" onClick={handlOverlayClick}>
      <div className="modal">
        {caption && <h2 className="modal__caption">{caption}</h2>}
        <button className="modal__close-button" onClick={close}>
          <X />
        </button>
        <div className="modal__body">{children}</div>
      </div>
    </div>
  );

  return createPortal(component, root.current);
};

export { Modal };
