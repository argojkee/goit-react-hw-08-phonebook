import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "./store";
import {
  AuthResponse,
  RegisterRequest,
  LoginRequest,
  CurrentUserResponse,
  Contact,
  ContactRequest,
} from "../types";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://connections-api.herokuapp.com",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["Contacts"],
  endpoints: () => ({}),
});

const authApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    register: builder.mutation<AuthResponse, RegisterRequest>({
      query({ name, email, password }) {
        return {
          url: `/users/signup`,
          method: "POST",
          body: {
            name,
            email,
            password,
          },
        };
      },
    }),
    logIn: builder.mutation<AuthResponse, LoginRequest>({
      query({ email, password }) {
        return {
          url: `/users/login`,
          method: "POST",
          body: {
            email,
            password,
          },
        };
      },
    }),
    logOut: builder.mutation<void, void>({
      query() {
        return {
          url: `/users/logout`,
          method: "POST",
        };
      },
    }),
    fetchCurrentUser: builder.mutation<CurrentUserResponse, void>({
      query() {
        return {
          url: `/users/current`,
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useRegisterMutation,
  useLogInMutation,
  useLogOutMutation,
  useFetchCurrentUserMutation,
} = authApi;

const contactsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    fetchContacts: builder.query<Contact[], void>({
      query: () => `/contacts`,
      providesTags: ["Contacts"],
      keepUnusedDataFor: 0,
    }),
    addContact: builder.mutation<Contact, ContactRequest>({
      query(contact) {
        return {
          url: `/contacts`,
          method: "POST",
          body: contact,
        };
      },
      invalidatesTags: ["Contacts"],
    }),
    deleteContact: builder.mutation<Contact, string>({
      query(id) {
        return {
          url: `/contacts/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Contacts"],
    }),
    editContact: builder.mutation<Contact, Contact>({
      query({ id, name, number }) {
        return {
          url: `/contacts/${id}`,
          method: "PATCH",
          body: { name, number },
        };
      },
      invalidatesTags: ["Contacts"],
    }),
  }),
});

export const {
  useFetchContactsQuery,
  useAddContactMutation,
  useDeleteContactMutation,
  useEditContactMutation,
} = contactsApi;

export type EndpointType = typeof authApi.endpoints;
