import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/api";
import gameReducer from "./slices/gameSlice";
import userReducer from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    game: gameReducer,
    user: userReducer,
    [apiSlice.reducerPath]: apiSlice.reducer, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
