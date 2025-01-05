import { UserState } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: UserState = {
  id: null,
  email: null,
  firstName: null,
  lastName: null,
  roles: [],
  active: false,
  birth: null,
  phone: null,
  companyId: null,
  created_at: null,
  updated_at: null,
  deleted_at: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    initialUser: () => {
      let user = initialState;
      if (typeof window !== "undefined") {
        const userFromStorage = localStorage.getItem("user");
        if (userFromStorage) {
          user = JSON.parse(userFromStorage);
        }
      }
      return user; // initialize the user
    },
    setUser: (state, action: PayloadAction<UserState>) => {
      const user = action.payload;
      if (typeof window !== "undefined") {
        // Store user in localStorage on the client-side only
        localStorage.setItem("user", JSON.stringify(user));
      }
      return user; // Update Redux state with the user object
    },
    clearUser: () => {
      if (typeof window !== "undefined") {
        // Remove user from localStorage on the client-side only
        localStorage.removeItem("user");
      }
      return initialState; // Reset to initial state
    },
  },
});
export const { setUser, clearUser, initialUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
