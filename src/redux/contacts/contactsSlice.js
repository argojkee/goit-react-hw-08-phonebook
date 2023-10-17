import { createSlice } from "@reduxjs/toolkit";

import { baseApi } from "redux/baseApi";

const initialState = {
  contacts: {
    contacts: [],
  },
};

export const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  extraReducers: builder => {
    builder
      .addMatcher(
        baseApi.endpoints.fetchContacts.matchFulfilled,
        (state, action) => {
          state.contacts.contacts = action.payload;
        }
      )

      .addMatcher(
        baseApi.endpoints.addContact.matchFulfilled,
        (state, action) => {
          state.contacts.contacts.push(action.payload);
        }
      )

      .addMatcher(
        baseApi.endpoints.deleteContact.matchFulfilled,
        (state, action) => {
          state.contacts.contacts = state.contacts.contacts.filter(
            contact => contact.id !== action.payload.id
          );
        }
      )

      .addMatcher(
        baseApi.endpoints.editContact.matchFulfilled,
        (state, { payload: { id: respId, name, number } }) => {
          state.contacts.contacts = state.contacts.contacts.map(contact =>
            contact.id === respId ? { id: respId, name, number } : contact
          );
        }
      );
  },
});

export const getContactsList = state => state.contacts.contacts.contacts;
