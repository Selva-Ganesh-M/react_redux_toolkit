import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiSlice = createApi({
  reducerPath: "api", //default value thus optional
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3500",
  }),
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => "/todos",
    }),
  }),
});

export const { useGetTodosQuery } = apiSlice;
export default apiSlice;
