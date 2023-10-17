import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://connections-api.herokuapp.com",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
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
    register: builder.mutation({
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
    logIn: builder.mutation({
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
    logOut: builder.mutation({
      query() {
        return {
          url: `/users/logout`,
          method: "POST",
        };
      },
    }),
    fetchCurrentUser: builder.mutation({
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
    fetchContacts: builder.query({
      query: () => `/contacts`,
      providesTags: ["Contacts"],
      keepUnusedDataFor: 0,
    }),
    addContact: builder.mutation({
      query(contact) {
        return {
          url: `/contacts`,
          method: "POST",
          body: contact,
        };
      },
      invalidatesTags: ["Contacts"],
    }),
    deleteContact: builder.mutation({
      query(id) {
        return {
          url: `/contacts/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Contacts"],
    }),
    editContact: builder.mutation({
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
