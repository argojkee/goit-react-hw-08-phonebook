import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
axios.defaults.baseURL = "https://connections-api.herokuapp.com";

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = "";
  },
};

const toastOptions = { position: "top-center", autoClose: 3000 };

const register = createAsyncThunk(
  "auth/register",
  async (user, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/users/signup", user);
      token.set(data.token);
      toast.success(
        "Registration succesfull. Welcome to phone book",
        toastOptions
      );
      return data;
    } catch (error) {
      toast.error(
        "Something went wrong. Please try again or log in",
        toastOptions
      );
      return rejectWithValue(error.message);
    }
  }
);

const logIn = createAsyncThunk(
  "auth/login",
  async (user, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/users/login", user);
      token.set(data.token);
      toast.success(
        "Log in successfull. Welcome back to your phone book",
        toastOptions
      );
      return data;
    } catch (error) {
      toast.error(
        "Not valid email or password. Please, try again or register new account",
        toastOptions
      );
      return rejectWithValue("Not valid email or password. Please, try again");
    }
  }
);

const logOut = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await axios.post("/users/logout");
      token.unset();
      toast.success("Log out successfull. Come back sooner", toastOptions);
    } catch (error) {
      token.unset();
      return rejectWithValue(error.message);
    }
  }
);

const fetchCurrentUser = createAsyncThunk(
  "auth/refresh",
  async (_, { getState, rejectWithValue }) => {
    const { token: currentToken } = getState().auth;

    if (currentToken === null) {
      return rejectWithValue("Without token");
    }

    token.set(currentToken);
    try {
      const { data } = await axios.get("/users/current");
      return data;
    } catch (error) {
      token.unset();
      return rejectWithValue(
        "Auth state is old. Please enter to your personal cabinet again"
      );
    }
  }
);

const operations = {
  register,
  logOut,
  logIn,
  fetchCurrentUser,
};
export default operations;
