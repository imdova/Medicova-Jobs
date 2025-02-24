import { Company } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const companySlice = createSlice({
  name: "company",
  initialState: {} as Company,
  reducers: {
    setCompany: (state, action: PayloadAction<Company>) => {
      return action.payload; // Update Redux state with the user object
    },
    clearCompany: () => {
      return {} as Company; // Reset to initial state
    },
  },
});
export const { setCompany, clearCompany } = companySlice.actions;
export const companyReducer = companySlice.reducer;
