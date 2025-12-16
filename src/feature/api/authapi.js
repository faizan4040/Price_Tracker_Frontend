import { createApi, fetchBaseQuery,  } from "@reduxjs/toolkit/query/react";
import { userLoggedIn, userLoggedOut } from "../authSlice";

const USER_API = `${import.meta.env.VITE_API_BASE_URL}/api/v1/user`;

export const authApi = createApi({
  reducerPath: "authApi",

  baseQuery: fetchBaseQuery({
    baseUrl: USER_API,
    credentials: "include",
     prepareHeaders: (headers) => {
      headers.set("Access-Control-Allow-Credentials", "true");
      return headers;
    },
  }),

  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (inputData) => ({
        url: "register",
        method: "POST",
        body: inputData,
      }),
    }),

    loginUSer: builder.mutation({
      query: (inputData) => ({
        url: "login",
        method: "POST",
        body: inputData,
      }),

      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(userLoggedIn({ user: result.data.user }));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    logoutUser: builder.mutation({
      query: () =>({
        url: "logout",
        method:"GET"
      }),

      // use this clear user after logout 
       async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(userLoggedIn({ user:null }));
        } catch (error) {
          console.log(error);
        }
      },
    }),

    loadUser: builder.query({
  query: () => ({
    url: "profile",
    method: "GET",
  }),
  async onQueryStarted(_, { queryFulfilled, dispatch }) {
    try {
      const { data } = await queryFulfilled;
      dispatch(userLoggedIn({ user: data.user }));   // ✅ restore session
    } catch (error) {
      dispatch(userLoggedOut());                     // ❌ only logout on error
    }
  },
}),


    updateUser: builder.mutation({
      query: (formData) => ({
        url:"profile/update",
        method:"PUT",
        body:formData,
        credentials:"include"
      })
     }) 
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUSerMutation,
  useLogoutUserMutation,
  useLoadUserQuery,
  useUpdateUserMutation
} = authApi;
