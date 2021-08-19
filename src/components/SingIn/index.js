import { React } from "react";
import Identicon from '@polkadot/react-identicon';

const SingIn = ({ toggleModal, currentAccount }) => {

  let singIn;

  if (currentAccount !== null) {
    singIn = currentAccount.meta.name;
  } else {
    singIn = "Sing In";
  }

  return (
    <div className="singin-box">
      <div className="singin" onClick={toggleModal}>
        {currentAccount && (
          <Identicon value={currentAccount.address} size={28} theme={"polkadot"}/>
        )}
        <span className="singin-name">{singIn}</span>
      </div>
    </div>
  );
};

export default SingIn;
