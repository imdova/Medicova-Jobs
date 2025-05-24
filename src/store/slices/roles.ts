import { API_GET_ROLES_BY_COMPANY, API_CREATE_ROLE, API_UPDATE_ROLE, ROLES } from "@/api/users";
import { Role } from "@/types/next-auth";
import { RoleFormData } from "@/types/permissions";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface RoleState {
  data: Role[];
  loading: boolean;
  previousState: Role[] | null; // for rollback
  error: string | null;
}

const initialState: RoleState = {
  data: [],
  loading: false,
  previousState: null, // for rollback
  error: null,
};

// Async thunk for fetching roles
export const fetchRoles = createAsyncThunk(
  "roles/fetchRoles",
  async (
    companyId: string,
    { rejectWithValue },
  ) => {
    try {
      const response = await fetch(
        API_GET_ROLES_BY_COMPANY + companyId + "?page=1&limit=100",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
          },
        },
      );
      if (!response.ok) return rejectWithValue("Failed to fetch roles");
      const result: PaginatedResponse<Role> = await response.json();
      return result.data || [];
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to fetch roles",
      );
    }
  },
  {
    condition: (_, { getState }) => {
      const state = getState() as { roles: RoleState };
      return state.roles.data.length === 0;
    },
  },
);

// Async thunk for creating a role
export const createRole = createAsyncThunk(
  "roles/createRole",
  async (
    role: RoleFormData,
    { rejectWithValue },
  ) => {
    try {
      const response = await fetch(API_CREATE_ROLE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify(role),
      });
      if (!response.ok) return rejectWithValue("Failed to create role");
      const newRole = await response.json();
      return newRole;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to create role",
      );
    }
  },
);

// Async thunk for updating a role
export const updateRole = createAsyncThunk(
  "roles/updateRole",
  async (
    role: RoleFormData,
    { rejectWithValue },
  ) => {
    try {
      const response = await fetch(API_UPDATE_ROLE, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify(role),
      });
      if (!response.ok) return rejectWithValue("Failed to update role");
      const updatedRole = await response.json();
      return updatedRole;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to update role",
      );
    }
  },
);

// Async thunk for deleting a role
export const deleteRole = createAsyncThunk(
  "roles/deleteRole",
  async (
    { roleId, companyId }: { roleId: string; companyId: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await fetch(ROLES + "/" + roleId, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
      });
      if (!response.ok) return rejectWithValue("Failed to delete role");
      return roleId;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to delete role",
      );
    }
  },
);

const rolesSlice = createSlice({
  name: "roles",
  initialState,
  reducers: {
    clearRoles: (state) => {
      state.data = [];
      state.error = null;
    },
    clearRolesError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
    builder
      // Fetch roles
      .addCase(fetchRoles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload || [];
        state.error = null;
      })
      .addCase(fetchRoles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Create role
      .addCase(createRole.pending, (state, action) => {
        const tempRole = {
          ...action.meta.arg,
          id: "temp-" + Date.now(),
          permissions: [],
          users: 0,
        };
        state.previousState = [...state.data]; // Save rollback point
        state.data.push(tempRole);
      })
      .addCase(createRole.fulfilled, (state, action) => {
        const index = state.data.findIndex(role => role.id.startsWith("temp-"));
        if (index !== -1) {
          state.data[index] = action.payload;
        }
        state.previousState = null;
        state.error = null;
      })
      .addCase(createRole.rejected, (state, action) => {
        // Revert to previous state
        if (state.previousState) {
          state.data = state.previousState;
        }
        state.previousState = null;
        state.error = action.payload as string;
      })

      // Update role
      .addCase(updateRole.pending, (state, action) => {
        const { id, ...updates } = action.meta.arg;
        const index = state.data.findIndex(role => role.id === id);
        if (index !== -1) {
          state.previousState = [...state.data]; // Save rollback point
          state.data[index] = {
            ...state.data[index],
            ...updates,
          };
        }
      })
      .addCase(updateRole.fulfilled, (state, action) => {
        const index = state.data.findIndex(role => role.id === action.payload.id);
        if (index !== -1) {
          state.data[index] = action.payload;
        }
        state.previousState = null;
        state.error = null;
      })
      .addCase(updateRole.rejected, (state, action) => {
        if (state.previousState) {
          state.data = state.previousState;
        }
        state.previousState = null;
        state.error = action.payload as string;
      })

      // Delete role
      .addCase(deleteRole.pending, (state, action) => {
        state.previousState = [...state.data]; // Save rollback point
        state.data = state.data.filter(role => role.id !== action.meta.arg.roleId);
      })
      .addCase(deleteRole.fulfilled, (state) => {
        state.previousState = null;
        state.error = null;
      })
      .addCase(deleteRole.rejected, (state, action) => {
        if (state.previousState) {
          state.data = state.previousState;
        }
        state.previousState = null;
        state.error = action.payload as string;
      });

  },
});

export const { clearRoles, clearRolesError } = rolesSlice.actions;
export const rolesReducer = rolesSlice.reducer;
