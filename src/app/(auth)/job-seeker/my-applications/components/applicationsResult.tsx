"use client";
import DataTable from "@/components/UI/data-table";
import { ColumnConfig } from "@/types";
import { formatDate } from "@/util";
import { Delete, KeyboardReturn } from "@mui/icons-material";
import { Chip } from "@mui/material";
import Link from "next/link";

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
  const onEdit = (application: ApplicationsType) => {
    console.log("Edit application:", application);
  };

  const onDelete = (application: ApplicationsType) => {
    console.log("Delete application:", application);
  };

  const options = [
    {
      label: "Withdraw",
      action: onEdit,
      icon: <KeyboardReturn className="group-hover:text-yellow-600" />,
    },
    {
      label: "Delete",
      action: onDelete,
      icon: <Delete className="group-hover:text-red-600" />,
    },
  ];
  return (
    <div className="max-w-[calc(100vw-1rem)]">
      <DataTable
        data={applications}
        total={0}
        options={options}
        columns={columns}
      />
    </div>
  );
};

const columns: ColumnConfig<ApplicationsType>[] = [
  // {
  //   //TODO: replace with company name and logo and link
  //   key: "applicant.firstName",
  //   header: "Company Name",
  //   sortable: true,
  //   render: (app) => (
  //     <div className="flex w-fit items-center gap-2">
  //       <Avatar size={40} src={app.applicant.avatar} />
  //       {app.applicant.firstName}
  //     </div>
  //   ),
  // },
  {
    //TODO: replace with company name and logo and link
    key: "job.title",
    header: "Job",
    sortable: true,
    render: (app) => (
      <Link className="hover:underline" href={`/job/${app.job.id}`}>
        {app.job.title}
      </Link>
    ),
  },
  {
    // replace with job specialty
    key: "applicant.specialty",
    header: "Role",
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
      <Chip
        label={app.status}
        sx={{
          color: STATUS_COLORS[app.status].text,
          bgcolor: STATUS_COLORS[app.status].bg,
          border: "none",
          borderRadius: "16px",
          "& .MuiChip-label": { px: 2 },
        }}
      />
    ),
  },
];
export default ApplicationsResult;
