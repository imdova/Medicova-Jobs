import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: { email: string | null } = {
  email: null,
};

const resetSlice = createSlice({
  name: "resetEmail",
  initialState: initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<{ email: string | null }>) => {
      return action.payload; // Update Redux state with the user object
    },
    clearEmail: () => {
      return initialState; // Reset to initial state
    },
  },
});
export const { setEmail, clearEmail } = resetSlice.actions;
export const resetReducer = resetSlice.reducer;
