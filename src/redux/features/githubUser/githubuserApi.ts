
import { ParamSerialization } from "@/lib/ParamSerialization";
import { apiSlice } from "../../api/apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    githubUserGetById: builder.query({
      query: (args: Record<string, unknown>) => {
        const query = args ? ParamSerialization(args) : "";
        return `github/github-user?${query}`;
      },
      providesTags: ["github_user"],
    }),
  }),
});

export const {
  useGithubUserGetByIdQuery
} = userApi;
