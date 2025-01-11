import { UserState } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

const InitialUserData: UserState = {
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
  image: null,
  name: null,
};
interface UserReducerState {
  loading: boolean;
  user: UserState;
  error?: string;
}
const initialState: UserReducerState = {
  loading: false,
  user: InitialUserData,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      return { ...state, user: action.payload, loading: false }; // Update Redux state with the user object
    },
    clearUser: () => {
      return initialState; // Reset to initial state
    },
    setLoading: (state, action) => {
      return { ...state, loading: action.payload };
    },
    setError: (state, action) => {
      return { ...state, error: action.payload };
    },
  },
});
export const { setUser, clearUser, setLoading, setError } = userSlice.actions;
export const userReducer = userSlice.reducer;
