import { apiSlice } from "../../app/api/apiSlice";
import { logout } from "./authSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (initialValue) => ({
        url: "/auth/login",
        method: "POST",
        body: {
          ...initialValue,
        },
      }),
    }),
    register: builder.mutation({
      query: (initialValue) => ({
        url: "/auth/register",
        method: "POST",
        body: {
          ...initialValue,
        },
      }),
    }),
    sendLogout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "GET",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(logout());
          setTimeout(() => {
            dispatch(apiSlice.util.resetApiState());
          }, 1000);
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useSendLogoutMutation } =
  authApiSlice;
