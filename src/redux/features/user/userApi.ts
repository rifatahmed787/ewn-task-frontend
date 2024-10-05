
import { ParamSerialization } from "@/lib/ParamSerialization";
import { apiSlice } from "../../api/apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    userGetById: builder.query({
      query: (args: Record<string, unknown>) => {
        const query = args ? ParamSerialization(args) : "";
        return `/user/userinfo?${query}`;
      },
      providesTags: ["profile", "user"],
    }),
  }),
});

export const {
  useUserGetByIdQuery
} = userApi;
