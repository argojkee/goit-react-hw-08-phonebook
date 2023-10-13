export const getIsLoggedIn = state => state.auth.isLoggedIn;

export const getUserName = state => state.auth.user.name;

export const getUserEmail = state => state.auth.user.email;

export const getIsLoadingAuthUser = state => state.auth.isLoadingAuthUser;

export const getIsPending = state => state.auth.isPending;

export const getToken = state => state.auth.token;
