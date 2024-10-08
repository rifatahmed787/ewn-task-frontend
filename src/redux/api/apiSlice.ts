import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

// Define a service using a base URL and expected endpoints
export const apiSlice = createApi({
  reducerPath: "apis",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://ewn-server.vercel.app/api/v1",

    prepareHeaders(headers, { getState }) {
      // Access the authentication token from the Redux store
      const authToken = (getState() as RootState).auth.accessToken;
      if (authToken) {
        headers.set("Authorization", `Bearer ${authToken}`);
      }
      return headers;
    },
  }),
  tagTypes: [
    "user",
    "github_user",
    "profile"
  ],

  endpoints: () => ({}),
});