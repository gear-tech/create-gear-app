import React, { useState, useEffect, useContext } from 'react';
import { Modal } from '../components/Modal/Modal';

type ModalConfig = {
  title?: string;
  content: any;
};

type InitContextProps = {
  openModal: (modalConfig: ModalConfig) => void;
  closeModal: () => void;
};

export const ModalContext = React.createContext({} as InitContextProps);

export const useModal = () => {
  return useContext(ModalContext);
};

export const ModalProvider: React.FC = ({ children }) => {
  const [modalOpened, setModalOpened] = useState(false);
  const [modalContent, setModalContent] = useState<any>(null);

  const openModal = (modalConfig: ModalConfig) => {
    setModalContent(modalConfig);
    setModalOpened(true);
  };

  const closeModal = () => {
    setModalOpened(false);
  };

  useEffect(() => {
    if (modalOpened) document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [modalOpened]);

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {modalOpened && <Modal {...modalContent} />}
      {children}
    </ModalContext.Provider>
  );
};
