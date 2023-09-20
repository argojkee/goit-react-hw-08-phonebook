import { createSlice } from "@reduxjs/toolkit";
import {
  fetchContacts,
  addContact,
  deleteContact,
  editContact,
} from "./contactsOperations";

const initialState = {
  contacts: {
    contacts: [],
    isLoading: false,
    isDeleting: false,
    isAdding: false,
    error: null,
    isEditing: false,
  },
};

export const contactsSlice = createSlice({
  name: "contactsList",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.contacts.contacts = action.payload;
        state.contacts.isLoading = false;
        state.contacts.error = null;
      })
      .addCase(fetchContacts.pending, (state) => {
        state.contacts.isLoading = true;
        state.contacts.error = null;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.error = action.payload;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.contacts.contacts.push(action.payload);
        state.contacts.isLoading = false;
        state.contacts.error = null;
        state.contacts.isAdding = false;
      })
      .addCase(addContact.pending, (state) => {
        state.contacts.isLoading = true;
        state.contacts.error = null;
        state.contacts.isAdding = true;
      })
      .addCase(addContact.rejected, (state) => {
        state.contacts.isLoading = false;
        state.contacts.isAdding = false;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.contacts.contacts = state.contacts.contacts.filter(
          (contact) => contact.id !== action.payload.id
        );
        state.contacts.isDeleting = false;
        state.contacts.error = null;
      })
      .addCase(deleteContact.pending, (state, action) => {
        state.contacts.isDeleting = true;
        state.contacts.error = null;
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.contacts.isDeleting = false;
      })
      .addCase(editContact.pending, (state) => {
        state.contacts.isEditing = true;
        state.contacts.error = null;
      })
      .addCase(
        editContact.fulfilled,
        (state, { payload: { id: respId, name, number } }) => {
          state.contacts.contacts = state.contacts.contacts.map((contact) =>
            contact.id === respId ? { id: respId, name, number } : contact
          );
          state.contacts.isEditing = false;

          state.contacts.error = null;
        }
      )
      .addCase(editContact.rejected, (state, action) => {
        state.contacts.isEditing = false;
      });
  },
});

export const getContactsList = (state) => state.contactsList.contacts.contacts;
export const getLoading = (state) => state.contactsList.contacts.isLoading;
export const getError = (state) => state.contactsList.contacts.error;
export const getDeleting = (state) => state.contactsList.contacts.isDeleting;
export const getIsAdding = (state) => state.contactsList.contacts.isAdding;
export const getIsEditing = (state) => state.contactsList.contacts.isEditing;
