import React, { Dispatch, SetStateAction, useContext } from "react";

type GlobalContextType = {
  showConnectAccountModal: boolean;
  setShowConnectAccountModal: Dispatch<SetStateAction<boolean>>;
};

const initialState: GlobalContextType = {
  showConnectAccountModal: false,
  setShowConnectAccountModal: () => null,
};
const GlobalContext = React.createContext<GlobalContextType>(initialState);
export const GlobalContextProvider = GlobalContext.Provider;

export const useGlobalContext = () => useContext(GlobalContext);
