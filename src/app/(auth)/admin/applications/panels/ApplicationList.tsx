"use client";
import {
  API_GET_COMPANIES,
  API_GET_JOBS,
  JOB_APPLICATIONS,
} from "@/api/employer";
import { FormField } from "@/components/form/FormModal/FormField/FormField";
import DataTable from "@/components/UI/data-table";
import FilterDrawer from "@/components/UI/FilterDrawer";
import { employerFilters } from "@/constants";
import useFetch from "@/hooks/useFetch";
import { ColumnConfig, Company, FieldConfig, JobData } from "@/types";
import { ExpandMore } from "@mui/icons-material";
import {
  TextField,
  Button,
  MenuItem,
  Tabs,
  Tab,
  Menu,
  IconButton,
} from "@mui/material";
import { Download, Eye, Filter, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, useMemo, useEffect } from "react";

interface ApplicationsFilter {
  jobId?: string;
  seekerId?: string;
  companyId?: string;
  startDate?: string;
  status?: string;
  q?: string;
  page?: number;
  limit?: number;
}

const tabs = [
  "New applications",
  "Active applications",
  "Inactive applications",
];
enum ApplicationStatus {
  REVIEW = "Review",
  VIEWED = "Viewed",
  SHORTLISTED = "Shortlisted",
  INTERVIEWED = "Interviewed",
  ACCEPTED = "Accepted",
  REJECTED = "Rejected",
  WITHDRAWN = "Withdrawn",
}

