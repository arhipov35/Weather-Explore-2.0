import { configureStore } from "@reduxjs/toolkit";
import { weatherAPI } from "./services/openWeather";

export const store = configureStore({
  reducer: { [weatherAPI.reducerPath]: weatherAPI.reducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(weatherAPI.middleware),
});
