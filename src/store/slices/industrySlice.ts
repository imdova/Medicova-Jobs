import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Industry, JobCategory } from '@/types';
import { getCategoryFromIndustryId, getIndustries } from '@/lib/actions/employer.actions';

interface IndustryState {
  industries: {
    data: Industry[];
    loading: boolean;
    error: string | null;
  };
  categories: {
    data: JobCategory[];
    loading: boolean;
    error: string | null;
  };
}

const initialState: IndustryState = {
  industries: {
    data: [],
    loading: false,
    error: null,
  },
  categories: {
    data: [],
    loading: false,
    error: null,
  },
};

// Async thunk for fetching industries
export const fetchIndustries = createAsyncThunk(
  'industry/fetchIndustries',
  async (_, { rejectWithValue }) => {
    try {
      const result = await getIndustries();
      if (result.success && result.data) {
        return result.data;
      }
      return rejectWithValue('Failed to fetch industries');
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch industries');
    }
  }
);

// Async thunk for fetching categories
export const fetchCategories = createAsyncThunk(
  'industry/fetchCategories',
  async (industryId: string, { rejectWithValue }) => {
    try {
      const result = await getCategoryFromIndustryId(industryId);
      if (result.success && result.data) {
        return result.data;
      }
      return rejectWithValue('Failed to fetch categories');
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch categories');
    }
  }
);

const industrySlice = createSlice({
  name: 'industry',
  initialState,
  reducers: {
    clearCategories: (state) => {
      state.categories.data = [];
      state.categories.error = null;
    },
    clearIndustries: (state) => {
      state.industries.data = [];
      state.industries.error = null;
    },
  },
  extraReducers: (builder) => {
    // Industries reducers
    builder
      .addCase(fetchIndustries.pending, (state) => {
        state.industries.loading = true;
        state.industries.error = null;
      })
      .addCase(fetchIndustries.fulfilled, (state, action) => {
        state.industries.loading = false;
        state.industries.data = action.payload.data;
        state.industries.error = null;
      })
      .addCase(fetchIndustries.rejected, (state, action) => {
        state.industries.loading = false;
        state.industries.error = action.payload as string;
      })
      // Categories reducers
      .addCase(fetchCategories.pending, (state) => {
        state.categories.loading = true;
        state.categories.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories.loading = false;
        state.categories.data = action.payload.data;
        state.categories.error = null;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.categories.loading = false;
        state.categories.error = action.payload as string;
      });
  },
});

export const { clearCategories, clearIndustries } = industrySlice.actions;
export const industryReducer = industrySlice.reducer;
