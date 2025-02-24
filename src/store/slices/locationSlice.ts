import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Country, State } from "@/types";
import { API_GET_COUNTRIES, API_GET_STATES } from "@/api/general";

interface LocationState {
  countries: {
    data: Country[];
    loading: boolean;
    error: string | null;
  };
  states: {
    data: State[];
    loading: boolean;
    error: string | null;
  };
}

const initialState: LocationState = {
  countries: {
    data: [],
    loading: false,
    error: null,
  },
  states: {
    data: [],
    loading: false,
    error: null,
  },
};

// Async thunk for fetching countries
export const fetchCountries = createAsyncThunk(
  "location/fetchCountries",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(API_GET_COUNTRIES, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        return data;
      }
      return rejectWithValue("Failed to fetch countries");
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to fetch countries",
      );
    }
  },
);

// Async thunk for fetching states
export const fetchStates = createAsyncThunk(
  "location/fetchStates",
  async (countryCode: string, { rejectWithValue }) => {
    try {
      const response = await fetch(
        API_GET_STATES + `?countryCode=${countryCode}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
          },
        },
      );
      if (response.ok) {
        const data = await response.json();
        return data;
      }

      return rejectWithValue("Failed to fetch states");
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to fetch states",
      );
    }
  },
);

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    clearStates: (state) => {
      state.states.data = [];
      state.states.error = null;
    },
    clearCountries: (state) => {
      state.countries.data = [];
      state.countries.error = null;
    },
  },
  extraReducers: (builder) => {
    // Countries reducers
    builder
      .addCase(fetchCountries.pending, (state) => {
        state.countries.loading = true;
        state.countries.error = null;
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.countries.loading = false;
        state.countries.data = action.payload;
        state.countries.error = null;
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.countries.loading = false;
        state.countries.error = action.payload as string;
      })
      // States reducers
      .addCase(fetchStates.pending, (state) => {
        state.states.loading = true;
        state.states.error = null;
      })
      .addCase(fetchStates.fulfilled, (state, action) => {
        state.states.loading = false;
        state.states.data = action.payload;
        state.states.error = null;
      })
      .addCase(fetchStates.rejected, (state, action) => {
        state.states.loading = false;
        state.states.error = action.payload as string;
      });
  },
});

export const { clearStates, clearCountries } = locationSlice.actions;
export const locationReducer = locationSlice.reducer;
