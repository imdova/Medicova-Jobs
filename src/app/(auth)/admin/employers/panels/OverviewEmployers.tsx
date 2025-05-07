"use client";
import { useState } from "react";
import React from "react";
import { Typography } from "@mui/material";
import Image from "next/image";

import {
  MonetizationOn,
  North,
  South,
  LocationOnOutlined,
} from "@mui/icons-material";
import GenericChart from "@/components/charts/GenericChart";
import DynamicCountriesTable from "@/components/tables/CountiresTable";
import useFetch from "@/hooks/useFetch";
import { Company } from "@/types";
import Link from "next/link";
import { ToggleButton } from "@/components/UI/ToggleButton";
import CellOptions from "@/components/UI/CellOptions";
import { Eye, Trash } from "lucide-react";
import DynamicTable from "@/components/tables/DTable";
import { API_GET_COMPANIES } from "@/api/employer";
import CompanyMiniCard, {
  CompanyMiniCardSkeleton,
} from "../../components/CompanyMiniCard";

type CountryData = {
  country: string;
  countryCode: string;
  employers?: number;
  jobs?: number;
  revenue?: number;
};

// Type definitions
interface EmployerStats {
  totalEmployers: number;
  totalEmployersGrowth: number;
  activeEmployers: number;
  activeEmployersGrowth: number;
  inactiveEmployers: number;
  inactiveEmployersGrowth: number;
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
const dummyEmployerStats: EmployerStats = {
  totalEmployers: 2420,
  totalEmployersGrowth: 20,
  activeEmployers: 1517,
  activeEmployersGrowth: 20,
  inactiveEmployers: 903,
  inactiveEmployersGrowth: -10,
};
type JobStatus = "all" | "new" | "active" | "inactive";

const countrydata: CountryData[] = [
  {
    country: "Egypt",
    countryCode: "eg",
    employers: 15,
    jobs: 5,
    revenue: 543,
  },
  {
    country: "Qatar",
    countryCode: "qa",
    employers: 12,
    jobs: 13,
    revenue: 55,
  },
  {
    country: "Oman",
    countryCode: "om",
    employers: 7,
    jobs: 9,
    revenue: 60,
  },
  {
    country: "Kuwait",
    countryCode: "kw",
    employers: 9,
    jobs: 4,
    revenue: 89,
  },
];
// data jobs columns
const columns = [
  {
    key: "orderNum",
    header: "#",
    render: (_employer: Company, index: number) => <span>{index + 1}</span>,
  },
  {
    key: "name",
    header: "Name",
    render: (employer: Company) => (
      <div className="flex items-center gap-2">
        <Image
          className="h-8 w-8 rounded-full object-cover"
          src={employer.avatar ?? "/images/avatar-placeholder.png"}
          width={200}
          height={200}
          alt={employer.name}
        />
        <div>
          <Link
            className="transition hover:text-primary hover:underline"
            href={`/co/${employer?.username}`}
          >
            <div className="">
              <span className="text-sm">{employer.name}</span>
            </div>
          </Link>
          <Link
            href={`mailto:${employer.email}`}
            className="text-xs text-blue-700"
          >
            {employer.email}
          </Link>
        </div>
      </div>
    ),
  },
  {
    key: "date",
    header: "Reg Date",
    render: (employer: Company) => {
      const formattedDate = new Date(employer.updated_at).toLocaleDateString(
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
    key: "phone",
    header: "Phone",
    render: (employer: Company) => {
      return <span className="text-sm">{employer.phone || "-"}</span>;
    },
  },
  {
    key: "country",
    header: "Country",
    render: (employer: Company) => {
      return <span className="text-sm">{employer.country?.name || "-"}</span>;
    },
  },
  {
    key: "type",
    header: "Type",
    render: (employer: Company) => (
      <span className="text-sm">{employer.companyTypeName}</span>
    ),
  },
  {
    key: "sector",
    header: "Sector",
    render: (employer: Company) => (
      <span className="text-sm">{employer.companySectorName}</span>
    ),
  },
  {
    key: "plan",
    header: "Plan",
    render: () => <span className="text-sm">general</span>,
  },
  {
    key: "state",
    header: "state",
    render: (employer: Company) => (
      <span
        className={`rounded-xl px-3 py-1 text-sm ${employer.status === "active" ? "bg-green-100 text-green-700" : "bg-red-200 text-red-700"}`}
      >
        {employer.status}
      </span>
    ),
  },
  {
    key: "action",
    header: "Action",
    render: (employer: Company) => (
      <div className="flex items-center gap-4">
        <ToggleButton
          initialValue={employer.status === "active" ? true : false}
        />
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

const OverviewEmployersPage: React.FC = () => {
  // State variables
  const [employerStats, setEmployerStats] =
    useState<EmployerStats>(dummyEmployerStats);
  const [statusFilter, setStatusFilter] = useState<JobStatus>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const { data: employers, loading } =
    useFetch<PaginatedResponse<Company>>(API_GET_COMPANIES);
  const topCompanies = employers?.data
    ?.sort(
      (a, b) => Number(b.completencePercent) - Number(a.completencePercent),
    )
    ?.filter((x) => Boolean(x.username));

  const filteredemployers = employers?.data.filter((employers) => {
    // Status filter
    const statusMatch =
      statusFilter === "all" ||
      (statusFilter === "new" && "") || // if job is new change to job.isNew
      (statusFilter === "active" && employers?.status === "active") ||
      (statusFilter === "inactive" && employers?.status === "inactive");

    // Search filter
    const query = searchQuery.toLowerCase();
    const searchMatch =
      !query ||
      employers.name.toLowerCase().includes(query) ||
      employers.email?.toLowerCase().includes(query) ||
      employers.country?.name.toLowerCase().includes(query);

    return statusMatch && searchMatch;
  });

  return (
    <div className="space-y-3">
      {/* Stats Section */}
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
                  {employerStats.totalEmployers.toLocaleString()}
                </h2>
                <span
                  className={`flex items-center text-xs ${
                    employerStats.totalEmployersGrowth >= 0
                      ? "text-primary"
                      : "text-[#F81D1D]"
                  }`}
                >
                  {employerStats.totalEmployersGrowth >= 0 ? (
                    <North className="text-xs" />
                  ) : (
                    <South className="text-xs" />
                  )}
                  {Math.abs(employerStats.totalEmployersGrowth)}%
                </span>
              </div>
              <div>
                <Image
                  src="/icons/icon-1.png"
                  alt="Total Employers Icon"
                  width={48}
                  height={48}
                />
              </div>
            </div>
            {/* Active Employers */}
            <div className="flex items-center justify-between gap-3 rounded-xl border p-4 shadow-sm">
              <div>
                <span className="mb-2 block text-sm text-secondary">
                  Active Employers
                </span>
                <h2 className="text-lg font-bold">
                  {employerStats.activeEmployers.toLocaleString()}
                </h2>
                <span
                  className={`flex items-center text-xs ${
                    employerStats.activeEmployersGrowth >= 0
                      ? "text-primary"
                      : "text-[#F81D1D]"
                  }`}
                >
                  {employerStats.activeEmployersGrowth >= 0 ? (
                    <North className="text-xs" />
                  ) : (
                    <South className="text-xs" />
                  )}
                  {Math.abs(employerStats.activeEmployersGrowth)}%
                </span>
              </div>
              <div>
                <Image
                  src="/icons/icon-2.png"
                  alt="Active Employers Icon"
                  width={48}
                  height={48}
                />
              </div>
            </div>
            {/* Inactive Employers */}
            <div className="flex items-center justify-between gap-3 rounded-xl border p-4 shadow-sm">
              <div>
                <span className="mb-2 block text-sm text-secondary">
                  Inactive Employers
                </span>
                <h2 className="text-lg font-bold">
                  {employerStats.inactiveEmployers.toLocaleString()}
                </h2>
                <span
                  className={`flex items-center text-xs ${
                    employerStats.inactiveEmployersGrowth >= 0
                      ? "text-primary"
                      : "text-[#F81D1D]"
                  }`}
                >
                  {employerStats.inactiveEmployersGrowth >= 0 ? (
                    <North className="text-xs" />
                  ) : (
                    <South className="text-xs" />
                  )}
                  {Math.abs(employerStats.inactiveEmployersGrowth)}%
                </span>
              </div>
              <div>
                <Image
                  src="/icons/icon-3.png"
                  alt="Inactive Employers Icon"
                  width={48}
                  height={48}
                />
              </div>
            </div>
          </div>
          {/* Chart Section */}
          <div className="relative mt-3 overflow-hidden rounded-xl border bg-white shadow-sm">
            <GenericChart
              chartTitle="Statistics Employers Chart"
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
        {/* Right Column */}
        <div className="col-span-1 lg:col-span-3">
          <div className="rounded-base border border-gray-200 bg-white p-3 shadow-soft">
            <div className="mb-2 flex items-center justify-between border-b p-1 pb-2">
              <h5 className="text-xl font-semibold text-main">
                Total Employers
                <span className="ml-1 text-xs text-secondary">(Revenue)</span>
              </h5>
            </div>
            {loading ? (
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {[1, 2, 3, 4].map((item) => (
                  <CompanyMiniCardSkeleton key={item} />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {topCompanies
                  ?.slice(0, 4)
                  .map((company) => (
                    <CompanyMiniCard key={company.id} company={company} />
                  ))}
              </div>
            )}
          </div>
          {/* Top Countries */}
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
      {/* Employers Table */}
      <div className="rounded-xl border bg-white p-4 shadow-sm">
        <div className="mb-6 flex flex-col justify-between gap-2 md:flex-row md:items-center">
          <h2 className="text-xl font-semibold">Recent Employers</h2>
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
                    {tab === "all" && "All Employers"}
                    {tab === "new" && "New Employers"}
                    {tab === "active" && "Active Employers"}
                    {tab === "inactive" && "Inactive Employers"}
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
              <p className="text-gray-500">Loading Employers...</p>
            </div>
          ) : (
            <DynamicTable<Company>
              columns={columns}
              data={filteredemployers || []}
              minWidth={950}
              selectable={true}
              headerClassName="bg-green-600 text-white"
              cellClassName="text-sm py-3 px-2"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default OverviewEmployersPage;
