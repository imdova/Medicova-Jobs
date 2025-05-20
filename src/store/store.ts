import { configureStore } from "@reduxjs/toolkit";
import { companyReducer } from "./slices/companySlice";
import { locationReducer } from "./slices/locationSlice";
import { modalReducer } from "./slices/modalSlice";
import { companyJobsReducer } from "./slices/jobSlice";
import { jobApplicationsReducer } from "./slices/applications.slice";
import { industryReducer } from "./slices/industriesSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      company: companyReducer,
      location: locationReducer,
      industry: industryReducer,
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
