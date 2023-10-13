/** @format */
"use client";
import React, { useContext } from "react";
import {
  ComethWallet,
  ConnectAdaptor,
  SupportedNetworks,
  ComethProvider,
} from "@cometh/connect-sdk";
import { useAppContext } from "./Context";

export default function Auth() {
  const {
    setProvider,
    setErrMessage,
    wallet,
    setWallet,
    address,
    setAddress,
    isLoading,
    setIsLoading,
    isConnected,
    setIsConnected,
  } = useAppContext();
  console.log(wallet)

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
      console.log("api", apiKey);
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

  return {
    createWallet,
    disconnect,
    setProvider,
    setErrMessage,
    wallet,
    setWallet,
    address,
    setAddress,
    isLoading,
    setIsLoading,
    isConnected,
    setIsConnected,
  };
}
