import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const gameSlice = createApi({
  reducerPath: "gameSlice",
  tagTypes: ["GameSlice"],
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/game", credentials: "include" }),
  endpoints: (builder) => ({
    getPastries: builder.query({
      query: () => "/pastries",
      providesTags: ["GameSlice"],
    }),
    getPastrieById: builder.query({
      query: (id) => `/pastrie/${id}`,
      providesTags: ["GameSlice"],
    }),
    getWinPastries: builder.mutation({  
      query: (quantity) => ({
        url: `/win-pastries/${quantity}`,
        method: "GET",
      }),
      invalidatesTags: ["GameSlice"],
    }),
  }),
});

export const { 
  useGetPastriesQuery, 
  useGetPastrieByIdQuery, 
  useGetWinPastriesMutation // ✅ Mutation au lieu de Query
} = gameSlice;
