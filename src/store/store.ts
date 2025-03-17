import { configureStore } from "@reduxjs/toolkit";
import { resetReducer } from "./slices/resetSlice";
import { companyReducer } from "./slices/companySlice";
import { locationReducer } from "./slices/locationSlice";
import { modalReducer } from "./slices/modalSlice";
import { companyJobsReducer } from "./slices/jobSlice";
import { jobApplicationsReducer } from "./slices/applications.slice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      resetEmail: resetReducer,
      company: companyReducer,
      location: locationReducer,
      modal: modalReducer,
      companyJobs: companyJobsReducer,
      jobApplications: jobApplicationsReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
