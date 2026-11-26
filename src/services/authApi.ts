import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface User {
  id: string;
  email: string;
  first_name?: string | null;
  last_name?: string | null;
  avatar_url?: string | null;
  created_at?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface RegisterInput {
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
  avatar_url?: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface UpdateProfileInput {
  first_name?: string;
  last_name?: string;
  avatar_url?: string | null;
}

export interface ChangeEmailInput {
  email: string;
  current_password: string;
}

export interface ChangePasswordInput {
  current_password: string;
  new_password: string;
}

// --- работа с токеном: тот же ключ, что читает dreamsApi ---
export const getAccessToken = (): string | null =>
  typeof window === "undefined"
    ? null
    : window.localStorage.getItem("dot.accessToken");

export const setAccessToken = (token: string) =>
  window.localStorage.setItem("dot.accessToken", token);

export const clearAccessToken = () =>
  window.localStorage.removeItem("dot.accessToken");

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001/api/",
    prepareHeaders: (headers) => {
      const token = getAccessToken();
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Me"],
  endpoints: (builder) => ({
    register: builder.mutation<AuthResponse, RegisterInput>({
      query: (body) => ({ url: "auth/register", method: "POST", body }),
    }),
    login: builder.mutation<AuthResponse, LoginInput>({
      query: (body) => ({ url: "auth/login", method: "POST", body }),
    }),
    getMe: builder.query<User, void>({
      query: () => "users/me",
      providesTags: ["Me"],
    }),
    updateProfile: builder.mutation<User, UpdateProfileInput>({
      query: (body) => ({ url: "users/me", method: "PATCH", body }),
      invalidatesTags: ["Me"],
    }),
    changeEmail: builder.mutation<User, ChangeEmailInput>({
      query: (body) => ({ url: "users/me", method: "PATCH", body }),
      invalidatesTags: ["Me"],
    }),
    changePassword: builder.mutation<void, ChangePasswordInput>({
      query: (body) => ({
        url: "users/me/password",
        method: "PATCH",
        body,
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useGetMeQuery,
  useUpdateProfileMutation,
  useChangeEmailMutation,
  useChangePasswordMutation,
} = authApi;