"use client";

import {
  API_GET_COMPANY_SECTORS,
  API_GET_COMPANY_TYPES_BY_SECTOR,
  API_GET_INDUSTRIES,
} from "@/api/admin";
import { API_GET_JOBS } from "@/api/employer";
import { CheckboxField } from "@/components/form/FormModal/FormField/CheckboxField";
import { FormField } from "@/components/form/FormModal/FormField/FormField";
import DataTable from "@/components/UI/data-table";
import FilterDrawer from "@/components/UI/FilterDrawer";
import { employerFilters } from "@/constants";
import useFetch from "@/hooks/useFetch";
import { useLocationData } from "@/hooks/useLocationData";
import { ColumnConfig, FieldConfig, JobData, Sector } from "@/types";
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
import Link from "next/link";
import { useState, useMemo } from "react";

interface JobFilter {
  country: string;
  industry: string;
  category: string;
  employer: string;
  status: string;
  date: string;
}

const tabs = ["New Jobs", "Active Employers", "Inactive Employers"];

const JobList: React.FC = () => {
  const [selectedItems, setSelectedItems] = useState<(number | string)[]>([]);
  const [exportAnchorEl, setExportAnchorEl] = useState<null | HTMLElement>(
    null,
  );
  const exportOpen = Boolean(exportAnchorEl);
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<JobFilter>({
    country: "",
    industry: "",
    category: "",
    employer: "",
    status: "",
    date: "",
  });
  const { countries } = useLocationData();

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const openFilter = () => setIsFilterOpen(true);
  const closeFilter = () => setIsFilterOpen(false);

  const exportHandleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setExportAnchorEl(event.currentTarget);
  };

  const exportHandleClose = () => {
    setExportAnchorEl(null);
  };

  // Fetch data
  const { data: jobs, loading } =
    useFetch<PaginatedResponse<JobData>>(API_GET_JOBS);
  const { data: industries } =
    useFetch<PaginatedResponse<Sector>>(API_GET_INDUSTRIES);
  const { data: companyTypes } = useFetch<PaginatedResponse<Sector>>(
    filters.industry
      ? `${API_GET_COMPANY_TYPES_BY_SECTOR}${filters.industry}`
      : null,
    { fetchOnce: false, fetchOnUrlChange: true },
  );

  // Filter jobs based on search query and filters
  const filteredJobs = useMemo(() => {
    if (!jobs?.data) return [];

    return jobs.data.filter((job) => {
      // Search query filter
      const matchesSearch = searchQuery
        ? job.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.company?.name?.toLowerCase().includes(searchQuery.toLowerCase())
        : true;

      // Country filter
      const matchesCountry = filters.country
        ? job.country?.name === filters.country
        : true;

      // Industry filter
      const matchesIndustry = filters.industry
        ? job.jobIndustryId === filters.industry
        : true;

      // Company type filter
      const matchesCategoryType = filters.category
        ? job.jobCategory === filters.category
        : true;

      // Status filter
      const matchesStatus = filters.status
        ? (filters.status === "active" && job.active) ||
          (filters.status === "inActive" && !job.active)
        : true;

      // Date filter (simplified example)
      const matchesDate = filters.date
        ? new Date(job.created_at).toISOString().split("T")[0] === filters.date
        : true;

      return (
        matchesSearch &&
        matchesCountry &&
        matchesIndustry &&
        matchesCategoryType &&
        matchesStatus &&
        matchesDate
      );
    });
  }, [jobs, searchQuery, filters]);

  const fields: FieldConfig<JobFilter>[] = [
    {
      name: "country",
      type: "search-select",
      textFieldProps: {
        placeholder: "Country",
      },
      options:
        countries?.map((country) => ({
          value: country.isoCode,
          label: country.name,
        })) || [],
    },
    {
      name: "industry",
      type: "select",
      textFieldProps: {
        placeholder: "Industry",
      },
      options:
        industries?.data.map((sector) => ({
          value: sector.id,
          label: sector.name,
        })) || [],
      gridProps: { xs: 6 },
    },
    {
      name: "category",
      type: "select",
      textFieldProps: {
        placeholder: "Company Type",
      },
      dependsOn: "industry",
      options:
        companyTypes?.data.map((type) => ({
          value: type.id,
          label: type.name,
        })) || [],
      gridProps: { xs: 6 },
    },
    {
      name: "status",
      type: "select",
      textFieldProps: {
        placeholder: "Status",
      },
      options: [
        { value: "active", label: "Active" },
        { value: "inActive", label: "Inactive" },
      ],
    },
    {
      name: "date",
      type: "date",
      textFieldProps: {
        placeholder: "Date",
      },
    },
  ];

  const columns: ColumnConfig<JobData>[] = [
    {
      header: "#",
      render: (_job, index) => <span>{index + 1}</span>,
    },
    {
      key: "title",
      header: "Job Title",
      render: (job: JobData) => (
        <Link
          className="text-sm transition hover:text-primary hover:underline"
          href={`/admin/jobs/${job.id}`}
        >
          {job.title || "-"}
        </Link>
      ),
    },
    {
      key: "created_at",
      header: "Date",
      render: (job: JobData) => {
        const formattedDate = new Date(job.created_at).toLocaleDateString(
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
      key: "company",
      header: "Employer",
      render: (job: JobData) => (
        <Link
          href={`/co/${job.company?.username}`}
          className="text-sm transition hover:text-primary hover:underline"
        >
          {job.company?.name || "-"}
        </Link>
      ),
    },
    {
      key: "country",
      header: "Country",
      render: (job: JobData) => (
        <span className="text-sm">{job.country?.name || "-"}</span>
      ),
    },
    {
      header: "Views",
      render: () => <span className="text-sm">50</span>,
    },
    {
      key: "applicationCount",
      header: "Applicants",
      render: (job: JobData) => (
        <span className="text-sm">{job.applicationCount || "-"}</span>
      ),
    },
    {
      key: "active",
      header: "Status",
      render: (item) => (
        <CheckboxField
          field={{
            name: "status",
            type: "checkbox",
          }}
          controllerField={{
            value: item.active,
          }}
        />
      ),
    },
    {
      key: "state",
      header: "State",
      render: (job: JobData) => (
        <span
          className={`rounded-lg border px-3 py-1 text-xs font-semibold ${
            job.active
              ? "border-green-500 bg-green-50 text-green-700 ring-green-600/20"
              : "border-red-500 bg-red-50 text-red-700 ring-red-600/10"
          }`}
        >
          {job.active ? "Active" : "Inactive"}
        </span>
      ),
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
                  <h2 className="text-xl font-semibold">All Jobs</h2>
                </div>
                <div className="body-container overflow-x-auto">
                  <Tabs
                    value={activeTab}
                    onChange={(e, v) => setActiveTab(v)}
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
                  placeholder="Search For Jobs"
                  value={searchQuery}
                  InputProps={{
                    startAdornment: <Search />,
                  }}
                  onChange={(e) => setSearchQuery(e.target.value)}
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
                    onClose={exportHandleClose}
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
                    setData={setFilters}
                  />
                </div>
              ))}
              <IconButton
                onClick={openFilter}
                className="h-[42px] w-[42px] rounded-base border border-solid border-zinc-400 p-2 text-primary hover:border-primary"
              >
                <Filter className="h-4 w-4" />
              </IconButton>
              <FilterDrawer
                isOpen={isFilterOpen}
                onClose={closeFilter}
                sections={employerFilters}
              />
            </div>
            <div>
              <DataTable<JobData>
                data={filteredJobs}
                isSelectable
                searchQuery={searchQuery}
                columns={columns}
                selected={selectedItems}
                setSelected={setSelectedItems}
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

export default JobList;
