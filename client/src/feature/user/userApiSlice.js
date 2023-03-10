import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const userAdapter = createEntityAdapter({});
const initialState = userAdapter.getInitialState();

const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUser: builder.query({
      query: () => ({
        url: "/user/",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (response) => {
        const responseData = response.users.map((data) => {
          data.id = data._id;
          return data;
        });

        return userAdapter.setAll(initialState, responseData);
      },
      providesTags: (result, error, args) => {
        if (result?.ids) {
          return [
            { type: "User", id: "LIST" },
            ...result.ids.map((id) => ({ type: "User", id })),
          ];
        } else {
          return [{ type: "User", id: "LIST" }];
        }
      },
    }),
    updateUserInformation: builder.mutation({
      query: (initialData) => ({
        url: "/user/updateUserInformation",
        method: "PATCH",
        body: {
          ...initialData,
        },
      }),
    }),
  }),
});

export const { useGetAllUserQuery, useUpdateUserInformationMutation } =
  userApiSlice;
export default userApiSlice;
