"use client";
import Avatar from "@/components/UI/Avatar";
import DataTable from "@/components/UI/data-table";
import { Delete, Edit } from "@mui/icons-material";
import { Chip } from "@mui/material";

interface Application {
  id: number;
  companyName: string;
  companyLogo: string;
  role: string;
  dateApplied: string;
  status:
    | "Review"
    | "Viewed"
    | "Shortlisted"
    | "Interviewed"
    | "Accepted"
    | "Rejected";
}

const STATUS_COLORS = {
  Review: { text: "#FFB800", bg: "#FFF5DD" },
  Viewed: { text: "#00B8D9", bg: "#E6FCFF" },
  Shortlisted: { text: "#6554C0", bg: "#EAE6FF" },
  Interviewed: { text: "#9747FF", bg: "#F3E8FF" },
  Accepted: { text: "#36B37E", bg: "#E3FCEF" },
  Rejected: { text: "#FF5630", bg: "#FFE9E5" },
};

const applications: Application[] = [
  {
    id: 1,
    companyName: "Nomad",
    companyLogo: "N",
    role: "Medical Assistant",
    dateApplied: "24 July 2021",
    status: "Review",
  },
  {
    id: 2,
    companyName: "Udacity",
    companyLogo: "U",
    role: "Medical Assistant",
    dateApplied: "20 July 2021",
    status: "Viewed",
  },
  {
    id: 3,
    companyName: "Packer",
    companyLogo: "P",
    role: "Medical Assistant",
    dateApplied: "16 July 2021",
    status: "Shortlisted",
  },
  {
    id: 4,
    companyName: "Divvy",
    companyLogo: "D",
    role: "Medical Assistant",
    dateApplied: "14 July 2021",
    status: "Interviewed",
  },
  {
    id: 5,
    companyName: "DigitalOcean",
    companyLogo: "D",
    role: "Medical Assistant",
    dateApplied: "10 July 2021",
    status: "Accepted",
  },
  {
    id: 6,
    companyName: "DigitalOcean",
    companyLogo: "D",
    role: "Medical Assistant",
    dateApplied: "10 July 2021",
    status: "Rejected",
  },
];

const ApplicationsResult = () => {
  const onEdit = (application: Application) => {
    console.log("Edit application:", application);
  };

  const onDelete = (application: Application) => {
    console.log("Delete application:", application);
  };

  return (
    <div className="max-w-[calc(100vw-1rem)]">
      <DataTable
        data={applications}
        total={applications.length}
        options={[
          {
            label: "Edit Application",
            action: onEdit,
            icon: <Edit className="group-hover:text-yellow-600" />,
          },
          {
            label: "Delete Application",
            action: onDelete,
            icon: <Delete className="group-hover:text-red-600" />,
          },
        ]}
        columns={[
          {
            key: "companyName",
            header: "Company Name",
            sortable: true,
            render: (app) => (
              <div className="flex w-fit items-center gap-2">
                <Avatar size={40} src={app.companyLogo} />
                {app.companyName}
              </div>
            ),
          },
          {
            key: "role",
            header: "Candidates",
            sortable: true,
          },
          {
            key: "dateApplied",
            header: "Last Modified",
            sortable: true,
            render: (app) => new Date(app.dateApplied).toLocaleDateString(),
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
        ]}
      />
    </div>
  );
};

export default ApplicationsResult;
