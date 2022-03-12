import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';
import { Modal } from 'components/Modal/Modal';
import { Accounts, NoExtension } from './children';

type Props = {
  accounts: InjectedAccountWithMeta[] | undefined;
  closeModal: () => void;
};

const AccountsModal = ({ accounts, closeModal }: Props) => (
  <Modal caption="Connect" close={closeModal}>
    {accounts ? (
      <Accounts accounts={accounts} closeModal={closeModal} />
    ) : (
      <NoExtension />
    )}
  </Modal>
);

export { AccountsModal };
