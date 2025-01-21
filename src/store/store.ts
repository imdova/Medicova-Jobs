import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./slices/userSlice";
import { resetReducer } from "./slices/resetSlice";
import { companyReducer } from "./slices/companySlice";
import { locationReducer } from "./slices/locationSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userReducer,
      resetEmail: resetReducer,
      company: companyReducer,
      location: locationReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
