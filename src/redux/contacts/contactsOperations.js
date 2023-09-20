import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const toastOptions = { position: "top-center", autoClose: 3000 };

export const fetchContacts = createAsyncThunk(
  "contacts/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/contacts");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        "Oops... Something went wrong =(. Please, reload page and try again"
      );
    }
  }
);

export const addContact = createAsyncThunk(
  "contacts/addContact",
  async (user, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/contacts/`, user);
      toast.success("Contact has been added to your book", toastOptions);

      return response.data;
    } catch (error) {
      toast.error(
        "Oops... Something went wrong =(. Please, reload page and try again",
        toastOptions
      );

      return rejectWithValue(
        "Oops... Something went wrong =(. Please, reload page and try again"
      );
    }
  }
);

export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/contacts/${userId}`);
      toast.success("Contacts has been deleted from your book", toastOptions);

      return response.data;
    } catch (error) {
      toast.error(
        "Oops... Something went wrong =(. Please, reload page and try again",
        toastOptions
      );

      return rejectWithValue(
        "Oops... Something went wrong =(. Please, reload page and try again"
      );
    }
  }
);

export const editContact = createAsyncThunk(
  "contacts/editContact",
  async ({ id, name, number }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`/contacts/${id}`, { name, number });
      toast.success("Contact has been edited. Thank you", toastOptions);
      return response.data;
    } catch (error) {
      toast.error(
        "Oops... Something went wrong =(. Please, reload page and try again",
        toastOptions
      );
      console.log("error");
      return rejectWithValue(
        "Oops... Something went wrong =(. Please, reload page and try again"
      );
    }
  }
);
