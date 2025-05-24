"use client";
import React, { useState } from "react";
import {
  Button,
  Select,
  MenuItem,
  FormControl,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Plus, Search, X } from "lucide-react";
import DataTable from "../UI/data-table";
import { API_GET_SEEKERS } from "@/api/seeker";
import useFetch from "@/hooks/useFetch";
import Avatar from "../UI/Avatar";
import Link from "next/link";
import { formatDate, formatName } from "@/util";
import { DeleteOutline, EditOutlined } from "@mui/icons-material";
import { Permission, Role, RoleState } from "@/types/next-auth";
import { FieldConfig } from "@/types";
import FormModal from "../form/FormModal/FormModal";
import { RoleFormData } from "@/types/permissions";
import { clearRolesError, createRole } from "@/store/slices/roles";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { User } from "next-auth";
import useUpdateApi from "@/hooks/useUpdateApi";
import { API_GET_COMPANY_EMPLOYEES } from "@/api/employer";
import { API_CREATE_COMPANY_USER } from "@/api/users";
import { CompanyUser } from "@/types/employer";


interface CreateCompanyUser {
  rolesIds: string[];
  companyId: string;
  firstName: string;
  lastName: string;
  email: string;
}


const DEFAULT_FILTERS = {
  page: 1,
  limit: 10,
  q: "",
}

