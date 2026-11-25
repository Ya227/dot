import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Dream {
  id: string;
  title: string;
  image_url: string | null;
  target_date: string | null;
  progress: number;
}

export interface PlanTask {
  id: string;
  stage_id: string;
  title: string;
  description: string | null;
  is_completed: boolean;
  is_ai_generated: boolean;
  deadline: string | null;
  task_order: number;
}

export interface PlanStage {
  id: string;
  dream_id: string;
  title: string;
  stage_order: number;
  status: string;
  progress: number;
  tasks: PlanTask[];
}

export interface DreamDetails extends Dream {
  description: string | null;
  dream_status: string;
  plan_status: string;
  stages: PlanStage[];
}

export interface CreateDreamInput {
  title: string;
  description: string;
  target_date: string;
  image_url: string | null;
}

export interface PlanDraftTask {
  id?: string;
  title: string;
  deadline: string;
  is_ai_generated: boolean;
  is_completed?: boolean;
}

export interface PlanDraftStage {
  id?: string;
  title: string;
  tasks: PlanDraftTask[];
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
  tagTypes: ["Dream", "Plan"],
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
    getDream: builder.query<DreamDetails, string>({
      query: (id) => `dreams/${id}`,
      providesTags: (_dream, _error, id) => [
        { type: "Dream", id },
        { type: "Plan", id },
      ],
    }),
    createDream: builder.mutation<Dream, CreateDreamInput>({
      query: (body) => ({
        url: "dreams",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Dream", id: "LIST" }],
    }),
    updateDream: builder.mutation<Dream, { id: string; progress?: number }>({
      query: ({ id, ...body }) => ({
        url: `dreams/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Dream", id },
        { type: "Dream", id: "LIST" },
        { type: "Plan", id },
      ],
    }),
    createStage: builder.mutation<PlanStage, { dreamId: string; title: string; stage_order: number }>({
      query: ({ dreamId, title, stage_order }) => ({
        url: `dreams/${dreamId}/stages`,
        method: "POST",
        body: { title, stage_order },
      }),
    }),
    updateStage: builder.mutation<PlanStage, { id: string; dreamId: string; title: string; status?: string; progress?: number }>({
      query: ({ id, title, status, progress }) => ({
        url: `stages/${id}`,
        method: "PUT",
        body: { title, status, progress },
      }),
    }),
    deleteStage: builder.mutation<void, { id: string; dreamId: string }>({
      query: ({ id }) => ({
        url: `stages/${id}`,
        method: "DELETE",
      }),
    }),
    createTask: builder.mutation<PlanTask, { stageId: string; dreamId: string; title: string; deadline: string; task_order: number; is_ai_generated: boolean }>({
      query: ({ stageId, title, deadline, task_order, is_ai_generated }) => ({
        url: `stages/${stageId}/tasks`,
        method: "POST",
        body: { title, deadline: deadline || null, task_order, is_ai_generated },
      }),
    }),
    updateTask: builder.mutation<PlanTask, { id: string; dreamId: string; title?: string; deadline?: string | null; is_completed?: boolean }>({
      query: ({ id, title, deadline, is_completed }) => ({
        url: `tasks/${id}`,
        method: "PATCH",
        body: { title, deadline, is_completed },
      }),
    }),
    deleteTask: builder.mutation<void, { id: string; dreamId: string }>({
      query: ({ id }) => ({
        url: `tasks/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetDreamsQuery,
  useGetDreamQuery,
  useCreateDreamMutation,
  useUpdateDreamMutation,
  useCreateStageMutation,
  useUpdateStageMutation,
  useDeleteStageMutation,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = dreamsApi;
