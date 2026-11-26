import { configureStore } from "@reduxjs/toolkit";

import { authApi } from "./services/authApi";
import { dreamsApi } from "./services/dreamsApi";

export const store = configureStore({
  reducer: {
    [dreamsApi.reducerPath]: dreamsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(dreamsApi.middleware)
      .concat(authApi.middleware),
});
