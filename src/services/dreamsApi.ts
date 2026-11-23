import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Dream {
  id: string;
  title: string;
  image_url: string | null;
  target_date: string | null;
  progress: number;
}

export interface CreateDreamInput {
  title: string;
  description: string;
  target_date: string;
  image_url: string | null;
}

export const getApiErrorMessage = (error: unknown, fallback: string): string => {
  if (typeof error !== "object" || error === null) {
    return fallback;
  }

  if ("data" in error && typeof error.data === "object" && error.data !== null) {
    const data = error.data;
    if ("message" in data && typeof data.message === "string") {
      return data.message;
    }
  }
  if ("message" in error && typeof error.message === "string") {
    return error.message;
  }
  return fallback;
};

const isDreamArray = (value: unknown): value is Dream[] =>
  Array.isArray(value) &&
  value.every((dream: unknown) => {
    if (typeof dream !== "object" || dream === null) {
      return false;
    }

    const record = dream as Record<string, unknown>;
    return (
      typeof record.id === "string" &&
      typeof record.title === "string" &&
      typeof record.progress === "number" &&
      (record.image_url === null || typeof record.image_url === "string") &&
      (record.target_date === null || typeof record.target_date === "string")
    );
  });

const getAccessToken = (): string | null => {
  if (typeof window === "undefined") {
    return null;
  }
  return window.localStorage.getItem("dot.accessToken");
};

export const dreamsApi = createApi({
  reducerPath: "dreamsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001/api/",
    prepareHeaders: (headers) => {
      const token = getAccessToken();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Dream"],
  keepUnusedDataFor: 60,
  endpoints: (builder) => ({
    getDreams: builder.query<Dream[], void>({
      query: () => "dreams",
      transformResponse: (response: unknown) => {
        if (!isDreamArray(response)) {
          throw new Error("Сервер вернул некорректный список мечт");
        }
        return response;
      },
      providesTags: (dreams) =>
        dreams
          ? [
              ...dreams.map(({ id }) => ({ type: "Dream" as const, id })),
              { type: "Dream" as const, id: "LIST" },
            ]
          : [{ type: "Dream" as const, id: "LIST" }],
    }),
    createDream: builder.mutation<Dream, CreateDreamInput>({
      query: (body) => ({
        url: "dreams",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Dream", id: "LIST" }],
    }),
  }),
});

export const { useGetDreamsQuery, useCreateDreamMutation } = dreamsApi;
