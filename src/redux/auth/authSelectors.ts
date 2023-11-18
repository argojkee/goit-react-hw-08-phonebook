import { RootState } from "../store";

export const getUserName = (state: RootState) => state.auth.user.name;

export const getUserEmail = (state: RootState) => state.auth.user.email;

export const getToken = (state: RootState) => state.auth.token;
