import { configureStore } from "@reduxjs/toolkit";
import habitReducer from "../features/habit/habitSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
        habit: habitReducer,
    },
  });
}

export const store = makeStore();

export type AppStore = typeof store; 

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;




