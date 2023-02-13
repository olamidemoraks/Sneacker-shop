import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://sneaker-backend2.onrender.com",
    credentials: "include",
  }),
  tagTypes: ["User", "Product"],
  endpoints: (builder) => ({}),
});
