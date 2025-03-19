import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const gameSlice = createApi({
  reducerPath: 'gameSlice',
  tagTypes: ["GameSlice"],
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/game' }),
  endpoints: (builder) => ({
    // Récupère la liste complète des pâtisseries.
    getPastries: builder.query({
      query: () => '/pastries',
      providesTags: ['GameSlice'],
    }),
    // Récupère les détails d'une pâtisserie spécifique en fonction de son ID.
    getPastrieById: builder.query({
      query: (id) => `/pastrie/${id}`,
      providesTags: ['GameSlice'],
    }),
    // Récupère la quantité des patisseries gagnées égale à la quantité
    //  passée en paramètre de la route 
    //  si il reste suffisamment de quantité de patisseries,
    //  et sinon retourne un tableau vide.
    getWinPastries: builder.query({
      query: (quantity) => `/win-pastries/${quantity}`,
      providesTags: ['GameSlice'],
    }),
  }),
});

export const { 
  useGetPastriesQuery, 
  useGetPastrieByIdQuery, 
  useGetWinPastriesQuery } 
= gameSlice;
