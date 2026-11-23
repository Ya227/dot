import { configureStore } from "@reduxjs/toolkit";

import { dreamsApi } from "./services/dreamsApi";

export const store = configureStore({
  reducer: {
    [dreamsApi.reducerPath]: dreamsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(dreamsApi.middleware),
});
