import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const userSlice = createApi({
	reducerPath: "userSlice",
	tagTypes: ["UserSlice"],
	baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3001", 
        credentials: "include", 
	}),
	endpoints: (builder) => ({
    // Permet de vérifier l'email et le mot de 
    // passe de l'utilisateur pour l'authentifier.
        login: builder.mutation({
            query: (data) => ({
              url: '/login',
              method: 'POST',
              body: data,
              credentials: 'include',
            }),
            invalidatesTags: ['UserSlice'],
        }),
        // Permet à l'utilisateur connecté de se déconnecter.
        logout: builder.mutation({
            query: () => ({
              url: '/logout',
              method: 'GET',
              credentials: 'include',
            }),
            invalidatesTags: ['UserSlice'],
        }),
        // permet de demander au backend si l'utilisateur est
        //  bien authentifié
        getUser: builder.query({
            query: () => '/me',
            credentials: 'include',
            providesTags: ['UserSlice'],
        }),
    }),
});

export const { 
    useLoginMutation, 
    useLogoutMutation, 
    useGetUserQuery 
} = userSlice;
