"use client";
import { Typography } from "@mui/material";
import Image from "next/image";
import {
  LocationOnOutlined,
  MonetizationOn,
  North,
  South,
} from "@mui/icons-material";
import React, { useState } from "react";
import GenericChart from "@/components/charts/GenericChart";
import DynamicCountriesTable from "@/components/tables/CountiresTable";
import DynamicTable from "@/components/tables/DTable";
import CellOptions from "@/components/UI/CellOptions";
import { Eye, Trash } from "lucide-react";
import useFetch from "@/hooks/useFetch";
import { JobData } from "@/types";
import { API_GET_JOBS } from "@/api/employer";
import Link from "next/link";
import { ToggleButton } from "@/components/UI/ToggleButton";

type CountryData = {
  country: string;
  countryCode: string;
  employers?: number;
  jobs?: number;
  revenue?: number;
};
// Type definitions
interface JobStats {
  totalJobs: number;
  totalJobsGrowth: number;
  activeJobs: number;
  activeJobsGrowth: number;
  inactiveJobs: number;
  inactiveJobsGrowth: number;
}

interface TopEmployer {
  id: string;
  name: string;
  logo: string;
  location: string;
  country: string;
  revenue: number;
  openJobs: number;
}

// Dummy data
const dummyJobstats: JobStats = {
  totalJobs: 2420,
  totalJobsGrowth: 20,
  activeJobs: 1517,
  activeJobsGrowth: 20,
  inactiveJobs: 903,
  inactiveJobsGrowth: -10,
};
type JobStatus = "all" | "new" | "active" | "inactive";

const countrydata: CountryData[] = [
  {
    country: "Egypt",
    countryCode: "eg",
    employers: 3,
    jobs: 54,
    revenue: 543,
  },
  {
    country: "Qatar",
    countryCode: "qa",
    employers: 3,
    jobs: 135,
    revenue: 55,
  },
  {
    country: "Oman",
    countryCode: "om",
    employers: 3,
    jobs: 15,
    revenue: 60,
  },
  {
    country: "Kuwait",
    countryCode: "kw",
    employers: 3,
    jobs: 4,
    revenue: 89,
  },
];

