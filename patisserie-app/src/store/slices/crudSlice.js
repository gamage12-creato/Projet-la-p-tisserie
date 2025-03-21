import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const crudSlice = createApi({
  reducerPath: 'crudSlice',
  tagTypes: ["CrudSlice"],
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/api', credentials: "include",  }),
  endpoints: (builder) => {
    return{
    // Récupère la liste de toutes les pâtisseries.
    getAllPastries: builder.query({
      query: () => '/pastries',
      credentials: 'include',
      providesTags: ['CrudSlice'],
    }),
    // Récupère une pâtisserie en fonction de son ID.
    getPastrieById: builder.query({
      query: (id) => `/pastrie/${id}`,
      credentials: 'include',
      providesTags: ['CrudSlice'],
    }),
    // Recherche une pâtisserie en fonction d'un mot-clé.
    searchPastries: builder.query({
      query: (word) => `/pastries-search/${word}`,
      providesTags: ['CrudSlice'],
    }),
    // Ajoute une nouvelle pâtisserie.
    createPastrie: builder.mutation({
      query: (newPastrie) => ({
        url: '/pastrie',
        method: 'POST',
        body: newPastrie,        
        credentials: 'include',
      }),
      invalidatesTags: ['CrudSlice'],
    }),
    // Modifie une pâtisserie existante en fonction de son ID.
    updatePastrie: builder.mutation({
      query: ({ id, ...updates }) => ({
        url: `/pastrie/${id}`,
        method: 'PUT',
        body: updates,
        credentials: 'include',
      }),
      invalidatesTags: ['CrudSlice'],
    }),
    // Supprime une pâtisserie en fonction de son ID.
    deletePastrie: builder.mutation({
      query: (id) => ({
        url: `/pastrie/${id}`,
        method: 'DELETE',
        credentials: 'include',
      }),
      invalidatesTags: ['CrudSlice'],
    }),
  }},
});

export const { 
  useGetAllPastriesQuery, 
  useGetPastrieByIdQuery, 
  useSearchPastriesQuery, 
  useCreatePastrieMutation, 
  useUpdatePastrieMutation, 
  useDeletePastrieMutation 
} = crudSlice;
