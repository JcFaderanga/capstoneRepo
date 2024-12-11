import React, { createContext, useContext, useState } from "react";

const RegistrationContext = createContext();

export const RegistrationProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const addDetails = (newProperty) => {
    setData((prevData) => ({
      ...prevData,
      ...newProperty,
    }));
  };

  return (
    <RegistrationContext.Provider value={{ data, addDetails }}>
      {children}
    </RegistrationContext.Provider>
  );
};
export const useRegistrationStorage = () =>  useContext(RegistrationContext);

