import React, { useState, useContext } from "react";

interface UserContextType {
  id: string | null;
  name: string;
  number: string;
  setId: React.Dispatch<React.SetStateAction<string>>;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setNumber: React.Dispatch<React.SetStateAction<string>>;
  isShowModal: boolean;
}

const UserEditContext = React.createContext<UserContextType | undefined>(
  undefined
);

type Props = {
  children: React.ReactNode;
};

export const useCustomContext = () => {
  return useContext(UserEditContext);
};

export const Context = ({ children }: Props) => {
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
