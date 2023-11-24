import React, { createContext, useState, useContext, ReactNode } from "react";

interface UserEditContextProps {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  number: string;
  setNumber: React.Dispatch<React.SetStateAction<string>>;
  id: string;
  setId: React.Dispatch<React.SetStateAction<string>>;
  isShowModal: boolean;
  setIsShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserEditContext = createContext<UserEditContextProps | undefined>(
  undefined
);

export const useCustomContext = () => {
  const context = useContext(UserEditContext);
  if (!context) {
    throw new Error(
      "useCustomContext must be used within a UserEditContextProvider"
    );
  }
  return context;
};

interface ContextProps {
  children: ReactNode;
}

export const Context = ({ children }: ContextProps) => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [id, setId] = useState<string>("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const contextValue: UserEditContextProps = {
    name,
    setName,
    number,
    setNumber,
    id,
    setId,
    isShowModal,
    setIsShowModal,
  };

  return (
    <UserEditContext.Provider value={contextValue}>
      {children}
    </UserEditContext.Provider>
  );
};
