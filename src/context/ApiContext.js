import React, { useContext, useEffect, useState } from 'react';
import initApi from '../api/api';

export const ApiContext = React.createContext();

export const useApi = () => {
  return useContext(ApiContext);
};

export const ApiProvider = ({ children }) => {
  const [api, setApi] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initApi().then((result) => {
      setApi(result);
      setLoading(false);
    });
  }, []);

  return <ApiContext.Provider value={{ api, loading }}>{children}</ApiContext.Provider>;
};
