import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { JobData } from '@/types';
import { getJobsByCompanyId } from '@/lib/actions/job.actions';

interface JobState {
  jobs: {
    data: JobData[];
    loading: boolean;
    error: string | null;
  };
}

const initialState: JobState = {
  jobs: {
    data: [],
    loading: false,
    error: null,
  },
};

// Async thunk for fetching jobs
export const fetchJobs = createAsyncThunk(
  'job/fetchJobs',
  async (companyId: string, { rejectWithValue }) => {
    try {
      const result = await getJobsByCompanyId(companyId);
      if (result.success && result.data) {
        return result.data;
      }
      return rejectWithValue('Failed to fetch jobs');
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch jobs');
    }
  }
);

const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    clearCompanyJobs: (state) => {
      state.jobs.data = [];
      state.jobs.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.jobs.loading = true;
        state.jobs.error = null;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.jobs.loading = false;
        state.jobs.data = action.payload.data;
        state.jobs.error = null;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.jobs.loading = false;
        state.jobs.error = action.payload as string;
      });
  },
});

export const { clearCompanyJobs } = jobSlice.actions;
export const companyJobsReducer = jobSlice.reducer;


