import React, { useContext, useEffect, useState } from 'react';
import initApi from '../api/initApi';

type IContextProps = {
    api: any | null;
    loading: boolean;
};

export const ApiContext = React.createContext({} as IContextProps);

export const useApi = () => {
  return useContext(ApiContext);
};

export const ApiProvider = ({ children } : any ) => {
  const [api, setApi] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initApi().then((result) => {
      setApi(result);
      setLoading(false);
    });
  }, []);

  return <ApiContext.Provider value={{ api, loading }}>{children}</ApiContext.Provider>;
};
