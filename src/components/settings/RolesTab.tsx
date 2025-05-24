"use client";
import React, { useState } from "react";
import {
    Button,
    TextField,
    InputAdornment,
} from "@mui/material";
import { Plus, Search } from "lucide-react";
import DataTable from "../UI/data-table";
import { DeleteOutline, EditOutlined } from "@mui/icons-material";
import { Permission, Role } from "@/types/next-auth";
import { FieldConfig } from "@/types";
import FormModal from "../form/FormModal/FormModal";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { RoleFormData } from "@/types/permissions";
import { clearRolesError, createRole, deleteRole, updateRole } from "@/store/slices/roles";
import { User } from "next-auth";

const DEFAULT_FILTERS = {
    page: 1,
    limit: 10,
    q: "",
};

const RolesTab: React.FC<{ roles: Role[], user?: User, permissions: Permission[] }> = ({ roles, user, permissions }) => {
    const [selected, setSelected] = useState<(number | string)[]>([]);
    const [apiFilters, setApiFilters] = useState(DEFAULT_FILTERS);
    const [isOpen, setIsOpen] = useState(false);
    const [editingRole, setEditingRole] = useState<Role | null>(null);

    const onOpen = () => {
        setEditingRole(null);
        setIsOpen(true);
    };
    const onClose = () => {
        setEditingRole(null);
        dispatch(clearRolesError());
        setIsOpen(false);
    };

    const { error: roleError, loading: roleLoading } = useAppSelector((state) => state.roles);
    const dispatch = useAppDispatch();

    const handleDelete = async (role: Role) => {
        // if (window.confirm(`Are you sure you want to delete the role "${role.name}"?`)) {
        //     await dispatch(deleteRole({ roleId: role.id, companyId: role.companyId || "" }));
        // }
    };

    const handleEdit = (role: Role) => {
        setEditingRole(role);
        setIsOpen(true);
    };

    const handleSubmit = async (data: RoleFormData) => {
        try {
            if (editingRole) {
                await dispatch(updateRole({ ...data, id: editingRole.id })).unwrap();
            } else {
                if (!user?.companyId) throw new Error("Company ID is required");
                data.forUserType = "employer"
                data.companyId = user?.companyId
                await dispatch(createRole(data)).unwrap();
            }
            onClose();
            return { error: false };
        } catch (error) {
            console.log("error ==> ", error);
            return { error: true };
        }
    };

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
    ];

    return (
        <>
            <FormModal
                fields={fields}
                onSubmit={handleSubmit}
                onClose={onClose}
                open={isOpen}
                loading={roleLoading}
                error={roleError || ""}
                title={editingRole ? "Edit Role" : "Create New Role"}
                description={editingRole ? "Edit role permissions and details" : "Create rules for users"}
                submitButtonText={editingRole ? "Update" : "Create"}
                initialValues={editingRole ? {
                    name: editingRole.name,
                    description: editingRole.description,
                    permissionsIds: {
                        ids: editingRole.permissions.map(p => p.id)
                    }
                } : undefined}
            />

            <div className="rounded-base border border-gray-200 bg-white shadow-soft">
                <div className="flex flex-wrap justify-between items-center p-4 md:p-6">
                    <div>
                        <h4 className="mb-1 text-2xl font-bold text-main">
                            Roles
                        </h4>
                        <p className="mb-2 text-secondary">
                            Manage user roles and their permissions.
                        </p>
                    </div>
                    <Button
                        onClick={onOpen}
                        variant="contained"
                        startIcon={<Plus className="w-5 h-5" />}
                    >
                        Add New Role
                    </Button>
                </div>
            </div>

            <div className="rounded-base border border-gray-200 bg-white p-4 shadow-soft md:p-6">
                <TextField
                    type="text"
                    placeholder="Search roles..."
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search className="h-5 w-5" />
                            </InputAdornment>
                        ),
                        autoComplete: "off",
                    }}
                    value={apiFilters.q}
                    onChange={(e) => setApiFilters(prev => ({ ...prev, q: e.target.value }))}
                />
            </div>

            <div className="rounded-base border border-gray-200 bg-white shadow-soft">
                <div className="body-container overflow-x-auto">
                    <DataTable
                        data={roles}
                        total={roles.length}
                        selected={selected}
                        setSelected={setSelected}
                        searchQuery={apiFilters.q}
                        cellClassName="p-2 text-sm"
                        headerClassName="p-2 text-sm"
                        className="border-none"
                        columns={[
                            {
                                key: "name",
                                header: "Role Name",
                                sortable: true,
                            },
                            {
                                key: "description",
                                header: "Description",
                                sortable: true,
                            },
                            {
                                key: "permissions",
                                header: "Permissions",
                                render: (role) => (
                                    <div className="flex flex-wrap gap-1">
                                        {role.permissions.length}
                                    </div>
                                ),
                            },
                            {
                                key: "users",
                                header: "Users",
                                render: (role) => (
                                    <div className="flex flex-wrap gap-1">
                                        {role?.users || 0}
                                    </div>
                                ),
                            },
                            {
                                header: "Actions",
                                render: (role) => (
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleEdit(role)}
                                            className="rounded-md bg-blue-100 p-2 text-blue-600 hover:bg-blue-200"
                                        >
                                            <EditOutlined fontSize="small" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(role)}
                                            className="rounded-md bg-red-100 p-2 text-red-600 hover:bg-red-200"
                                        >
                                            <DeleteOutline fontSize="small" />
                                        </button>
                                    </div>
                                ),
                            },
                        ]}
                    />
                </div>
            </div>
        </>
    );
};

export default RolesTab;

