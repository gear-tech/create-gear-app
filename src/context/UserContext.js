import React, { useContext, useState } from 'react';

export const UserContext = React.createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [account, setAccount] = useState(null);

  return <UserContext.Provider value={[account, setAccount]}>{children}</UserContext.Provider>;
};
