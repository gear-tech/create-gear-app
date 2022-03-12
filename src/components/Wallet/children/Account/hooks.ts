import { useEffect, useState } from 'react';
import { Balance } from '@polkadot/types/interfaces';
import { useApi, useAccount } from 'hooks';

type Unsub = () => void;

export const useBalance = () => {
  const { api } = useApi();
  const { account } = useAccount();
  const [balance, setBalance] = useState<Balance>();

  useEffect(() => {
    let unsub: Unsub | undefined;

    if (account) {
      const { address } = account;

      api.balance.findOut(address).then(setBalance);
      api.gearEvents
        .subscribeToBalanceChange(address, setBalance)
        .then((unsubFunction) => (unsub = unsubFunction));
    }

    return () => unsub && unsub();
  }, [api, account]);

  return balance?.toHuman();
};
