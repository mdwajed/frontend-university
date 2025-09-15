import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  QueryReturnValue,
} from "@reduxjs/toolkit/query";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { toast } from "sonner";
import { logOut, setUser } from "../features/auth/authSlice";
import type { RootState } from "../store";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api/v1",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("authorization", `${token}`);
    }
    return headers;
  },
});

const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  unknown,
  FetchBaseQueryError,
  {},
  FetchBaseQueryMeta
> = async (
  args,
  api,
  extraOptions
): Promise<
  QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>
> => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error?.status === 404) {
    toast.error("User not found");
    console.log("User not found...");
  }
  if (result.error?.status === 401) {
    console.log("Access token expired, attempting refresh...");
    try {
      const res = await fetch(
        "http://localhost:5000/api/v1/auth/refresh-token",
        {
          method: "POST",
          credentials: "include",
        }
      );
      if (res.ok) {
        const data = await res.json();
        console.log(data?.data?.accessToken);
        if (data?.data?.accessToken) {
          const user = (api.getState() as RootState).auth.user;
          api.dispatch(setUser({ user, token: data.data.accessToken }));
          result = await baseQuery(args, api, extraOptions);
        } else {
          api.dispatch(logOut());
        }
      } else {
        api.dispatch(logOut());
      }
    } catch (error) {
      console.error("Refresh token request failed", error);
      api.dispatch(logOut());
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: ["RegisteredSemester"],
  endpoints: () => ({}),
});
