"use client";

import { API_GET_JOB_BY_ID, JOB_APPLICATIONS } from "@/api/employer";
import NotFoundPage from "@/app/not-found";
import GenericChart from "@/components/charts/GenericChart";
import DataTable from "@/components/UI/data-table";
import FilterDrawer from "@/components/UI/FilterDrawer";
import useFetch from "@/hooks/useFetch";
import { ColumnConfig, JobData } from "@/types";
import {
  Eye,
  ListOrdered,
  SquarePen,
  View,
  UsersRound,
  Download,
  Filter,
  Search,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useMemo } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Menu,
  IconButton,
  Select,
  Typography,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import Flag from "@/components/UI/flagitem";

interface SingleUserProps {
  params: {
    slug: string;
  };
}
type TopCountry = {
  id: string;
  code: string;
  name: string;
  job: number;
  employers: number;
  revenue: string;
};
interface JobFilter {
  searchQuery: string;
  location: string;
  category: string;
  specialty: string;
  educationDate: string;
  status: string;
}

const topCountriesData: TopCountry[] = [
  {
    id: "1",
    code: "EG",
    name: "Egypt",
    job: 18,
    employers: 35,
    revenue: "75k",
  },
  {
    id: "2",
    code: "US",
    name: "United States",
    job: 120,
    employers: 250,
    revenue: "1.2M",
  },
  {
    id: "3",
    code: "IN",
    name: "India",
    job: 95,
    employers: 180,
    revenue: "850k",
  },
  {
    id: "4",
    code: "DE",
    name: "Germany",
    job: 45,
    employers: 90,
    revenue: "500k",
  },
  {
    id: "5",
    code: "JP",
    name: "Japan",
    job: 60,
    employers: 110,
    revenue: "700k",
  },
  {
    id: "6",
    code: "AU",
    name: "Australia",
    job: 30,
    employers: 65,
    revenue: "400k",
  },
];

