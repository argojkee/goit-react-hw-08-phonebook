import { createSlice } from '@reduxjs/toolkit';

import { baseApi } from 'redux/baseApi';

const initialState = {
  contacts: {
    contacts: [],
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
          state.contacts.error = null;
        }
      )
      .addMatcher(baseApi.endpoints.fetchContacts.matchPending, state => {
        state.contacts.error = null;
      })
      .addMatcher(
        baseApi.endpoints.fetchContacts.matchRejected,
        (state, action) => {
          state.contacts.error = action.payload;
        }
      )
      .addMatcher(
        baseApi.endpoints.addContact.matchFulfilled,
        (state, action) => {
          state.contacts.contacts.push(action.payload);
          state.contacts.error = null;
        }
      )
      .addMatcher(baseApi.endpoints.addContact.matchPending, state => {
        state.contacts.error = null;
      })

      .addMatcher(
        baseApi.endpoints.deleteContact.matchFulfilled,
        (state, action) => {
          state.contacts.contacts = state.contacts.contacts.filter(
            contact => contact.id !== action.payload.id
          );
          state.contacts.error = null;
        }
      )
      .addMatcher(baseApi.endpoints.deleteContact.matchPending, state => {
        state.contacts.error = null;
      })

      .addMatcher(baseApi.endpoints.editContact.matchPending, state => {
        state.contacts.error = null;
      })
      .addMatcher(
        baseApi.endpoints.editContact.matchFulfilled,
        (state, { payload: { id: respId, name, number } }) => {
          state.contacts.contacts = state.contacts.contacts.map(contact =>
            contact.id === respId ? { id: respId, name, number } : contact
          );

          state.contacts.error = null;
        }
      );
  },
});

export const getContactsList = state => state.contacts.contacts.contacts;
export const getError = state => state.contacts.contacts.error;
