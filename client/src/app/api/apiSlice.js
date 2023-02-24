import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.BASE_URL}/api/v1`,
    credentials: "include",
  }),
  tagTypes: ["User", "Product"],
  endpoints: (builder) => ({}),
});
