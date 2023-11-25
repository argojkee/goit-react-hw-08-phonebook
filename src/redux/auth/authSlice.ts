import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { baseApi } from "../baseApi";

type State = {
  user: {
    name: null | string;
    email: null | string;
  };
  token: null | string;
};

const initialState: State = {
  user: { name: null, email: null },
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{
        user: {
          name: string;
          email: string;
        };
        token: string;
      }>
    ) => {
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };
    },

    resetUser: state => {
      return {
        ...state,
        user: {
          name: null,
          email: null,
        },
        token: null,
      };
    },
  },
});

export const { setUser, resetUser } = authSlice.actions;
export default authSlice.reducer;
