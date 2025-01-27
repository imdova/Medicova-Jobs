import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { JobData } from "@/types";
import {
  deleteJob,
  getJobsByCompanyId,
  updateJob,
} from "@/lib/actions/job.actions";

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
  "job/fetchJobs",
  async (companyId: string, { rejectWithValue }) => {
    try {
      const result = await getJobsByCompanyId(companyId);
      if (result.success && result.data) {
        return result.data.data;
      }
      return rejectWithValue("Failed to fetch jobs");
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to fetch jobs",
      );
    }
  },
);

// Async thunk for updating a job
export const updateCompanyJob = createAsyncThunk(
  "job/updateCompanyJob",
  async (job: Partial<JobData>, { rejectWithValue }) => {
    try {
      const result = await updateJob(job);
      if (result.success && result.data) {
        return result.data;
      }
      return rejectWithValue("Failed to update job");
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to update job",
      );
    }
  },
);

export const removeCompanyJob = createAsyncThunk(
  "job/removeCompanyJob",
  async (jobId: string, { rejectWithValue }) => {
    try {
      const result = await deleteJob(jobId);
      if (result.success) {
        return jobId;
      }
      return rejectWithValue("Failed to remove job");
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to remove job",
      );
    }
  },
);

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    clearCompanyJobs: (state) => {
      state.jobs.data = [];
      state.jobs.error = null;
    },
    addNewJob: (state, action: PayloadAction<JobData>) => {
      state.jobs.data.push(action.payload);
    },
    updateJobOptimistic: (state, action: PayloadAction<Partial<JobData>>) => {
      const { id, ...updates } = action.payload;
      const job = state.jobs.data.find((job) => job.id === id);
      if (job) {
        Object.assign(job, updates); // Apply all updates dynamically
      }
    },
    removeJobOptimistic: (state, action: PayloadAction<string>) => {
      state.jobs.data = state.jobs.data.filter(
        (job) => job.id !== action.payload,
      );
    },
  },
  extraReducers: (builder) => {
    builder
      // fetch jobs
      .addCase(fetchJobs.pending, (state) => {
        state.jobs.loading = true;
        state.jobs.error = null;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.jobs.loading = false;
        state.jobs.data = action.payload;
        state.jobs.error = null;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.jobs.loading = false;
        state.jobs.error = action.payload as string;
      })
      // Update Job
      .addCase(updateCompanyJob.pending, (state) => {
        state.jobs.error = null;
      })
      .addCase(updateCompanyJob.fulfilled, (state, action) => {
        state.jobs.loading = false;
        const index = state.jobs.data.findIndex(
          (job) => job.id === action.payload.id,
        );
        if (index !== -1) {
          state.jobs.data[index] = action.payload;
        }
        state.jobs.error = null;
      })
      .addCase(updateCompanyJob.rejected, (state, action) => {
        state.jobs.loading = false;
        state.jobs.error = action.payload as string;
      })

      // Remove Job
      .addCase(removeCompanyJob.fulfilled, (state, action) => {
        state.jobs.data = state.jobs.data.filter(
          (job) => job.id !== action.payload,
        );
      })
      .addCase(removeCompanyJob.rejected, (state, action) => {
        state.jobs.error = action.payload as string;
      });
  },
});

export const {
  clearCompanyJobs,
  updateJobOptimistic,
  addNewJob,
  removeJobOptimistic,
} = jobSlice.actions;
export const companyJobsReducer = jobSlice.reducer;