const SingleJobOverview = ({ params }: SingleUserProps) => {
  const slug = params.slug;
  const { data: job, loading } = useFetch<JobData>(
    `${API_GET_JOB_BY_ID}${slug}`,
  );
  const { data: applications } = useFetch<PaginatedResponse<ApplicationsType>>(
    `${JOB_APPLICATIONS}?jobId=${job?.id}`,
  );

  const [selectedItems, setSelectedItems] = useState<(number | string)[]>([]);
  const [activeTab, setActiveTab] = useState("job-overview");
  const [filters, setFilters] = useState<JobFilter>({
    searchQuery: "",
    location: "",
    category: "",
    specialty: "",
    educationDate: "",
    status: "",
  });
  const [exportAnchorEl, setExportAnchorEl] = useState<null | HTMLElement>(
    null,
  );
  const exportOpen = Boolean(exportAnchorEl);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const openFilter = () => setIsFilterOpen(true);
  const closeFilter = () => setIsFilterOpen(false);

  const exportHandleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setExportAnchorEl(event.currentTarget);
  };

  const exportHandleClose = () => {
    setExportAnchorEl(null);
  };
  console.log(applications);

  // Filter applications based on filters
  const filteredApplications = useMemo(() => {
    if (!applications?.data) return [];

    return applications.data.filter((app) => {
      // Search query filter
      const matchesSearch = filters.searchQuery
        ? app.applicant.firstName
            .toLowerCase()
            .includes(filters.searchQuery.toLowerCase()) ||
          app.applicant.lastName
            .toLowerCase()
            .includes(filters.searchQuery.toLowerCase()) ||
          app.applicant.email
            .toLowerCase()
            .includes(filters.searchQuery.toLowerCase())
        : true;

      // Location filter
      const matchesLocation = filters.location
        ? app.applicant.country?.name === filters.location
        : true;

      // Category filter
      const matchesCategory = filters.category
        ? app.applicant.category === filters.category
        : true;

      // Specialty filter
      const matchesSpecialty = filters.specialty
        ? app.applicant.specialty === filters.specialty
        : true;

      // Status filter (you might need to adjust based on your data structure)
      const matchesStatus = filters.status
        ? app.status === filters.status
        : true;

      return (
        matchesSearch &&
        matchesLocation &&
        matchesCategory &&
        matchesSpecialty &&
        matchesStatus
      );
    });
  }, [applications, filters]);

  // Extract unique values for filters
  const locations = useMemo(() => {
    const uniqueLocations = new Set<string>();
    applications?.data.forEach((app) => {
      if (app.applicant.country?.name) {
        uniqueLocations.add(app.applicant.country.name);
      }
    });
    return Array.from(uniqueLocations);
  }, [applications]);

  const categories = useMemo(() => {
    const uniqueCategories = new Set<string>();
    applications?.data.forEach((app) => {
      if (app.applicant.category) {
        uniqueCategories.add(app.applicant.category);
      }
    });
    return Array.from(uniqueCategories);
  }, [applications]);

  const specialties = useMemo(() => {
    const uniqueSpecialties = new Set<string>();
    applications?.data.forEach((app) => {
      if (app.applicant.specialty) {
        uniqueSpecialties.add(app.applicant.specialty);
      }
    });
    return Array.from(uniqueSpecialties);
  }, [applications]);

  const statuses = useMemo(() => {
    const uniqueStatuses = new Set<string>();
    applications?.data.forEach((app) => {
      if (app.status) {
        uniqueStatuses.add(app.status);
      }
    });
    return Array.from(uniqueStatuses);
  }, [applications]);

  const columns: ColumnConfig<ApplicationsType>[] = [
    {
      header: "#",
      render: (_job, index) => <span>{index + 1}</span>,
    },
    {
      header: "Full Name",
      render: (app) => (
        <div className="flex items-center gap-2">
          <Image
            className="h-8 w-8 rounded-full object-cover"
            src={app.applicant.avatar ?? "/images/avatar-placeholder.png"}
            width={200}
            height={200}
            alt={app.applicant.firstName}
          />
          <div>
            <Link
              className="hover:underline"
              href={`/admin/users/${app.applicant.id}`}
            >
              <div className="">
                <span className="text-sm">{app.applicant.firstName} </span>
                <span className="text-sm">{app.applicant.lastName}</span>
              </div>
            </Link>
            <p className="text-xs text-blue-700">{app.applicant.email}</p>
          </div>
        </div>
      ),
    },
    {
      header: "Applied Date",
      render: (app) => {
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
      header: "Phone",
      render: (app) => (
        <span className="text-sm">{app.applicant.phone || "-"}</span>
      ),
    },
    {
      header: "Country",
      render: (app) => (
        <span className="text-sm">{app.applicant.country?.name || "-"}</span>
      ),
    },
    {
      header: "Category",
      render: (app) => (
        <span className="text-sm">{app.applicant.category || "-"}</span>
      ),
    },
    {
      header: "Specialty",
      render: (app) => (
        <span className="text-sm">{app.applicant.specialty || "-"}</span>
      ),
    },
    {
      header: "Career Level",
      render: (app) => (
        <span className="text-sm">{app.applicant.careerLevel || "-"}</span>
      ),
    },
    {
      header: "Education",
      render: (app) => (
        <span className="text-sm">
          {app.applicant.lastEducation?.degree || "-"}
        </span>
      ),
    },
    {
      header: "Experience",
      render: (app) => (
        <span className="text-sm">
          {app.applicant.yearsOfExperience?.totalYears || "-"}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (app) => {
        const getStatusStyle = (status: string) => {
          switch (status) {
            case "Review":
              return "bg-yellow-100 text-yellow-800";
            case "Viewed":
              return "bg-blue-100 text-blue-800";
            case "Shortlisted":
              return "bg-purple-100 text-purple-800";
            case "Interviewed":
              return "bg-indigo-100 text-indigo-800";
            case "Accepted":
              return "bg-green-100 text-green-800";
            case "Rejected":
              return "bg-red-100 text-red-800";
            case "Withdrawn":
              return "bg-gray-200 text-gray-700";
            default:
              return "bg-gray-100 text-gray-500";
          }
        };

        const status = app.status || "-";
        const badgeStyle = getStatusStyle(status);

        return (
          <span
            className={`rounded-full px-2 py-1 text-xs font-medium ${badgeStyle}`}
          >
            {status}
          </span>
        );
      },
    },
  ];

  if (!job) return <NotFoundPage />;

  return (
    <div className="p-4">
      {/* Tab Buttons */}
      <div className="mb-4 flex flex-wrap gap-2">
        <button
          onClick={() => setActiveTab("job-overview")}
          className={`flex items-center gap-1 rounded-lg px-4 py-2 text-sm transition ${
            activeTab === "job-overview"
              ? "bg-primary text-white"
              : "text-secondary"
          }`}
        >
          <View size={15} />
          Job Overview
        </button>
        <button
          onClick={() => setActiveTab("applicant-list")}
          className={`flex items-center gap-1 rounded-lg px-4 py-2 text-sm transition ${
            activeTab === "applicant-list"
              ? "bg-primary text-white"
              : "text-secondary"
          }`}
        >
          <ListOrdered size={15} />
          Applicant List
        </button>
      </div>

      <div className="mb-4 rounded-lg border bg-white p-4 shadow-soft">
        <h1 className="mb-4 text-2xl font-bold">{job.title}</h1>
        <div className="relative flex justify-between">
          {/* Student Details */}
          <div className="flex w-full flex-col items-center gap-6 lg:flex-row">
            <Image
              className="h-[250px] max-w-[250px] rounded-xl object-cover lg:h-[120px] lg:w-[150px]"
              src={job.company?.avatar ?? "/images/avatar-placeholder.png"}
              alt="Seeker image"
              width={300}
              height={300}
            />
            <div className="flex-1">
              <div className="mb-4 flex flex-col items-center justify-between gap-3 lg:flex-row">
                <div>
                  <div className="flex flex-col items-center gap-3 lg:flex-row">
                    <h1 className="max-w-[400px] text-lg font-bold">
                      {job.company?.name}
                    </h1>
                    {/* {Seeker?.isVerified && (
                    <span className="rounded-full bg-primary px-2 py-1 text-xs capitalize text-white">
                      {Seeker.type}
                    </span>
                  )} */}
                  </div>
                  <div>
                    <span className="text-sm text-secondary">
                      {job.country?.name}
                    </span>
                  </div>
                </div>
                <div className="flex h-full items-start justify-end gap-3">
                  <Link
                    className="flex w-fit items-center gap-1 rounded-lg border bg-white p-3 text-sm"
                    href={"#"}
                  >
                    <SquarePen size={12} />
                    Edit
                  </Link>
                  <Link
                    className="flex w-fit items-center gap-1 rounded-lg border bg-white p-3 text-sm"
                    href={`/admin/students/profile/${job.id}`}
                  >
                    <Eye size={12} />
                    View Applicants
                  </Link>
                </div>
              </div>
              <div className="flex flex-col gap-5 sm:flex-row">
                {/* location info  */}
                {job.country && (
                  <div className="flex flex-col text-center md:text-start">
                    <span className="text-sm text-secondary">Location</span>
                    <span className="text-sm font-semibold text-main">
                      {job.city}
                    </span>
                  </div>
                )}

                {job.jobIndustry && (
                  <div className="flex flex-col text-center md:text-start">
                    <span className="text-sm text-secondary">Industry</span>
                    <span className="text-sm font-semibold text-main">
                      {job.jobIndustry}
                    </span>
                  </div>
                )}
                {job.jobCategory && (
                  <div className="flex flex-col text-center md:text-start">
                    <span className="text-sm text-secondary">Category</span>
                    <span className="text-sm font-semibold text-main">
                      {job.jobCategory}
                    </span>
                  </div>
                )}
                {job.created_at && (
                  <div className="flex flex-col text-center md:text-start">
                    <span className="text-sm text-secondary">
                      Submission Date
                    </span>
                    <span className="text-sm font-semibold text-main">
                      {new Date(job.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div>
          {/* job overview */}
          {activeTab === "job-overview" && (
            <div>
              <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="flex items-center gap-4 rounded-lg border bg-white p-4 shadow-soft">
                  <div className="flex h-16 w-16 items-center justify-center rounded-md bg-[#F3E8FF] text-[#AD46FF]">
                    <Eye size={20} />
                  </div>
                  <div>
                    <span className="block text-sm">Total Job Views</span>
                    <h1 className="font-bold">%75</h1>
                    <span className="block text-xs text-primary">
                      +15% from last month
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4 rounded-lg border bg-white p-4 shadow-soft">
                  <div className="flex h-16 w-16 items-center justify-center rounded-md bg-[#E4F8FFE5] text-[#55BEE6]">
                    <UsersRound size={20} />
                  </div>
                  <div>
                    <span className="block text-sm">Total Applicants</span>
                    <h1 className="font-bold">1,245</h1>
                    <span className="block text-xs text-primary">
                      +12% from last month
                    </span>
                  </div>
                </div>
              </div>
              <div className="mb-4 grid grid-cols-1 gap-4 lg:grid-cols-10">
                <div className="col-span-1 rounded-xl border bg-white p-4 shadow-soft lg:col-span-6">
                  <GenericChart
                    chartTitle="Job Post Chart"
                    data={{
                      yearly: {
                        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                        series: [
                          {
                            name: "Visitors",
                            data: [100, 120, 90, 140, 110, 130],
                            color: "#2BA149",
                          },
                          {
                            name: "Applicants",
                            data: [200, 240, 180, 280, 220, 260],
                            color: "#6366F1",
                          },
                        ],
                      },
                      monthly: {
                        categories: ["Week 1", "Week 2", "Week 3", "Week 4"],
                        series: [
                          {
                            name: "Visitors",
                            data: [30, 40, 35, 45],
                            color: "#2BA149",
                          },
                          {
                            name: "Applicants",
                            data: [60, 80, 70, 90],
                            color: "#6366F1",
                          },
                        ],
                      },
                      weekly: {
                        categories: [
                          "Mon",
                          "Tue",
                          "Wed",
                          "Thu",
                          "Fri",
                          "Sat",
                          "Sun",
                        ],
                        series: [
                          {
                            name: "Visitors",
                            data: [10, 15, 12, 18, 14, 8, 5],
                            color: "#2BA149",
                          },
                          {
                            name: "Applicants",
                            data: [20, 30, 25, 35, 28, 15, 10],
                            color: "#6366F1",
                          },
                        ],
                      },
                    }}
                    cards={[
                      { title: "Visitors", value: "1,240", color: "#2BA149" },
                      { title: "Applicants", value: "2,480", color: "#6366F1" },
                    ]}
                  />
                </div>
                <div className="col-span-1 overflow-hidden rounded-xl border bg-white shadow-soft lg:col-span-4">
                  <div className="mb-3 flex justify-between gap-8 p-3">
                    <Typography>
                      Top Countries
                      <span className="ml-1 text-xs text-secondary">
                        (Revenue)
                      </span>
                    </Typography>
                  </div>
                  <div className="max-w-[calc(100vw-1rem)]">
                    <DataTable
                      data={topCountriesData}
                      total={topCountriesData.length}
                      cellClassName="p-2 text-xs"
                      className="border-none shadow-none"
                      // searchQuery={query}
                      columns={[
                        {
                          key: "id",
                          header: "Rank",
                          sortable: true,
                          render: (item) => (
                            <div className="pl-2 text-xs">#{item.id}</div>
                          ),
                        },
                        {
                          key: "name",
                          header: "Country",
                          sortable: true,
                          render: (item) => (
                            <div className="flex">
                              <Flag {...item} />{" "}
                              <span className="ml-2 text-xs">{item.name}</span>
                            </div>
                          ),
                        },
                        {
                          key: "employers",
                          header: "Employers",
                          sortable: true,
                        },
                        {
                          key: "job",
                          header: "Jobs",
                          sortable: true,
                        },
                        {
                          key: "revenue",
                          header: "Revenue",
                          sortable: true,
                        },
                      ]}
                    />
                  </div>
                </div>
              </div>
              {loading ? (
                <p>Loading...</p>
              ) : (
                <DataTable<ApplicationsType>
                  data={applications?.data || []}
                  isSelectable
                  columns={columns}
                  selected={selectedItems}
                  setSelected={setSelectedItems}
                />
              )}
            </div>
          )}
          {/* applicant list Panel */}
          {activeTab === "applicant-list" && (
            <div className="rounded-xl border bg-white p-4 shadow-sm">
              <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <h2 className="text-xl font-semibold">
                  Total Job Applications
                </h2>

                <div className="flex items-center gap-2">
                  <TextField
                    variant="outlined"
                    placeholder="Search applications..."
                    value={filters.searchQuery}
                    InputProps={{
                      startAdornment: <Search />,
                    }}
                    onChange={(e) =>
                      setFilters({ ...filters, searchQuery: e.target.value })
                    }
                    className="w-full md:w-80"
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

              {/* Filters Row */}
              <div className="mb-6 flex flex-wrap items-end gap-2 overflow-x-auto rounded-base border border-gray-200 bg-white p-3 shadow-soft md:flex-nowrap">
                <div className="flex-1">
                  <Select
                    value={filters.location}
                    onChange={(e) =>
                      setFilters({
                        ...filters,
                        location: e.target.value as string,
                      })
                    }
                    displayEmpty
                    fullWidth
                    className="h-[42px]"
                  >
                    <MenuItem value="">All Locations</MenuItem>
                    {locations.map((location) => (
                      <MenuItem key={location} value={location}>
                        {location}
                      </MenuItem>
                    ))}
                  </Select>
                </div>

                <div className="flex-1">
                  <Select
                    value={filters.category}
                    onChange={(e) =>
                      setFilters({
                        ...filters,
                        category: e.target.value as string,
                      })
                    }
                    displayEmpty
                    fullWidth
                    className="h-[42px]"
                  >
                    <MenuItem value="">All Categories</MenuItem>
                    {categories.map((category) => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                  </Select>
                </div>

                <div className="flex-1">
                  <Select
                    value={filters.specialty}
                    onChange={(e) =>
                      setFilters({
                        ...filters,
                        specialty: e.target.value as string,
                      })
                    }
                    displayEmpty
                    fullWidth
                    className="h-[42px]"
                  >
                    <MenuItem value="">All Specialties</MenuItem>
                    {specialties.map((specialty) => (
                      <MenuItem key={specialty} value={specialty}>
                        {specialty}
                      </MenuItem>
                    ))}
                  </Select>
                </div>

                <div className="flex-1">
                  <Select
                    value={filters.status}
                    onChange={(e) =>
                      setFilters({
                        ...filters,
                        status: e.target.value as string,
                      })
                    }
                    displayEmpty
                    fullWidth
                    className="h-[42px]"
                  >
                    <MenuItem value="">All Statuses</MenuItem>
                    {statuses.map((status) => (
                      <MenuItem key={status} value={status}>
                        {status}
                      </MenuItem>
                    ))}
                  </Select>
                </div>

                <IconButton
                  onClick={openFilter}
                  className="h-[42px] w-[42px] rounded-base border border-solid border-zinc-400 p-2 text-primary hover:border-primary"
                >
                  <Filter className="h-4 w-4" />
                </IconButton>
              </div>

              {loading ? (
                <p>Loading...</p>
              ) : (
                <DataTable<ApplicationsType>
                  data={filteredApplications}
                  columns={columns}
                  searchQuery={filters.searchQuery}
                  selected={selectedItems}
                  setSelected={setSelectedItems}
                  isSelectable
                  noDataMessage={{
                    title: "No applications found",
                    description: "Try adjusting your filters",
                    action: {
                      label: "Clear Filters",
                      href: "#",
                    },
                  }}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default SingleJobOverview;
