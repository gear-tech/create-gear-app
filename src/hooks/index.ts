import { useContext } from 'react';
import { ApiContext } from 'context/api';
import { AccountContext } from 'context/account';

const useApi = () => useContext(ApiContext);
const useAccount = () => useContext(AccountContext);

export { useApi, useAccount };
