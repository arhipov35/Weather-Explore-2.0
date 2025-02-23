import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import configuration from "../configuration";

interface Main {
  temp: number;
  feels_like: number;
  humidity: number;
}

interface Weather {
  main: string;
}

interface Wind {
  speed: number;
}

interface List {
  main: Main;
  wind: Wind;
  weather: Weather[];
}

interface City {
  id: number;
  name: string;
}

interface WeatherData {
  list: List[];
  city: City;
}
export const weatherAPI = createApi({
  reducerPath: "weatherAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `${configuration.apiUrl}`,
    prepareHeaders(headers) {
      headers.set("Accept", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getWeather: builder.query<WeatherData, string>({
      query: (queryCity) =>
        `?q=${queryCity}&appid=${configuration.apiToken}&units=metric`,
    }),
  }),
});
export const { useGetWeatherQuery } = weatherAPI;
