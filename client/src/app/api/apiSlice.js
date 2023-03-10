import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.BASE_URL}/api/v1`,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      if (getState().auth?.profile?.token) {
        headers.set(
          "authorization",
          `Bearer ${getState().auth?.profile?.token}`
        );
      }
      return headers;
    },
  }),

  tagTypes: ["User", "Product"],
  endpoints: (builder) => ({}),
});
