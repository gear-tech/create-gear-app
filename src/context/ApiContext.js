import React, { useContext, useEffect, useState } from 'react';
import initApi from '../api/api';

export const ApiContext = React.createContext();

export const useApi = () => {
  return useContext(ApiContext);
};

export const ApiProvider = ({ children }) => {
  const [gear, setGear] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initApi().then((result) => {
      setGear(result);
      setLoading(false);
    });
  }, []);

  return <ApiContext.Provider value={{ gear, loading }}>{children}</ApiContext.Provider>;
};
