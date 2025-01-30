import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { EmploymentType } from '@/types';
import { getEmploymentTypes } from '@/lib/actions/employer.actions';

interface EmploymentTypeState {
  employmentTypes: {
    data: EmploymentType[];
    loading: boolean;
    error: string | null;
  };
}

const initialState: EmploymentTypeState = {
  employmentTypes: {
    data: [],
    loading: false,
    error: null,
  },
};

// Async thunk for fetching employment types
export const fetchEmploymentTypes = createAsyncThunk(
  'employmentType/fetchEmploymentTypes',
  async (_, { rejectWithValue }) => {
    try {
      const result = await getEmploymentTypes();
      if (result.success && result.data) {
        return result.data;
      }
      return rejectWithValue('Failed to fetch employment types');
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch employment types');
    }
  }
);

const employmentTypeSlice = createSlice({
  name: 'employmentType',
  initialState,
  reducers: {
    clearEmploymentTypes: (state) => {
      state.employmentTypes.data = [];
      state.employmentTypes.error = null;
    },
  },
  extraReducers: (builder) => {
    // Employment types reducers
    builder
      .addCase(fetchEmploymentTypes.pending, (state) => {
        state.employmentTypes.loading = true;
        state.employmentTypes.error = null;
      })
      .addCase(fetchEmploymentTypes.fulfilled, (state, action) => {
        state.employmentTypes.loading = false;
        state.employmentTypes.data = action.payload.data;
        state.employmentTypes.error = null;
      })
      .addCase(fetchEmploymentTypes.rejected, (state, action) => {
        state.employmentTypes.loading = false;
        state.employmentTypes.error = action.payload as string;
      });
  },
});

export const { clearEmploymentTypes } = employmentTypeSlice.actions;
export const employmentTypeReducer = employmentTypeSlice.reducer;
