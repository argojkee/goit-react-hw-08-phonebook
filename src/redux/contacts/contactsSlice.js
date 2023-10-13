import { createSlice } from '@reduxjs/toolkit';

import { baseApi } from 'redux/baseApi';

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
  name: 'contacts',
  initialState,
  extraReducers: builder => {
    builder
      .addMatcher(
        baseApi.endpoints.fetchContacts.matchFulfilled,
        (state, action) => {
          state.contacts.contacts = action.payload;
          state.contacts.isLoading = false;
          state.contacts.error = null;
        }
      )
      .addMatcher(baseApi.endpoints.fetchContacts.matchPending, state => {
        state.contacts.isLoading = true;
        state.contacts.error = null;
      })
      .addMatcher(
        baseApi.endpoints.fetchContacts.matchRejected,
        (state, action) => {
          state.contacts.isLoading = false;
          state.contacts.error = action.payload;
        }
      )
      .addMatcher(
        baseApi.endpoints.addContact.matchFulfilled,
        (state, action) => {
          state.contacts.contacts.push(action.payload);
          state.contacts.isLoading = false;
          state.contacts.error = null;
          state.contacts.isAdding = false;
        }
      )
      .addMatcher(baseApi.endpoints.addContact.matchPending, state => {
        state.contacts.isLoading = true;
        state.contacts.error = null;
        state.contacts.isAdding = true;
      })
      .addMatcher(baseApi.endpoints.addContact.matchRejected, state => {
        state.contacts.isLoading = false;
        state.contacts.isAdding = false;
      })
      .addMatcher(
        baseApi.endpoints.deleteContact.matchFulfilled,
        (state, action) => {
          state.contacts.contacts = state.contacts.contacts.filter(
            contact => contact.id !== action.payload.id
          );
          state.contacts.isDeleting = false;
          state.contacts.error = null;
        }
      )
      .addMatcher(
        baseApi.endpoints.deleteContact.matchPending,
        (state, action) => {
          state.contacts.isDeleting = true;
          state.contacts.error = null;
        }
      )
      .addMatcher(
        baseApi.endpoints.deleteContact.matchRejected,
        (state, action) => {
          state.contacts.isDeleting = false;
        }
      )
      .addMatcher(baseApi.endpoints.editContact.matchPending, state => {
        state.contacts.isEditing = true;
        state.contacts.error = null;
      })
      .addMatcher(
        baseApi.endpoints.editContact.matchFulfilled,
        (state, { payload: { id: respId, name, number } }) => {
          state.contacts.contacts = state.contacts.contacts.map(contact =>
            contact.id === respId ? { id: respId, name, number } : contact
          );
          state.contacts.isEditing = false;

          state.contacts.error = null;
        }
      )
      .addMatcher(baseApi.endpoints.editContact.matchRejected, state => {
        state.contacts.isEditing = false;
      });
  },
});

export const getContactsList = state => state.contacts.contacts.contacts;
export const getLoading = state => state.contacts.contacts.isLoading;
export const getError = state => state.contacts.contacts.error;
export const getDeleting = state => state.contacts.contacts.isDeleting;
export const getIsAdding = state => state.contacts.contacts.isAdding;
export const getIsEditing = state => state.contacts.contacts.isEditing;
