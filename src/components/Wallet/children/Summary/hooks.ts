import { useEffect, useState } from 'react';
import { Balance } from '@polkadot/types/interfaces';
import { useApi, useAccount } from 'hooks';

export const useBalance = () => {
  const { api } = useApi();
  const { account } = useAccount();
  const [balance, setBalance] = useState<Balance>();

  useEffect(() => {
    if (account) {
      const { address } = account;

      api.balance.findOut(address).then(setBalance);
      api.gearEvents.subscribeToBalanceChange(address, setBalance);
    }
  }, [api, account]);

  return balance?.toHuman();
};
