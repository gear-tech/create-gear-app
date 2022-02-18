// Copyright 2021-2022 @gear-tech/create-gear-app authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import React, { useContext, useEffect, useState } from 'react';
import { GearApi } from '@gear-js/api';
import { nodeApi } from '../api/initApi';

export interface ApiPromiseContext {
  api: GearApi;
  isApiReady: boolean;
}

export const ApiPromiseContext: React.Context<ApiPromiseContext> =
  React.createContext({} as ApiPromiseContext);

export const useApi = () => {
  return useContext(ApiPromiseContext);
};

export const ApiPromiseProvider: React.FC = ({ children }) => {
  const [api, setApi] = useState<any | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    nodeApi.init().then(() => {
      setApi(nodeApi.api);
      setIsReady(true);
    });
  }, []);

  return (
    <ApiPromiseContext.Provider value={{ api, isApiReady: isReady }}>
      {children}
    </ApiPromiseContext.Provider>
  );
};
