// src/Context/LoadingContext.js
import React, { createContext, useState, useContext, useEffect, useRef } from "react";

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  // Start with loading false to prevent unwanted initial loader
  const [isLoading, setIsLoading] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);
  const initialLoadComplete = useRef(false);
  
  // Handle only the initial page load
  useEffect(() => {
    if (initialLoadComplete.current) return;
    
    // Set loading to true only for the initial page load
    setIsLoading(true);
    
    const handleInitialLoad = () => {
      setIsLoading(false);
      setTimeout(() => {
        setContentVisible(true);
      }, 100);
      initialLoadComplete.current = true;
    };
    
    if (document.readyState === 'complete') {
      handleInitialLoad();
    } else {
      window.addEventListener('load', handleInitialLoad);
      
      const timer = setTimeout(() => {
        handleInitialLoad();
      }, 2000);
      
      return () => {
        window.removeEventListener('load', handleInitialLoad);
        clearTimeout(timer);
      };
    }
  }, []);

  const showLoader = () => {
    setContentVisible(false);
    setIsLoading(true);
  };
  
  const hideLoader = () => {
    setIsLoading(false);
    setTimeout(() => {
      setContentVisible(true);
    }, 100);
  };

  return (
    <LoadingContext.Provider value={{ isLoading, contentVisible, showLoader, hideLoader }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);
