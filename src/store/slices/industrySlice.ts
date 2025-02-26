import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  API_GET_CATEGORIES_BY_INDUSTRY,
  API_GET_INDUSTRIES,
  API_GET_SPECIALITIES_BY_CATEGORY,
  API_GET_CAREER_LEVELS_BY_CATEGORY,
} from "@/api/admin";

type Item = {
  id: string;
  name: string;
};

interface IndustryState {
  industries: {
    data: Item[];
    loading: boolean;
    error: string | null;
  };
  categories: {
    data: Item[];
    loading: boolean;
    error: string | null;
  };
  specialities: {
    data: Item[];
    loading: boolean;
    error: string | null;
  };
  careerLevels: {
    data: Item[];
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
  specialities: {
    data: [],
    loading: false,
    error: null,
  },
  careerLevels: {
    data: [],
    loading: false,
    error: null,
  },
};

// Async thunk for fetching industries
export const fetchIndustries = createAsyncThunk(
  "industry/fetchIndustries",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_GET_INDUSTRIES}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
      });
      if (response.ok) {
        const data: PaginatedResponse<Item> = await response.json();
        return data;
      }
      return rejectWithValue("Failed to fetch industries");
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to fetch industries",
      );
    }
  },
);

// Async thunk for fetching categories
export const fetchCategories = createAsyncThunk(
  "industry/fetchCategories",
  async (industryIds: string[], { rejectWithValue }) => {
    const queryString = industryIds.map((id) => `ids=${id}`).join("&");
    try {
      const response = await fetch(
        `${API_GET_CATEGORIES_BY_INDUSTRY}?${queryString}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
          },
        },
      );
      if (response.ok) {
        const data: PaginatedResponse<Item> = await response.json();
        return data;
      }
      return rejectWithValue("Failed to fetch categories");
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to fetch categories",
      );
    }
  },
);

// New thunk for fetching specialities by category
export const fetchSpecialities = createAsyncThunk(
  "industry/fetchSpecialities",
  async (categoryId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${API_GET_SPECIALITIES_BY_CATEGORY}${categoryId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
          },
        },
      );
      if (response.ok) {
        const data: PaginatedResponse<any> = await response.json(); // Replace 'any' with proper type
        return data;
      }
      return rejectWithValue("Failed to fetch specialities");
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to fetch specialities",
      );
    }
  },
);

// New thunk for fetching career levels by categories
export const fetchCareerLevels = createAsyncThunk(
  "industry/fetchCareerLevels",
  async (categoryIds: string[], { rejectWithValue }) => {
    try {
      const queryString = categoryIds.map((id) => `ids=${id}`).join("&");
      const response = await fetch(
        `${API_GET_CAREER_LEVELS_BY_CATEGORY}?${queryString}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
          },
        },
      );
      if (response.ok) {
        const data: PaginatedResponse<any> = await response.json(); // Replace 'any' with proper type
        return data;
      }
      return rejectWithValue("Failed to fetch career levels");
    } catch (error) {
      return rejectWithValue(
        error instanceof Error
          ? error.message
          : "Failed to fetch career levels",
      );
    }
  },
);

const industrySlice = createSlice({
  name: "industry",
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
    clearSpecialities: (state) => {
      state.specialities.data = [];
      state.specialities.error = null;
    },
    clearCareerLevels: (state) => {
      state.careerLevels.data = [];
      state.careerLevels.error = null;
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
      })
      // New specialities reducers
      .addCase(fetchSpecialities.pending, (state) => {
        state.specialities.loading = true;
        state.specialities.error = null;
      })
      .addCase(fetchSpecialities.fulfilled, (state, action) => {
        state.specialities.loading = false;
        state.specialities.data = action.payload.data;
        state.specialities.error = null;
      })
      .addCase(fetchSpecialities.rejected, (state, action) => {
        state.specialities.loading = false;
        state.specialities.error = action.payload as string;
      })
      // New career levels reducers
      .addCase(fetchCareerLevels.pending, (state) => {
        state.careerLevels.loading = true;
        state.careerLevels.error = null;
      })
      .addCase(fetchCareerLevels.fulfilled, (state, action) => {
        state.careerLevels.loading = false;
        state.careerLevels.data = action.payload.data;
        state.careerLevels.error = null;
      })
      .addCase(fetchCareerLevels.rejected, (state, action) => {
        state.careerLevels.loading = false;
        state.careerLevels.error = action.payload as string;
      });
  },
});

export const {
  clearCategories,
  clearIndustries,
  clearSpecialities,
  clearCareerLevels,
} = industrySlice.actions;
export const industryReducer = industrySlice.reducer;
