import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const productAdapter = createEntityAdapter({});
const initialState = productAdapter.getInitialState();

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: "/product", 
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (response) => {
        const responseData = response.products.map((product) => {
          product.id = product._id;
          return product;
        });
        return productAdapter.setAll(initialState, responseData);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Product", id: "LIST" },
            ...result?.ids.map((id) => ({ type: "Product", id })),
          ];
        } else {
          return [{ type: "Product", id: "LIST" }];
        }
      },
    }),
    createProduct: builder.mutation({
      query: (body) => ({
        url: "/product",
        method: "POST",
        body,
      }),

      invalidatesTags: (result, error, arg) => [
        { type: "Product", id: "LIST" },
      ],
    }),
    deleteProduct: builder.mutation({
      query: ({ id }) => ({
        url: `/product/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Product", id: arg.id },
      ],
    }),
    updateProduct: builder.mutation({
      query: (body) => ({
        url: "/product",
        method: "PATCH",
        body,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Product", id: arg.id },
      ],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
} = productApiSlice;
