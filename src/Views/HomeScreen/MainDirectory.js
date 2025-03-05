import React, { createContext, useContext, useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import axiosInstance from "./axiosInstance"; 

const DirectoryContext = createContext();

export function useDirectory() {
  return useContext(DirectoryContext);
}

export function DirectoryProvider({ children }) {
  const params = useParams();
  const location = useLocation();
  
  let directoryCode = params.directoryCode;
  if (!directoryCode) {
    const segments = location.pathname.split("/");
    directoryCode = segments[2] || "ebn";
  }
  directoryCode = directoryCode.toLowerCase();

  const [directoryData, setDirectoryData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categorySearchTerm, setCategorySearchTerm] = useState("");
  const [heroSearchTerm, setHeroSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    const fetchDirectoryData = async () => {
      try {
        
        const response = await axiosInstance.get(`/api/directorydetails/${directoryCode}`);
        setDirectoryData({
          directoryDetails: response.data.companydetails,
          directoryCategories: response.data.directorycategories,
          directoryCompanies: response.data.directorycompanies,
        });
      } catch (error) {
        console.error("Error fetching directory data:", error);
      }
    };
    fetchDirectoryData();
  }, [directoryCode]);

  const value = {
    directoryData,
    searchTerm,
    setSearchTerm,
    categorySearchTerm,
    setCategorySearchTerm,
    heroSearchTerm,
    setHeroSearchTerm,
    selectedCategories,
    setSelectedCategories,
    directoryCode,
  };

  return (
    <DirectoryContext.Provider value={value}>
      {children}
    </DirectoryContext.Provider>
  );
}