// data jobs columns
const columns = [
  {
    key: "orderNum",
    header: "#",
    render: (_job: JobData, index: number) => <span>{index + 1}</span>,
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
    key: "date",
    header: "Date",
    render: (job: JobData) => {
      const formattedDate = new Date(job.updated_at).toLocaleDateString(
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
    key: "employer",
    header: "Employer",
    render: (job: JobData) => {
      return <span className="text-sm">{job.company?.name || "-"}</span>;
    },
  },
  {
    key: "country",
    header: "country",
    render: (job: JobData) => {
      return <span className="text-sm">{job.country?.name || "-"}</span>;
    },
  },
  {
    key: "views",
    header: "views",
    render: () => <span className="text-sm">50</span>,
  },
  {
    key: "applicants",
    header: "applicants",
    render: (job: JobData) => (
      <span className="text-sm">{job.applicationCount || "-"}</span>
    ),
  },
  {
    key: "state",
    header: "state",
    render: (job: JobData) => (
      <span
        className={`rounded-xl px-3 py-1 text-sm ${job.active ? "bg-green-100 text-green-700" : "bg-red-200 text-red-700"}`}
      >
        {job.active ? "active" : "Inactive"}
      </span>
    ),
  },
  {
    key: "action",
    header: "Action",
    render: (job: JobData) => (
      <div className="flex items-center gap-4">
        <ToggleButton initialValue={job.active || false} />
        <CellOptions
          item={undefined}
          options={[
            {
              label: "View",
              icon: <Eye className="h-4 w-4" />, // optional icon
              action: (item) => console.log("Viewing", item),
            },
            {
              label: "Delete",
              icon: <Trash className="h-4 w-4 text-red-500" />,
              action: (item) => console.log("Deleting", item),
            },
          ]}
        />
      </div>
    ),
  },
];

const dummyTopEmployers: TopEmployer[] = [
  {
    id: "emp-001",
    name: "LinkedIn",
    logo: "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png",
    location: "New York, US",
    country: "United States",
    revenue: 25000,
    openJobs: 25,
  },
  {
    id: "emp-002",
    name: "Google",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg",
    location: "Mountain View, US",
    country: "United States",
    revenue: 42000,
    openJobs: 38,
  },
  {
    id: "emp-003",
    name: "Microsoft",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
    location: "Redmond, US",
    country: "United States",
    revenue: 36500,
    openJobs: 29,
  },
  {
    id: "emp-004",
    name: "Amazon",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    location: "Seattle, US",
    country: "United States",
    revenue: 31200,
    openJobs: 41,
  },
];

const OvarviewJobs: React.FC = () => {
  // State variables
  const [JobsStats, setJobsStats] = useState<JobStats>(dummyJobstats);
  const [topEmployers, setTopEmployers] =
    useState<TopEmployer[]>(dummyTopEmployers);
  const [statusFilter, setStatusFilter] = useState<JobStatus>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const { data: jobs, loading } =
    useFetch<PaginatedResponse<JobData>>(API_GET_JOBS); // Only one source of truth

  const filteredJobs = jobs?.data.filter((job) => {
    // Status filter
    const statusMatch =
      statusFilter === "all" ||
      (statusFilter === "new" && "") || // if job is new change to job.isNew
      (statusFilter === "active" && job.active) ||
      (statusFilter === "inactive" && !job.active);

    // Search filter
    const query = searchQuery.toLowerCase();
    const searchMatch =
      !query ||
      job.title.toLowerCase().includes(query) ||
      job.description?.toLowerCase().includes(query) ||
      job.country?.name.toLowerCase().includes(query);

    return statusMatch && searchMatch;
  });
  return (
    <>
      {/* start Overveiw page */}
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-8">
        <div className="col-span-1 lg:col-span-5">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
            {/* Total Employers */}
            <div className="flex items-center justify-between gap-3 rounded-xl border p-4 shadow-sm">
              <div>
                <span className="mb-2 block text-sm text-secondary">
                  Total Employers
                </span>
                <h2 className="mb-2 text-lg font-bold">
                  {JobsStats.totalJobs.toLocaleString()}
                </h2>
                <span
                  className={`flex items-center text-xs ${
                    JobsStats.totalJobsGrowth >= 0
                      ? "text-primary"
                      : "text-[#F81D1D]"
                  }`}
                >
                  {JobsStats.totalJobsGrowth >= 0 ? (
                    <North className="text-xs" />
                  ) : (
                    <South className="text-xs" />
                  )}
                  {Math.abs(JobsStats.totalJobsGrowth)}%
                </span>
              </div>
              <div>
                <Image
                  src="/icons/job-1.png"
                  alt="Total Jobss Icon"
                  width={48}
                  height={48}
                />
              </div>
            </div>

            {/* Active Jobss */}
            <div className="flex items-center justify-between gap-3 rounded-xl border p-4 shadow-sm">
              <div>
                <span className="mb-2 block text-sm text-secondary">
                  Active Jobss
                </span>
                <h2 className="text-lg font-bold">
                  {JobsStats.activeJobs.toLocaleString()}
                </h2>
                <span
                  className={`flex items-center text-xs ${
                    JobsStats.activeJobsGrowth >= 0
                      ? "text-primary"
                      : "text-[#F81D1D]"
                  }`}
                >
                  {JobsStats.activeJobsGrowth >= 0 ? (
                    <North className="text-xs" />
                  ) : (
                    <South className="text-xs" />
                  )}
                  {Math.abs(JobsStats.activeJobsGrowth)}%
                </span>
              </div>
              <div>
                <Image
                  src="/icons/job-2.png"
                  alt="Active Jobss Icon"
                  width={48}
                  height={48}
                />
              </div>
            </div>
            {/* Inactive Jobs */}
            <div className="flex items-center justify-between gap-3 rounded-xl border p-4 shadow-sm">
              <div>
                <span className="mb-2 block text-sm text-secondary">
                  Inactive Jobss
                </span>
                <h2 className="text-lg font-bold">
                  {JobsStats.inactiveJobs.toLocaleString()}
                </h2>
                <span
                  className={`flex items-center text-xs ${
                    JobsStats.inactiveJobsGrowth >= 0
                      ? "text-primary"
                      : "text-[#F81D1D]"
                  }`}
                >
                  {JobsStats.inactiveJobsGrowth >= 0 ? (
                    <North className="text-xs" />
                  ) : (
                    <South className="text-xs" />
                  )}
                  {Math.abs(JobsStats.inactiveJobsGrowth)}%
                </span>
              </div>
              <div>
                <Image
                  src="/icons/job-3.png"
                  alt="Inactive Jobss Icon"
                  width={48}
                  height={48}
                />
              </div>
            </div>
          </div>
          <div className="relative mt-3 overflow-hidden rounded-xl border bg-white shadow-sm">
            <GenericChart
              chartTitle="Statistics Jobs Chart"
              data={{
                yearly: {
                  categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                  series: [
                    {
                      name: "New Job",
                      data: [100, 120, 90, 140, 110, 130],
                      color: "#FF8743",
                    },
                    {
                      name: "Apply for a job",
                      data: [200, 240, 180, 280, 220, 260],
                      color: "#0884FF",
                    },
                  ],
                },
                monthly: {
                  categories: ["Week 1", "Week 2", "Week 3", "Week 4"],
                  series: [
                    {
                      name: "New Job",
                      data: [30, 40, 35, 45],
                      color: "#FF8743",
                    },
                    {
                      name: "Apply for a job",
                      data: [60, 80, 70, 90],
                      color: "#0884FF",
                    },
                  ],
                },
                weekly: {
                  categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                  series: [
                    {
                      name: "New Job",
                      data: [10, 15, 12, 18, 14, 8, 5],
                      color: "#FF8743",
                    },
                    {
                      name: "Apply for a job",
                      data: [20, 30, 25, 35, 28, 15, 10],
                      color: "#0884FF",
                    },
                  ],
                },
              }}
              cards={[
                { title: "New Job", value: "1,240", color: "#FF8743" },
                { title: "Apply for a job", value: "2,480", color: "#0884FF" },
              ]}
            />
          </div>
        </div>
        <div className="col-span-1 lg:col-span-3">
          <div className="overflow-hidden rounded-xl border bg-white p-3">
            <div className="mb-3 flex items-center justify-between gap-8">
              <Typography>
                Top Employers
                <span className="ml-1 text-xs text-secondary">(Revenue)</span>
              </Typography>
            </div>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {topEmployers.map((employer) => (
                <div
                  key={employer.id}
                  className="flex w-full flex-col justify-between rounded-lg border p-3 transition-shadow hover:shadow-md"
                >
                  <div className="flex gap-3">
                    <Image
                      src={employer.logo}
                      alt={`${employer.name} logo`}
                      width={40}
                      height={40}
                      className="rounded-md"
                    />
                    <div>
                      <Typography variant="subtitle1" className="font-medium">
                        {employer.name}
                      </Typography>
                      <p className="flex items-center text-xs text-secondary">
                        <LocationOnOutlined className="mr-1 text-lg" />{" "}
                        {employer.location}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <h2 className="text-xs text-secondary">
                      <MonetizationOn className="mr-2 text-lg" />
                      {employer.revenue}
                    </h2>
                    <h2 className="text-xs text-secondary">
                      {employer.openJobs} Open Jobs
                    </h2>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-3 flex-1 overflow-hidden rounded-xl border bg-white">
            <div className="mb-3 flex justify-between gap-8 p-3">
              <Typography>
                Top Countries
                <span className="ml-1 text-xs text-secondary">(Revenue)</span>
              </Typography>
            </div>
            <DynamicCountriesTable
              data={countrydata}
              columns={[
                {
                  key: "country",
                  header: "country",
                },
                {
                  key: "jobs",
                  header: "jobs",
                  render: (value) => <span>{value} Jobs</span>,
                },
                {
                  key: "employers",
                  header: "employers",
                },
                {
                  key: "revenue",
                  header: "revenue",
                  render: (value) => (
                    <span className="text-primary">{value}K</span>
                  ),
                },
              ]}
              defaultSort={{ key: "jobs", direction: "desc" }}
              showFlags={true}
              onRowClick={(row) => console.log("Row clicked:", row)}
            />
          </div>
        </div>
      </div>
      <div className="mt-3 !p-0">
        {/* <OverveiwJobTable /> */}
        <div className="rounded-xl border bg-white p-4 shadow-sm">
          <div className="mb-6 flex flex-col justify-between gap-2 md:flex-row md:items-center">
            <h2 className="text-xl font-semibold">Recent Jobs</h2>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              {/* Status Tabs */}
              <div className="flex space-x-1 rounded-lg bg-gray-100 p-1">
                {(["all", "new", "active", "inactive"] as JobStatus[]).map(
                  (tab) => (
                    <button
                      key={tab}
                      onClick={() => setStatusFilter(tab)}
                      className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                        statusFilter === tab
                          ? "bg-white text-green-600 shadow-sm"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      {tab === "all" && "All Jobs"}
                      {tab === "new" && "New Jobs"}
                      {tab === "active" && "Active Jobs"}
                      {tab === "inactive" && "Inactive Jobs"}
                    </button>
                  ),
                )}
              </div>

              {/* Search Input */}
              <div className="relative w-full sm:w-64">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search jobs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full rounded-md border border-gray-300 py-2 pl-10 pr-3 text-sm focus:border-green-500 focus:outline-none focus:ring-green-500"
                />
              </div>
            </div>

            {/* Table */}
            {loading ? (
              <div className="flex h-32 items-center justify-center">
                <p className="text-gray-500">Loading jobs...</p>
              </div>
            ) : (
              <DynamicTable<JobData>
                columns={columns}
                data={filteredJobs || []}
                minWidth={950}
                selectable={true}
                headerClassName="bg-green-600 text-white"
                cellClassName="text-sm py-3 px-2"
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default OvarviewJobs;
