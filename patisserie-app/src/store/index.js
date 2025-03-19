import { configureStore } from "@reduxjs/toolkit";
import { gameSlice } from "./slices/gameSlice";
import { crudSlice } from "./slices/crudSlice";
import { userSlice } from "./slices/userSlice";


export const store = configureStore({
  reducer: {
    [gameSlice.reducerPath]: gameSlice.reducer, 
    [crudSlice.reducerPath]: crudSlice.reducer, 
    [userSlice.reducerPath]: userSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
    .concat(gameSlice.middleware)
    .concat(crudSlice.middleware)
    .concat(userSlice.middleware),
});

export default store;
