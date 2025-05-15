"use client";

import {
  API_GET_COMPANY_BY_ID,
  API_GET_COMPANY_BY_USER_NAME,
  API_GET_JOBS_BY_COMPANY_ID,
  API_UPDATE_COMPANY_USER_NAME,
} from "@/api/employer";
import NotFoundPage from "@/app/not-found";
import GenericChart from "@/components/charts/GenericChart";
import DataTable from "@/components/UI/data-table";
import useFetch from "@/hooks/useFetch";
import { ColumnConfig, JobData } from "@/types";
import { CompanyType } from "@/types/employer";
import {
  Eye,
  SquarePen,
  UsersRound,
  MapPin,
  GraduationCap,
  Clock,
  DollarSign,
  ChevronRight,
  Download,
  Filter,
  Search,
  LayoutList,
  User,
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
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import EditCompanyModal from "../../components/employers/EditCompanyModal";

interface SingleUserProps {
  params: {
    slug: string;
  };
}

interface JobFilter {
  searchQuery: string;
  location: string;
  category: string;
  specialty: string;
  status: string;
}
type CountryData = {
  id: string;
  jobs: string;
  views: number;
  applicants: number;
  views_percentage?: string;
  applicants_percentage?: string;
};
const countrydata: CountryData[] = [
  {
    id: "1",
    jobs: "Pharmacy Manager",
    views: 1500,
    applicants: 200,
    views_percentage: "30%",
    applicants_percentage: "25%",
  },
  {
    id: "2",
    jobs: "Pharmacy Manager",
    views: 1100,
    applicants: 180,
    views_percentage: "22%",
    applicants_percentage: "21%",
  },
  {
    id: "3",
    jobs: "Pharmacy Manager",
    views: 950,
    applicants: 140,
    views_percentage: "19%",
    applicants_percentage: "17%",
  },
  {
    id: "4",
    jobs: "Pharmacy Manager",
    views: 1300,
    applicants: 210,
    views_percentage: "26%",
    applicants_percentage: "23%",
  },
  {
    id: "5",
    jobs: "Pharmacy Manager",
    views: 1700,
    applicants: 250,
    views_percentage: "35%",
    applicants_percentage: "28%",
  },
  {
    id: "6",
    jobs: "Pharmacy Manager",
    views: 600,
    applicants: 80,
    views_percentage: "12%",
    applicants_percentage: "10%",
  },
  {
    id: "7",
    jobs: "Pharmacy Manager",
    views: 1800,
    applicants: 260,
    views_percentage: "37%",
    applicants_percentage: "30%",
  },
  {
    id: "8",
    jobs: "Pharmacy Manager",
    views: 700,
    applicants: 90,
    views_percentage: "14%",
    applicants_percentage: "12%",
  },
];

const SingleEmployerPage = ({ params }: SingleUserProps) => {
  const slug = params.slug;
  const { data: company } = useFetch<CompanyType>(
    `${API_GET_COMPANY_BY_USER_NAME}${slug}`,
  );
  const { data: jobs, loading } = useFetch<PaginatedResponse<JobData>>(
    `${API_GET_JOBS_BY_COMPANY_ID}${company?.id}`,
  );

  const [activeTab, setActiveTab] = useState("employer-overview");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSave = async (data: CompanyType) => {
    try {
      const response = await fetch(
        `${API_UPDATE_COMPANY_USER_NAME}/${company?.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to update company");
      }

      const result = await response.json();
      console.log("Company updated successfully:", result);
      // Optionally: show a toast or redirect
    } catch (error) {
      console.error("Error updating company:", error);
      // Optionally: show error UI
    }
  };

  const [filters, setFilters] = useState<JobFilter>({
    searchQuery: "",
    location: "",
    category: "",
    specialty: "",
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

  // Filter jobs based on filters
  const filteredJobs = useMemo(() => {
    if (!jobs?.data) return [];

    return jobs.data.filter((job) => {
      // Search query filter
      const matchesSearch = filters.searchQuery
        ? job.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
          job.jobIndustry
            ?.toLowerCase()
            .includes(filters.searchQuery.toLowerCase()) ||
          job.company?.name
            ?.toLowerCase()
            .includes(filters.searchQuery.toLowerCase())
        : true;

      // Location filter
      const matchesLocation = filters.location
        ? job.country?.name === filters.location
        : true;

      // Category filter
      const matchesCategory = filters.category
        ? job.jobCategory === filters.category
        : true;

      // Specialty filter
      const matchesSpecialty = filters.specialty
        ? job.jobSpeciality === filters.specialty
        : true;

      // Status filter
      const matchesStatus = filters.status
        ? (filters.status === "active" && job.active) ||
          (filters.status === "inactive" && !job.active)
        : true;

      return (
        matchesSearch &&
        matchesLocation &&
        matchesCategory &&
        matchesSpecialty &&
        matchesStatus
      );
    });
  }, [jobs, filters]);

  // Extract unique values for filters
  const locations = useMemo(() => {
    const uniqueLocations = new Set<string>();
    jobs?.data.forEach((job) => {
      if (job.country?.name) {
        uniqueLocations.add(job.country.name);
      }
    });
    return Array.from(uniqueLocations);
  }, [jobs]);

  const categories = useMemo(() => {
    const uniqueCategories = new Set<string>();
    jobs?.data.forEach((job) => {
      if (job.jobCategory) {
        uniqueCategories.add(job.jobCategory);
      }
    });
    return Array.from(uniqueCategories);
  }, [jobs]);

  const specialties = useMemo(() => {
    const uniqueSpecialties = new Set<string>();
    jobs?.data.forEach((job) => {
      if (job.jobSpeciality) {
        uniqueSpecialties.add(job.jobSpeciality);
      }
    });
    return Array.from(uniqueSpecialties);
  }, [jobs]);

  const columns: ColumnConfig<JobData>[] = [
    {
      header: "#",
      render: (_job, index) => <span>{index + 1}</span>,
    },
    {
      key: "title",
      header: "Job Title",
      render: (job) => (
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
      render: (job) => {
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
      key: "jobIndustry",
      header: "Industry",
      render: (job) => (
        <span className="text-sm">{job.jobIndustry || "-"}</span>
      ),
    },
    {
      key: "country",
      header: "Location",
      render: (job) => (
        <span className="text-sm">{job.country?.name || "-"}</span>
      ),
    },
    {
      header: "Views",
      render: () => <span className="text-sm">1233</span>,
    },
    {
      key: "applicationCount",
      header: "Applicants",
      render: (job) => (
        <span className="text-sm">{job.applicationCount || "-"}</span>
      ),
    },
    {
      key: "active",
      header: "Status",
      render: (job) => (
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

  if (!company) return <NotFoundPage />;

  return (
    <div className="p-4">
      {/* Tab Buttons */}
      <div className="mb-4 flex flex-wrap gap-2">
        <button
          onClick={() => setActiveTab("employer-overview")}
          className={`flex items-center gap-1 rounded-lg px-4 py-2 text-sm transition ${
            activeTab === "employer-overview"
              ? "bg-primary text-white"
              : "text-secondary"
          }`}
        >
          <User size={15} />
          Employer overview
        </button>
        <button
          onClick={() => setActiveTab("job-list")}
          className={`flex items-center gap-1 rounded-lg px-4 py-2 text-sm transition ${
            activeTab === "job-list"
              ? "bg-primary text-white"
              : "text-secondary"
          }`}
        >
          <LayoutList size={15} />
          Job List
        </button>
        <button
          onClick={() => setActiveTab("applicant-list")}
          className={`flex items-center gap-1 rounded-lg px-4 py-2 text-sm transition ${
            activeTab === "applicant-list"
              ? "bg-primary text-white"
              : "text-secondary"
          }`}
        >
          <LayoutList size={15} />
          Applicant List
        </button>
      </div>

      <div className="mb-4 rounded-lg border bg-white p-4 shadow-soft">
        <div className="relative flex justify-between">
          <div className="flex w-full flex-col items-center gap-6 lg:flex-row">
            <Image
              className="h-[250px] max-w-[250px] rounded-xl object-cover lg:h-[120px] lg:w-[150px]"
              src={company.avatar ?? "/images/avatar-placeholder.png"}
              alt="Seeker image"
              width={300}
              height={300}
            />
            <div className="flex-1">
              <div className="mb-4 flex flex-col items-center justify-between gap-3 lg:flex-row">
                <div>
                  <div className="flex flex-col items-center gap-3 lg:flex-row">
                    <h1 className="max-w-[400px] text-lg font-bold">
                      {company.name}
                    </h1>
                  </div>
                </div>
                <div className="flex h-full items-start justify-end gap-3">
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex w-fit items-center gap-1 rounded-lg border bg-white p-3 text-sm"
                  >
                    <SquarePen size={12} />
                    Edit
                  </button>
                  <Link
                    className="flex w-fit items-center gap-1 rounded-lg border bg-white p-3 text-sm"
                    href={``}
                  >
                    <Eye size={12} />
                    View Profile
                  </Link>
                  <EditCompanyModal
                    open={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    companyData={company}
                    onSave={handleSave}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-5 sm:flex-row">
                {company.city && (
                  <div className="flex flex-col text-center md:text-start">
                    <span className="text-sm text-secondary">Location</span>
                    <span className="text-sm font-semibold text-main">
                      {company.city}
                    </span>
                  </div>
                )}

                {company.companyTypeName && (
                  <div className="flex flex-col text-center md:text-start">
                    <span className="text-sm text-secondary">Type</span>
                    <span className="text-sm font-semibold text-main">
                      {company.companyTypeName}
                    </span>
                  </div>
                )}
                {company.created_at && (
                  <div className="flex flex-col text-center md:text-start">
                    <span className="text-sm text-secondary">
                      Submission Date
                    </span>
                    <span className="text-sm font-semibold text-main">
                      {new Date(company.created_at).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        },
                      )}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        {activeTab === "employer-overview" && (
          <div>
            <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
              <div className="flex items-center gap-4 rounded-lg border bg-white p-4 shadow-soft">
                <div className="flex h-16 w-16 items-center justify-center rounded-md bg-[#E4F8FFE5] text-[#55BEE6]">
                  <UsersRound size={20} />
                </div>
                <div>
                  <span className="block text-sm">Total jobs</span>
                  <h1 className="font-bold">1,245</h1>
                  <span className="block text-xs text-primary">
                    +12% from last month
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
              <div className="flex items-center gap-4 rounded-lg border bg-white p-4 shadow-soft">
                <div className="flex h-16 w-16 items-center justify-center rounded-md bg-[#DCFCE7] text-[#008236]">
                  <DollarSign size={20} />
                </div>
                <div>
                  <span className="block text-sm">Total Purchase</span>
                  <h1 className="font-bold">450</h1>
                  <span className="block text-xs text-primary">
                    +8% from last month
                  </span>
                </div>
              </div>
            </div>
            <div className="mb-4 grid grid-cols-1 gap-4 lg:grid-cols-10">
              <div className="col-span-1 lg:col-span-6">
                <div className="mb-4 rounded-xl border bg-white p-4 shadow-soft">
                  <GenericChart
                    chartTitle="Job Statistics Chart"
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
                <div className="rounded-xl border p-4 shadow-soft">
                  <div className="mb-4 flex flex-col justify-between gap-2 md:flex-row md:items-center">
                    <h2 className="text-xl font-semibold">Recent Jobs</h2>
                    <div className="flex items-center gap-3">
                      <button className="flex items-center text-sm text-primary hover:underline">
                        View All
                        <ChevronRight size={13} />
                      </button>
                    </div>
                  </div>
                  <div className="relative grid grid-cols-1 gap-3 md:grid-cols-2">
                    {jobs?.data && jobs.data.length > 0 ? (
                      jobs.data.map((job) => (
                        <div
                          className="rounded-xl border p-3 shadow-sm"
                          key={job.id}
                        >
                          <h2 className="mb-3 text-lg font-semibold">
                            {job.title}
                          </h2>

                          <div className="mb-4 flex gap-3">
                            <Image
                              className="h-14 w-14 rounded-lg"
                              src={
                                job.company?.avatar ||
                                "/images/avatar-placeholder.png"
                              }
                              alt={job.company?.name || "avatar"}
                              width={100}
                              height={100}
                            />
                            <div>
                              <p className="mb-1 flex items-center gap-2 text-xs text-secondary">
                                <MapPin
                                  className="text-light-primary"
                                  size={16}
                                />
                                Saudi Arabia, Geddah
                              </p>
                              <p className="flex items-center gap-2 text-xs text-secondary">
                                <GraduationCap
                                  className="text-light-primary"
                                  size={16}
                                />
                                Saudi Arabia, Geddah
                              </p>
                            </div>
                          </div>
                          <div className="mb-2 flex items-center gap-2">
                            <div className="flex items-center gap-1 text-xs text-secondary">
                              <span>&#9679;</span> EX (5-7)
                            </div>
                            <div className="flex items-center gap-1 text-xs text-secondary">
                              <span>&#9679;</span> Age (40-45)
                            </div>
                          </div>
                          <div className="mb-4 flex items-center justify-between gap-2">
                            <div className="flex items-center gap-1 text-xs text-red-600">
                              <span>&#9679;</span>
                              <span className="rounded-full bg-red-100 px-2 py-1 text-xs text-red-600">
                                Urgently hiring
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-secondary">
                              <Clock className="text-light-primary" size={15} />{" "}
                              2 h
                            </div>
                          </div>

                          <div className="mb-2 flex flex-wrap items-center gap-3">
                            <Link
                              className="text-xs text-light-primary underline"
                              href="#"
                            >
                              #Healthcare
                            </Link>
                            <Link
                              className="text-xs text-light-primary underline"
                              href="#"
                            >
                              #Healthcare
                            </Link>
                            <Link
                              className="text-xs text-light-primary underline"
                              href="#"
                            >
                              #Healthcare
                            </Link>
                          </div>

                          <div className="flex justify-end">
                            <Link
                              href="#"
                              className="rounded-full bg-primary px-3 py-1 text-sm text-white transition hover:bg-green-700"
                            >
                              Details
                            </Link>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="col-span-1 rounded-xl border bg-white p-6 text-center text-gray-500 md:col-span-2 lg:col-span-3">
                        No job applications found.
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-span-1 rounded-xl border shadow-soft lg:col-span-4">
                <h2 className="mb-2 p-4 text-lg font-semibold">
                  Top Job Applicants
                </h2>
                <DataTable<CountryData>
                  data={countrydata}
                  className="border-none shadow-none"
                  columns={[
                    {
                      key: "jobs",
                      header: "Jobs",
                    },
                    {
                      key: "views",
                      header: "Views",
                      render: (row) => (
                        <div className="flex items-center">
                          {row.views}
                          <span className="ml-2 text-xs text-green-500">
                            (+{row.views_percentage})
                          </span>
                        </div>
                      ),
                    },
                    {
                      key: "applicants",
                      header: "Applicants %",
                      render: (row) => {
                        return (
                          <>
                            {row.applicants}
                            <span className="ml-2 text-xs text-green-500">
                              (+{row.applicants_percentage})
                            </span>
                          </>
                        );
                      },
                    },
                  ]}
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === "job-list" && (
          <div className="rounded-xl border bg-white p-4 shadow-soft">
            <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <h2 className="text-xl font-semibold">Total Jobs</h2>

              <div className="flex items-center gap-2">
                <TextField
                  variant="outlined"
                  placeholder="Search jobs..."
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
                    setFilters({ ...filters, status: e.target.value as string })
                  }
                  displayEmpty
                  fullWidth
                  className="h-[42px]"
                >
                  <MenuItem value="">All Statuses</MenuItem>
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
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
              <DataTable<JobData>
                data={filteredJobs}
                columns={columns}
                searchQuery={filters.searchQuery}
              />
            )}
          </div>
        )}

        {activeTab === "applicant-list" && (
          <div className="rounded-xl border bg-white p-4 shadow-soft">
            <h2 className="mb-4 text-xl font-semibold">Applicant List</h2>
            <p className="text-gray-500">
              User activity data will be displayed here
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleEmployerPage;
