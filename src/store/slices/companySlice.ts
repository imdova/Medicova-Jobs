import { getCompanyById } from "@/lib/actions/employer.actions";
import { Company } from "@/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: Company = {
  name: "",
  typeId: "",
};

// export const fetchCompany = createAsyncThunk(
//   "todos/fetchTodos",
//   async (id: string, { rejectWithValue }) => {
//     try {
//       const response = await getCompanyById(id);
//       return response.data;
//     } catch (err) {
//       return rejectWithValue(err.response.data);
//     }
//   },
// );

export const fetchCompany = createAsyncThunk<
  Company,
  string, // Update this type to match the id parameter
  { rejectValue: string }
>("company/fetchCompany", async (id: string, { rejectWithValue }) => {
  try {
    const response = await getCompanyById(id);
    if (response.success && response.data) {
      return response.data;
    }
    return rejectWithValue("Failed to fetch company");
  } catch (error: any) {
    return rejectWithValue(error.response?.data || "Failed to fetch company");
  }
});

const companySlice = createSlice({
  name: "company",
  initialState: initialState,
  reducers: {
    setCompany: (state, action: PayloadAction<Company>) => {
      return action.payload; // Update Redux state with the user object
    },
    clearCompany: () => {
      return initialState; // Reset to initial state
    },
  },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchCompany.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(
//         fetchCompany.fulfilled,
//         (state, action: PayloadAction<Company>) => {
//           state.status = "succeeded";
//           state.todos = action.payload;
//         },
//       )
//       .addCase(
//         fetchCompany.rejected,
//         (state, action: PayloadAction<string | undefined>) => {
//           state.status = "failed";
//           state.error = action.payload || "Something went wrong";
//         },
//       );
//   },
});
export const { setCompany, clearCompany } = companySlice.actions;
export const companyReducer = companySlice.reducer;
