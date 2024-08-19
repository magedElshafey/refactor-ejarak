import React, { createContext, useContext } from "react";
import { useQuery } from "react-query";
import Spinner from "../components/common/Spinner";
import { getFeatuers } from "../services/get/getFeatuers";
import ErrorHandling from "../components/common/ErrorHandling";
const GlobalProvider = createContext();
export const useGlobalContext = () => {
  return useContext(GlobalProvider);
};

const GlobalContext = ({ children }) => {
  const { isLoading, data, isError } = useQuery("featuers", getFeatuers, {
    onSuccess: (data) => {
      if (!data) {
        <ErrorHandling />;
        return {};
      }
    },
    onError: () => {
      <ErrorHandling />;
      return {};
    },
  });

  const value = {
    data: data?.data?.data || {},
  };
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : isError ? (
        <ErrorHandling />
      ) : (
        <GlobalProvider.Provider value={value}>
          {children}
        </GlobalProvider.Provider>
      )}
    </>
  );
};

export default GlobalContext;
