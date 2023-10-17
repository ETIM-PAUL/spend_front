"use client"
import React, { createContext, useContext, useState } from 'react'
import {
  ComethWallet,
  ConnectAdaptor,
  SupportedNetworks,
  ComethProvider,
} from "@cometh/connect-sdk";

const AppContext = createContext();

function AppProvider({ children }) {
  const [wallet, setWallet] = useState({})
  const [provider, setProvider] = useState({})
  const [errMessage, setErrMessage] = useState('')
  const [address, setAddress] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isConnected, setIsConnected] = useState(false)

  const apiKey = "15511501-2129-4f96-857a-762009df1f07";
  const walletAdaptor = new ConnectAdaptor({
    chainId: SupportedNetworks.MUMBAI,
    apiKey,
  });
  const instance = new ComethWallet({
    authAdapter: walletAdaptor,
    apiKey,
  });

  const createWallet = async () => {
    try {
      const localStorageAddress = window.localStorage.getItem("walletAddress");

      if (localStorageAddress) {
        setIsLoading(true);
        await instance.connect(localStorageAddress);
        setAddress(instance.getAddress());
      } else {
        setIsLoading(true);
        await instance.connect();
        const walletAddress = instance.getAddress();
        window.localStorage.setItem("walletAddress", walletAddress);
        setAddress(instance.getAddress());
      }

      console.log("ins", instance);
      setWallet(instance);
      const instanceProvider = new ComethProvider(instance);
      setProvider(instanceProvider);

      console.log("instance", instanceProvider);
      setIsConnected(true)
      setIsLoading(false);
    } catch (error) {
      setErrMessage(error.message);
      console.log("error", error.message);
    }
  };

  const disconnect = async () => {
    if (wallet) {
      try {
        await wallet.logout();
        setIsConnected(false);
        setWallet(null);
        setProvider(null);
        setAddress("");

      } catch (e) {
        console.log(e.message);
        // displayError((e ).message);
      }
    }
  };

  return (
    <AppContext.Provider
      value={{
        createWallet,
        disconnect,
        wallet,
        setWallet,
        setProvider,
        provider,
        errMessage,
        setErrMessage,
        address,
        setAddress,
        isLoading,
        setIsLoading,
        isConnected,
        setIsConnected
      }}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => useContext(AppContext);

export default AppProvider;
