import React, { useState, useContext } from "react";

const UserEditContext = React.createContext();

export const useCustomContext = () => {
  return useContext(UserEditContext);
};

export const Context = ({ children }) => {
  const [isShowModal, setToggleShowModal] = useState(false);
  const [id, setId] = useState(null);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  return (
    <UserEditContext.Provider
      value={{
        name,
        setName,
        number,
        setNumber,
        setId,
        id,
        isShowModal,
        setToggleShowModal,
      }}
    >
      {children}
    </UserEditContext.Provider>
  );
};
