"use client"
import React, { createContext, useContext, useState } from 'react'


const AppContext = createContext();

function AppProvider({ children }) {
  const [wallet, setWallet] = useState({})
  const [provider, setProvider] = useState({})
  const [errMessage, setErrMessage] = useState('')
  const [address, setAddress] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isConnected, setIsConnected] = useState(false)

  return (
    <AppContext.Provider value={{ wallet, setWallet, setProvider, provider, errMessage, setErrMessage, address, setAddress, isLoading, setIsLoading, isConnected, setIsConnected }}>{children}</AppContext.Provider>
  )
}

export const useAppContext = () => useContext(AppContext);

export default AppProvider;