const UsersTab: React.FC<{ user?: User, roles: Role[], permissions: Permission[] }> = ({ roles, permissions, user }) => {
  const [selected, setSelected] = useState<(number | string)[]>([]);
  const [apiFilters, setApiFilters] = useState(DEFAULT_FILTERS);

  const [isOpen, setIsOpen] = useState(false);
  const onOpen = () => setIsOpen(true);
  const onClose = () => {
    setIsOpen(false);
    dispatch(clearRolesError());
  }

  const [isUserOpen, setIsUserOpen] = useState(false);
  const onUserOpen = () => setIsUserOpen(true);
  const onUserClose = () => {
    setIsUserOpen(false);
    dispatch(clearRolesError());
  }

  const { error: createRoleError, loading: createRoleLoading } = useAppSelector((state) => state.roles);


  const { data } = useFetch<PaginatedResponse<CompanyUser>>(user?.companyId ? API_GET_COMPANY_EMPLOYEES + user?.companyId : null);
  const { data: users = [], total = 0 } = data || {};

  const dispatch = useAppDispatch();

  const { update, isLoading: updateLoading, error: updateError } = useUpdateApi();

  const handleDelete = (item: CompanyUser) => {
    console.log("Deleting", "item");
  }

  const handleEdit = (item: CompanyUser) => {
    console.log("Editing", "item");
  }

  const handleRoleChange = (userId: string, newRole: RoleState | "newRole") => {
    if (newRole === "newRole") {
      onOpen()
    } else {
      console.log("Updating role for user", userId, "to", newRole);
      // TODO: Implement API call to update user role
    }
  };

  const handleSubmit = async (data: RoleFormData) => {
    if (!user?.companyId) return
    try {
      data.forUserType = "employer"
      data.companyId = user?.companyId
      await dispatch(createRole(data)).unwrap();
      onClose();
      return { error: false };
    } catch (error) {
      console.log("error ==> ", error);
      return { error: true };
    }
  }

  const handleUserSubmit = async (data: CreateCompanyUser) => {
    if (!user?.companyId) return;
    try {
      data.companyId = user?.companyId
      await update(API_CREATE_COMPANY_USER, {
        method: "POST",
        body: data,
      });
      onUserClose();
      return { error: false };
    } catch (error) {
      console.log("error ==> ", error);
      return { error: true };
    }
  }


  const fields: FieldConfig<RoleFormData>[] = [
    {
      label: "Role Name",
      name: "name",
      required: true,
      type: "text",
      textFieldProps: {
        placeholder: "Add Name For The Role",
      }
    },
    {
      label: "Role Description",
      name: "description",
      type: "textArea",
      textFieldProps: {
        placeholder: "Add Description For The Role",
      },
      required: true,
    },
    {
      label: "Role Permissions",
      name: "permissionsIds.ids",
      type: "search-select",
      multiple: true,
      options: permissions?.map((permission) => ({
        label: permission.name,
        value: permission.id,
      })),
      required: true,
    },
  ]
  const userFields: FieldConfig<CreateCompanyUser>[] = [
    {
      label: "First Name",
      name: "firstName",
      required: true,
      type: "text",
      textFieldProps: {
        placeholder: "Add First Name",
      },
      gridProps: {
        sm: 6,
      }
    },
    {
      label: "Last Name",
      name: "lastName",
      type: "text",
      textFieldProps: {
        placeholder: "Add Last Name",
      },
      required: true,
      gridProps: {
        sm: 6,
      }
    },
    {
      label: "Email",
      name: "email",
      type: "email",
      textFieldProps: {
        placeholder: "Add Last Name",
      },
      required: true,
    },
    {
      label: "Role Permissions",
      name: "rolesIds",
      type: "search-select",
      multiple: true,
      options: roles?.map((role) => ({
        label: role.name,
        value: role.id,
      })),
      required: true,
    },
  ]

  return (
    <>
      <FormModal
        fields={fields}
        onSubmit={handleSubmit}
        onClose={onClose}
        open={isOpen}
        loading={createRoleLoading}
        error={createRoleError || ""}
        title="Create New Role"
        description="Create rules for users "
        submitButtonText="Create"
      />
      <FormModal
        fields={userFields}
        onSubmit={handleUserSubmit}
        onClose={onUserClose}
        open={isUserOpen}
        loading={updateLoading}
        error={updateError?.message || ""}
        title="Create New User"
        description="Create a new user for the company"
        submitButtonText="Create"
      />

      <div className="rounded-base border border-gray-200 bg-white shadow-soft">
        <div
          className="flex flex-wrap justify-between items-center p-4 md:p-6"
        >
          <div>
            <h4 className="mb-1 text-2xl font-bold text-main">
              Users
            </h4>
            <p className="mb-2 text-secondary">
              All the users who have access to the Company Account.
            </p>
          </div>
          <Button
            onClick={onUserOpen}
            variant="contained"
            startIcon={<Plus className="w-5 h-5" />}
          >
            Add New User
          </Button>
        </div>
      </div>

      <div className=" rounded-base border border-gray-200 bg-white p-4 shadow-soft md:p-6">
        <TextField
          type="text"
          placeholder="Search users..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search className="h-5 w-5" />
              </InputAdornment>
            ),
            autoComplete: "off", // Disable browser's autocomplete
          }}
          value={apiFilters.q}
          onChange={(e) => setApiFilters(prev => ({ ...prev, q: e.target.value }))}
        />
      </div>


      <div className="rounded-base border border-gray-200 bg-white  shadow-soft">
        <div className="body-container overflow-x-auto">
          <DataTable
            data={users}
            total={total}
            selected={selected}
            setSelected={setSelected}
            searchQuery={apiFilters.q}
            cellClassName="p-2 text-sm"
            headerClassName="p-2 text-sm"
            className="border-none"

            columns={[
              {
                key: "firstName",
                header: "User",
                sortable: true,
              },

              {
                key: "lastName",
                header: "Last Name",
                sortable: true,
              },
              {
                key: "email",
                header: "Email",
                sortable: true,
              },
              {
                header: "Role",
                render: (item) => (
                  <div className="mb-2 flex flex-wrap gap-2">
                    {item.roles.map((role) => (
                      <div key={role.id} className="space-x-2 rounded-base border bg-primary-100 py-1 pl-2 pr-1 text-main duration-100">
                        <span className="text-xs"> {role.name} </span>
                        <IconButton
                          className="p-1 hover:bg-red-100 hover:text-red-500"
                        // onClick={() => onRemove(item)}
                        >
                          <X className="h-4 w-4" />
                        </IconButton>
                      </div>
                    ))}
                  </div>
                  // <FormControl size="small" sx={{ minWidth: 120 }}>
                  //   <Select
                  //     value={item.roles[0].id || "unverified"}
                  //     onChange={(e) => handleRoleChange(item.id, e.target.value as RoleState)}
                  //     size="small"
                  //     className="bg-transparent"
                  //     sx={{
                  //       "& .MuiOutlinedInput-notchedOutline": {
                  //         padding: 0,
                  //         border: "none",
                  //       },
                  //     }}
                  //     renderValue={(value: any) => {
                  //       const selected = roles?.find((role) => role.id == value)?.name;
                  //       return selected ? (
                  //         selected
                  //       ) : (
                  //         <span className="text-neutral-400">
                  //           Select Role
                  //         </span>
                  //       );
                  //     }}
                  //   >
                  //     <MenuItem value="" disabled>
                  //       <em>Select Role</em>
                  //     </MenuItem>
                  //     {roles?.map((role) => (
                  //       <MenuItem key={role.id} value={role.id}>
                  //         {role.name}
                  //       </MenuItem>
                  //     ))}
                  //     <MenuItem onClick={() => handleRoleChange(item.id, "newRole")} value="newRole">
                  //       <Plus className="mr-2 h-4 w-4" />
                  //       Create New Role
                  //     </MenuItem>
                  //   </Select>
                  // </FormControl>
                )
              },
              {
                header: "Actions",
                render: (item) => (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="rounded-md bg-blue-100 p-2 text-blue-600 hover:bg-blue-200"
                    >
                      <EditOutlined fontSize="small" />
                    </button>
                    <button
                      onClick={() => handleDelete(item)}
                      className="rounded-md bg-red-100 p-2 text-red-600 hover:bg-red-200"
                    >
                      <DeleteOutline fontSize="small" />
                    </button>
                  </div>
                )
              }

            ]}
          />
        </div>
      </div>
    </>
  );
};

export default UsersTab;
