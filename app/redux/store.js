import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import movementsSlice from "./slices/movementsSlice";


export const store = configureStore({
    reducer: {
        userAuth: authSlice,
        movements: movementsSlice,
    },
})