const ApplicationList: React.FC = () => {
  const [selectedItems, setSelectedItems] = useState<(number | string)[]>([]);
  const [exportAnchorEl, setExportAnchorEl] = useState<null | HTMLElement>(
    null,
  );
  const exportOpen = Boolean(exportAnchorEl);
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const searchParams = useSearchParams();

  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");

  // Initialize filters with pagination
  const [filters, setFilters] = useState<ApplicationsFilter>({
    jobId: "",
    seekerId: "",
    companyId: "",
    startDate: "",
    status: "",
    q: "",
    page: page,
    limit: limit,
  });

  const { data: jobs } = useFetch<PaginatedResponse<JobData>>(API_GET_JOBS);
  const { data: companies } =
    useFetch<PaginatedResponse<Company>>(API_GET_COMPANIES);
  // Helper function to remove empty filter values
  const cleanFilters = (filters: ApplicationsFilter) => {
    const cleaned: any = { ...filters };

    // Convert array of statuses to comma-separated string if needed
    if (Array.isArray(cleaned.status)) {
      cleaned.status = cleaned.status.join(",");
    }

    // Remove empty values
    for (const key in cleaned) {
      if (cleaned[key] === "" || cleaned[key] === undefined) {
        delete cleaned[key];
      }
    }

    return cleaned;
  };
  // Fetch data with filters
  const { data: applications, refetch } = useFetch<
    PaginatedResponse<ApplicationsType>
  >(
    `${JOB_APPLICATIONS}?${new URLSearchParams(cleanFilters(filters) as any).toString()}`,
  );
  useEffect(() => {
    refetch();
  }, [filters, refetch]);
  // Handle search input
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setFilters((prev) => ({
      ...prev,
      q: value,
      page: 1, // Reset to first page when searching
    }));
  };

  // Handle tab changes
  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
    let statusFilter = "";

    switch (newValue) {
      case "New applications":
        statusFilter = ApplicationStatus.REVIEW;
        break;
      case "Active applications":
        statusFilter = [
          ApplicationStatus.SHORTLISTED,
          ApplicationStatus.INTERVIEWED,
          ApplicationStatus.ACCEPTED,
        ].join(",");
        break;
      case "Inactive applications":
        statusFilter = [
          ApplicationStatus.REJECTED,
          ApplicationStatus.WITHDRAWN,
        ].join(",");
        break;
    }

    setFilters((prev) => ({
      ...prev,
      status: statusFilter,
      page: 1,
    }));
  };

  // Handle filter changes
  const handleFilterChange = (newFilters: Partial<ApplicationsFilter>) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
      page: 1, // Reset to first page when filters change
    }));
  };

  // Handle pagination
  const handlePageChange = (newPage: number) => {
    setFilters((prev) => ({
      ...prev,
      page: newPage + 1, // MUI uses 0-based index, API uses 1-based
    }));
  };

  const handleRowsPerPageChange = (newLimit: number) => {
    setFilters((prev) => ({
      ...prev,
      limit: newLimit,
      page: 1, // Reset to first page when changing page size
    }));
  };
  //handle export button
  const exportHandleClick = (event: any) => {
    setExportAnchorEl(event.currentTarget);
  };
  const exportHandleClose = () => {
    setExportAnchorEl(null);
  };

  const fields: FieldConfig<ApplicationsFilter>[] = [
    {
      name: "jobId",
      type: "select",
      textFieldProps: {
        placeholder: "Job Title",
        SelectProps: {
          multiple: false,
        },
      },
      options:
        jobs?.data.map((job) => ({
          value: job.id,
          label: job.title,
        })) || [],
    },
    {
      name: "seekerId",
      type: "text",
      textFieldProps: {
        placeholder: "Seeker Name or Email",
      },
    },
    {
      name: "companyId",
      type: "select",
      options:
        companies?.data.map((company) => ({
          value: company.id,
          label: company.name,
        })) || [],
    },
    {
      name: "startDate",
      type: "date",
      textFieldProps: {
        placeholder: "Application Date",
      },
    },
    {
      name: "status",
      type: "select",
      textFieldProps: {
        placeholder: "Status",
      },
      options: Object.values(ApplicationStatus).map((status) => ({
        label: status,
        value: status,
      })),
    },
  ];
  const columns: ColumnConfig<ApplicationsType>[] = [
    {
      header: "#",
      render: (_job, index) => <span>{index + 1}</span>,
    },
    {
      header: "Company",
      render: (app: ApplicationsType) => (
        <div className="flex items-center gap-2">
          <Image
            className="h-8 w-8 rounded-full object-cover"
            src={app.job.company.avatar || "/images/avatar-placeholder.png"}
            width={200}
            height={200}
            alt={app.job.company.name}
          />
          <Link
            className="text-sm transition hover:text-primary hover:underline"
            href={`/admin/employers/${app.job.company.username}`}
          >
            {app.job.company.name || "-"}
          </Link>
        </div>
      ),
    },
    {
      header: "Job Title",
      render: (app: ApplicationsType) => (
        <Link
          className="text-sm transition hover:text-primary hover:underline"
          href={`/admin/jobs/${app.job.id}`}
        >
          {app.job.title || "-"}
        </Link>
      ),
    },
    {
      header: "Seeker",
      render: (app: ApplicationsType) => (
        <div className="flex items-center gap-2">
          <Image
            className="h-8 w-8 rounded-full object-cover"
            src={app.applicant.avatar || "/images/avatar-placeholder.png"}
            width={200}
            height={200}
            alt={app.applicant.firstName}
          />
          <div className="flex flex-col">
            <Link
              className="text-sm transition hover:text-primary hover:underline"
              href={`/admin/seekers/${app.applicant.userName}`}
            >
              {`${app.applicant.firstName} ${app.applicant.lastName} ` || "-"}
            </Link>
            <Link
              className="text-xs text-blue-600 transition"
              href={`mailto:${app.applicant.userName}`}
            >
              {app.applicant.email || "-"}
            </Link>
          </div>
        </div>
      ),
    },
    {
      key: "created_at",
      header: "Date",
      render: (app: ApplicationsType) => {
        const formattedDate = new Date(app.created_at).toLocaleDateString(
          "en-US",
          {
            year: "numeric",
            month: "short",
            day: "numeric",
          },
        );

        return <span className="text-sm">{formattedDate || "-"}</span>;
      },
    },
    {
      key: "status",
      header: "Status",
      render: (job: ApplicationsType) => {
        const status = job.status;

        const statusStyles: Record<string, string> = {
          Review: "bg-yellow-100 text-yellow-800",
          Viewed: "bg-blue-100 text-blue-800",
          Shortlisted: "bg-purple-100 text-purple-800",
          Interviewed: "bg-indigo-100 text-indigo-800",
          Accepted: "bg-green-100 text-green-800",
          Rejected: "bg-red-100 text-red-800",
          Withdrawn: "bg-gray-200 text-gray-700",
        };

        return (
          <span
            className={`rounded-full px-2 py-1 text-xs font-medium ${
              statusStyles[status] || "bg-gray-100 text-gray-600"
            }`}
          >
            {status}
          </span>
        );
      },
    },
  ];

  return (
    <div>
      <div className="mt-3 !p-0">
        <div className="rounded-xl border bg-white p-4 shadow-soft">
          <div className="space-y-4">
            <div className="flex flex-col justify-between md:flex-row md:items-end">
              <div>
                <div className="mb-6 flex flex-col justify-between gap-2 md:flex-row md:items-center">
                  <h2 className="text-xl font-semibold">All Applications</h2>
                </div>
                <div className="body-container overflow-x-auto">
                  <Tabs
                    value={activeTab}
                    onChange={handleTabChange}
                    aria-label="basic tabs example"
                    variant="scrollable"
                    scrollButtons={false}
                    className="text-base"
                  >
                    {tabs.map((tab) => (
                      <Tab
                        key={tab}
                        className="text-nowrap text-xs"
                        label={tab}
                        value={tab}
                      />
                    ))}
                  </Tabs>
                </div>
              </div>
              <div className="m-2 flex flex-wrap items-end gap-2">
                <TextField
                  variant="outlined"
                  placeholder="Search For Applications"
                  value={searchQuery}
                  InputProps={{
                    startAdornment: <Search />,
                  }}
                  onChange={handleSearch}
                />
                <div className="relative">
                  <Button
                    onClick={exportHandleClick}
                    variant="outlined"
                    aria-controls={exportOpen ? "export-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={exportOpen ? "true" : undefined}
                    className="flex items-center gap-2"
                    endIcon={<ExpandMore className="h-5 w-5" />}
                  >
                    <Download className="h-5 w-5" />
                    <span className="text-sm">Export</span>
                  </Button>
                  <Menu
                    id="export-menu"
                    anchorEl={exportAnchorEl}
                    open={exportOpen}
                    // onClose={exportHandleClose}
                    MenuListProps={{
                      "aria-labelledby": "export-button",
                      className: "py-1 min-w-[120px]",
                    }}
                    PaperProps={{
                      className: "mt-1 shadow-lg",
                    }}
                  >
                    <MenuItem
                      onClick={() => {
                        exportHandleClose();
                      }}
                      className="px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      PDF
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        exportHandleClose();
                      }}
                      className="px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      Excel (CSV)
                    </MenuItem>
                  </Menu>
                </div>
              </div>
            </div>
            <div className="body-container flex flex-wrap gap-2 overflow-hidden overflow-x-auto rounded-base border border-gray-200 bg-white p-3 shadow-soft md:flex-nowrap">
              {fields.map((field) => (
                <div className="flex-1" key={field.name}>
                  <FormField
                    field={field}
                    data={filters}
                    setData={handleFilterChange}
                  />
                </div>
              ))}
              <IconButton
                onClick={() => setIsFilterOpen(true)}
                className="h-[42px] w-[42px] rounded-base border border-solid border-zinc-400 p-2 text-primary hover:border-primary"
              >
                <Filter className="h-4 w-4" />
              </IconButton>
              <FilterDrawer
                isOpen={isFilterOpen}
                onClose={() => setIsFilterOpen(false)}
                sections={employerFilters}
              />
            </div>
            <div>
              <DataTable<ApplicationsType>
                data={applications?.data || []}
                isSelectable
                columns={columns}
                total={applications?.total}
                selected={selectedItems}
                setSelected={setSelectedItems}
                // pagination={{
                //   page: (filters.page || 1) - 1, // Convert to 0-based index
                //   rowsPerPage: filters.limit || 10,
                //   count: applications?.total || 0,
                //   onChangePage: (_, newPage) => handlePageChange(newPage),
                //   onChangeRowsPerPage: (e) =>
                //     handleRowsPerPageChange(parseInt(e.target.value, 10)),
                // }}
                options={[
                  {
                    label: "View Profile",
                    action: () => console.log("viewed profile"),
                    icon: <Eye size={15} />,
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationList;
