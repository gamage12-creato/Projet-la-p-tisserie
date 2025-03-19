import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
	reducerPath: "api",
	tagTypes: ["api"],
	baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3001", 
        credentials: "include", 
	}),
	endpoints: (build) => ({

    }),
});

export const {} = apiSlice;