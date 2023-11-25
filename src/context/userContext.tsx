import { Contact } from "types";
import { createContext, useReducer, useContext } from "react";

type UserContext = {
  user: Contact | null;
  isShowModal: boolean;
};

type Dispatch = (action: any) => void;

interface ContextProps {
  children: React.ReactNode;
}

const initialState: UserContext = {
  user: null,
  isShowModal: false,
};

type ToggleModalType = {
  type: "TOGGLE_MODAL";
  payload: boolean;
};

type SetUserType = {
  type: "SET_USER";
  payload: Contact;
};


type Action = ToggleModalType | SetUserType;

const UserContextState = createContext<{ state: UserContext } | null>(null);
const UserContextDispatch = createContext<{ dispatch: Dispatch } | null>(null);

export const updateUser = (user: Contact): SetUserType => {
  return { type: "SET_USER", payload: user };
};

export const toggleModal = (isShow: boolean): ToggleModalType => {
  return { type: "TOGGLE_MODAL", payload: isShow };
};

const contextReducer = (state: UserContext, action: Action) => {
  switch (action.type) {
    case "TOGGLE_MODAL":
      return { ...state, isShowModal: action.payload };
    case "SET_USER":
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

export const ContextApi = ({ children }: ContextProps) => {
  const [state, dispatch] = useReducer(contextReducer, initialState);

  return (
    <UserContextDispatch.Provider value={{ dispatch }}>
      <UserContextState.Provider value={{ state }}>
        {children}
      </UserContextState.Provider>
    </UserContextDispatch.Provider>
  );
};

export const useCustomDispatchContext = () =>
  useContext<{ dispatch: Dispatch }>(UserContextDispatch);

export const useCustomStateContext = () =>
  useContext<{ state: UserContext }>(UserContextState);


