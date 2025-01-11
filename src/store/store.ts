import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./slices/userSlice";
import { resetReducer } from "./slices/resetSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userReducer,
      resetEmail: resetReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
