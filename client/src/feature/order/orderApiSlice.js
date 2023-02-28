import { apiSlice } from "../../app/api/apiSlice";

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (initialData) => ({
        url: "/order/createOrder",
        method: "POST",
        body: {
          ...initialData,
        },
      }),
    }),
  }),
});

export const { useCreateOrderMutation } = orderApiSlice;
