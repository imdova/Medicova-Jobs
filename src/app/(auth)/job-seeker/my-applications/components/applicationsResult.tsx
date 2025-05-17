"use client";
import { TAGS } from "@/api";
import {
  API_DELETE_JOB_APPLICATION,
  API_UPDATE_JOB_APPLICATION,
} from "@/api/employer";
import Avatar from "@/components/UI/Avatar";
import CellOptions from "@/components/UI/CellOptions";
import DataTable from "@/components/UI/data-table";
import DeleteConfirmationDialog from "@/components/UI/DeleteConfirmationDialog";
import useUpdateApi from "@/hooks/useUpdateApi";
import { ColumnConfig } from "@/types";
import { formatDate } from "@/util";
import { Delete, KeyboardReturn } from "@mui/icons-material";
import { Chip } from "@mui/material";
import Link from "next/link";
import { useState } from "react";

type Color = {
  text: string;
  bg: string;
};

const STATUS_COLORS: Record<ApplicationStatus, Color> = {
  Review: { text: "#FFB800", bg: "#FFF5DD" },
  Viewed: { text: "#00B8D9", bg: "#E6FCFF" },
  Shortlisted: { text: "#6554C0", bg: "#EAE6FF" },
  Interviewed: { text: "#9747FF", bg: "#F3E8FF" },
  Accepted: { text: "#36B37E", bg: "#E3FCEF" },
  Rejected: { text: "#FF5630", bg: "#FFE9E5" },
  Withdrawn: { text: "#FF8C00", bg: "#FFF4E5" },
};

interface ApplicationsResultProps {
  applications: ApplicationsType[];
}
const ApplicationsResult: React.FC<ApplicationsResultProps> = ({
  applications,
}) => {
  const [appToDelete, setAppToDelete] = useState<ApplicationsType | null>();
  const onDeleteCancel = () => setAppToDelete(null);

  const [appToEdit, setAppToEdit] = useState<ApplicationsType | null>();
  const onEditCancel = () => setAppToEdit(null);

  const {
    isLoading: deleteLoading,
    error: deletionError,
    update: deleteItem,
  } = useUpdateApi<UserProfile>();
  const { isLoading, error, update } = useUpdateApi<UserProfile>();

  const onDelete = async () => {
    if (!appToDelete) return;
    await deleteItem(
      API_DELETE_JOB_APPLICATION + appToDelete.id,
      { method: "DELETE" },
      TAGS.applicants,
    );
    setAppToDelete(null);
  };

  const onWithdrawing = async () => {
    if (!appToEdit) return;
    update(
      API_UPDATE_JOB_APPLICATION,
      { body: { id: appToEdit.id, status: "Withdrawn" } },
      TAGS.applicants,
    );
    setAppToEdit(null);
  };

  const columns: ColumnConfig<ApplicationsType>[] = [
    {
      key: "job.company.name",
      header: "Company Name",
      sortable: true,
      render: (app) => (
        <Link
          href={`/co/${app.job.company.username}`}
          className="flex w-fit items-center gap-2"
        >
          <Avatar size={40} src={app.job.company.avatar} />
          <span className="text-xs hover:underline">
            {app.job.company.name}
          </span>
        </Link>
      ),
    },
    {
      key: "job.title",
      header: "Job",
      sortable: true,
      render: (app) => (
        <Link className="text-sm hover:underline" href={`/job/${app.job.id}`}>
          {app.job.title}
        </Link>
      ),
    },
    {
      // replace with job specialty
      key: "job.jobSpeciality",
      header: "Role",
      render: (app) => (
        <p className="text-sm">
          {app.job.jobSpeciality} - {app.job.jobCareerLevel}
        </p>
      ),
      sortable: true,
    },
    {
      key: "created_at",
      header: "Date Applied",
      sortable: true,
      render: (app) => formatDate(app.created_at),
    },
    {
      key: "status",
      header: "Status",
      sortable: true,
      render: (app) => (
        <span
          className="rounded-base px-3 py-2 text-sm"
          style={{
            color: STATUS_COLORS[app.status].text,
            backgroundColor: STATUS_COLORS[app.status].bg,
          }}
        >
          {app.status}
        </span>
      ),
    },
    {
      header: "Actions",
      render: (app) => (
        <CellOptions
          options={[
            {
              label: app.status === "Withdrawn" ? "Reapply" : "Withdraw",
              action: () => {
                if (app.status === "Withdrawn") {
                  update(
                    API_UPDATE_JOB_APPLICATION,
                    { body: { id: app.id, status: "Review" } },
                    TAGS.applicants,
                  );
                } else {
                  setAppToEdit(app);
                }
              },
              icon: <KeyboardReturn className="group-hover:text-amber-600" />,
            },
            {
              label: "Delete",
              action: () => setAppToDelete(app),
              icon: <Delete className="group-hover:text-red-600" />,
            },
          ]}
        />
      ),
    },
  ];

  return (
    <div className="body-container m-0">
      <DeleteConfirmationDialog
        open={!!appToDelete}
        title="Confirm Deletion"
        loading={deleteLoading}
        message={`Are you sure you want to delete this Application? This action cannot be undone.`}
        onDelete={onDelete}
        onClose={onDeleteCancel}
      />
      <DeleteConfirmationDialog
        open={!!appToEdit}
        title="Confirm Withdrawing"
        loading={isLoading}
        message={`Are you sure you want to Withdraw this Application?`}
        onDelete={onWithdrawing}
        color="warning"
        buttonText="Yes Withdraw"
        onClose={onEditCancel}
      />
      <DataTable
        data={applications}
        total={0}
        // options={options}
        columns={columns}
      />
    </div>
  );
};

export default ApplicationsResult;
