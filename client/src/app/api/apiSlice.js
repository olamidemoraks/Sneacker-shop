import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4500/api/v1",
    credentials: "include",
  }),
  tagTypes: ["User", "Product"],
  endpoints: (builder) => ({}),
});
