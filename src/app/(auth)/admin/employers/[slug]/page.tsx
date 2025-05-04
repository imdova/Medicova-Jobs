"use client";

import {
  API_GET_COMPANY_BY_ID,
  API_GET_JOBS_BY_COMPANY_ID,
} from "@/api/employer";
import NotFoundPage from "@/app/not-found";
import GenericChart from "@/components/charts/GenericChart";
import DynamicCountriesTable from "@/components/tables/CountiresTable";
import DynamicTable from "@/components/tables/DTable";
import CellOptions from "@/components/UI/CellOptions";
import { ToggleButton } from "@/components/UI/ToggleButton";
import useFetch from "@/hooks/useFetch";
import { CompanyItem, JobData } from "@/types";
import { CompanyType } from "@/types/employer";
import {
  Eye,
  ListOrdered,
  SquarePen,
  View,
  UsersRound,
  MapPin,
  GraduationCap,
  Clock,
  Trash,
  DollarSign,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface SingleUserProps {
  params: {
    slug: string;
  };
}

type CountryData = {
  country: string;
  countryCode: string;
  views?: number;
  applicants?: number;
  views_percentage?: string;
  applicants_percentage?: string;
};
const countrydata: CountryData[] = [
  {
    country: "Egypt",
    countryCode: "eg",
    views: 1500,
    applicants: 200,
    views_percentage: "30%",
    applicants_percentage: "25%",
  },
  {
    country: "Qatar",
    countryCode: "qa",
    views: 1100,
    applicants: 180,
    views_percentage: "22%",
    applicants_percentage: "21%",
  },
  {
    country: "Oman",
    countryCode: "om",
    views: 950,
    applicants: 140,
    views_percentage: "19%",
    applicants_percentage: "17%",
  },
  {
    country: "Kuwait",
    countryCode: "kw",
    views: 1300,
    applicants: 210,
    views_percentage: "26%",
    applicants_percentage: "23%",
  },
  {
    country: "Saudi Arabia",
    countryCode: "sa",
    views: 1700,
    applicants: 250,
    views_percentage: "35%",
    applicants_percentage: "28%",
  },
  {
    country: "Bahrain",
    countryCode: "bh",
    views: 600,
    applicants: 80,
    views_percentage: "12%",
    applicants_percentage: "10%",
  },
  {
    country: "United Arab Emirates",
    countryCode: "ae",
    views: 1800,
    applicants: 260,
    views_percentage: "37%",
    applicants_percentage: "30%",
  },
  {
    country: "Jordan",
    countryCode: "jo",
    views: 700,
    applicants: 90,
    views_percentage: "14%",
    applicants_percentage: "12%",
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
    header: "Job title",
    render: (job: JobData) => (
      <Link href={``}>
        <h2 className="text-sm hover:underline">{job.title}</h2>
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

      return <span className="text-sm">{formattedDate}</span>;
    },
  },
  {
    key: "Industry",
    header: "Industry",
    render: (job: JobData) => (
      <span className="text-sm">{job.jobIndustry}</span>
    ),
  },
  {
    key: "loaction",
    header: "location",
    render: (job: JobData) => (
      <span className="text-sm">{job.country?.name}</span>
    ),
  },
  {
    key: "views",
    header: "Views",
    render: (job: JobData) => <span className="text-sm">1233</span>,
  },
  {
    key: "applacants",
    header: "applacants",
    render: (job: JobData) => (
      <span className="flex justify-center text-sm">
        {job.applicationCount}
      </span>
    ),
  },
  {
    key: "status",
    header: "Status",
    render: () => {
      type JobStatus =
        | "Review"
        | "Viewed"
        | "Shortlisted"
        | "Interviewed"
        | "Accepted"
        | "Rejected"
        | "Withdrawn"
        | "inactive";

      const status: JobStatus = "inactive";

      const statusStyles: Record<JobStatus, string> = {
        Review: "bg-yellow-100 text-yellow-800",
        Viewed: "bg-blue-100 text-blue-800",
        Shortlisted: "bg-purple-100 text-purple-800",
        Interviewed: "bg-indigo-100 text-indigo-800",
        Accepted: "bg-green-100 text-green-800",
        Rejected: "bg-red-100 text-red-800",
        Withdrawn: "bg-gray-200 text-gray-700",
        inactive: "bg-red-100 text-red-600",
      };

      return (
        <span
          className={`rounded-full px-2 py-1 text-xs font-medium ${
            statusStyles[status] ?? statusStyles.inactive
          }`}
        >
          {status}
        </span>
      );
    },
  },
  {
    key: "action",
    header: "Action",
    render: (job: JobData) => (
      <div className="flex items-center gap-3">
        <ToggleButton
          initialValue={job.active || false}
          onChange={(value) => console.log(value)}
          variant="primary"
          size="lg"
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

export default function SingleStudentOverview({ params }: SingleUserProps) {
  const slug = params.slug;
  const { data: company } = useFetch<CompanyType>(
    `${API_GET_COMPANY_BY_ID}${slug}`,
  );
  const { data: jobs, loading } = useFetch<PaginatedResponse<JobData>>(
    `${API_GET_JOBS_BY_COMPANY_ID}${company?.id}`,
  );
  const [activeTab, setActiveTab] = useState("employer-overview");
  // State for filters
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [specialtyFilter, setSpecialtyFilter] = useState("");
  const [educationDateFilter, setEducationDateFilter] = useState("");

  // Filtered data
  const filteredApplications = jobs?.data.filter((jobs) => {
    // Search query filter
    const matchesSearch =
      !searchQuery ||
      jobs.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      jobs.jobEmail?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      jobs.jobIndustry?.toLowerCase().includes(searchQuery.toLowerCase());

    // Location filter
    const matchesLocation =
      !locationFilter || jobs.country?.name === locationFilter;

    // Category filter
    const matchesCategory =
      !categoryFilter || jobs.jobCategory === categoryFilter;

    // Specialty filter
    const matchesSpecialty =
      !specialtyFilter || jobs.jobSpeciality === specialtyFilter;

    return (
      matchesSearch && matchesLocation && matchesCategory && matchesSpecialty
    );
  });

  console.log(company);
  console.log(jobs);
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
          <View size={15} />
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
          <ListOrdered size={15} />
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
          <ListOrdered size={15} />
          User Activity
        </button>
      </div>
      <div className="mb-4 rounded-lg border bg-white p-4 shadow-sm">
        <div className="relative flex justify-between">
          {/* Student Details */}
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
                    {/* {Seeker?.isVerified && (
                          <span className="rounded-full bg-primary px-2 py-1 text-xs capitalize text-white">
                            {Seeker.type}
                          </span>
                        )} */}
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
                    href={``}
                  >
                    <Eye size={12} />
                    View Profile
                  </Link>
                </div>
              </div>
              <div className="flex flex-col gap-5 sm:flex-row">
                {/* location info  */}
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
        <div>
          {/* employer overview Panel */}
          {activeTab === "employer-overview" && (
            <div>
              <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
                <div className="flex items-center gap-4 rounded-lg border bg-white p-4 shadow-sm">
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
                <div className="flex items-center gap-4 rounded-lg border bg-white p-4 shadow-sm">
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
                <div className="flex items-center gap-4 rounded-lg border bg-white p-4 shadow-sm">
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
                  <div className="mb-4 rounded-xl border bg-white p-4 shadow-sm">
                    {" "}
                    <GenericChart
                      chartTitle="Job Statistics Chart"
                      data={{
                        yearly: {
                          categories: [
                            "Jan",
                            "Feb",
                            "Mar",
                            "Apr",
                            "May",
                            "Jun",
                          ],
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
                        {
                          title: "Applicants",
                          value: "2,480",
                          color: "#6366F1",
                        },
                      ]}
                    />
                  </div>
                  <div className="rounded-xl border p-4 shadow-sm">
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
                                <Clock
                                  className="text-light-primary"
                                  size={15}
                                />{" "}
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
                <div className="col-span-1 rounded-xl border shadow-sm lg:col-span-4">
                  <h2 className="mb-3 p-4 text-lg font-semibold">
                    Top Job Applicants
                  </h2>
                  <DynamicCountriesTable
                    data={countrydata}
                    columns={[
                      {
                        key: "country",
                        header: "Jobs",
                      },
                      {
                        key: "views",
                        header: "Views",
                        render: (value, row) => (
                          <div className="flex items-center">
                            {value.toLocaleString()}
                            <span className="ml-2 text-xs text-green-500">
                              (+{row.views_percentage})
                            </span>
                          </div>
                        ),
                      },
                      {
                        key: "applicants",
                        header: "applicants",
                        render: (_, row) =>
                          `${((row.applicants / row.views) * 100).toFixed(1)}%`,
                      },
                    ]}
                    defaultSort={{ key: "views", direction: "desc" }}
                    showFlags={false}
                    onRowClick={(row) => console.log("Row clicked:", row)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* job list Panel */}
          {activeTab === "job-list" && (
            <div className="rounded-xl border bg-white p-4 shadow-sm">
              <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <h2 className="text-xl font-semibold">
                  Total Job Applications
                </h2>

                {/* Search Bar */}
                <div className="relative w-full md:w-80">
                  <input
                    type="text"
                    placeholder="Search applications..."
                    className="w-full rounded-md border px-4 py-2 pl-10 focus:outline-none"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <svg
                    className="absolute left-3 top-3 h-4 w-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>

              {/* Filters Row */}
              <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
                {/* Location Filter */}
                <div>
                  <label
                    htmlFor="location"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    Location
                  </label>
                  <select
                    id="location"
                    className="w-full rounded-md border px-3 py-2 focus:outline-none"
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                  >
                    <option value="">All Locations</option>

                    <option key="egypt" value="egypt">
                      egypt
                    </option>
                  </select>
                </div>

                {/* Category Filter */}
                <div>
                  <label
                    htmlFor="category"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    Category
                  </label>
                  <select
                    id="category"
                    className="w-full rounded-md border px-3 py-2 focus:outline-none"
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                  >
                    <option value="">All Categories</option>
                  </select>
                </div>

                {/* Specialty Filter */}
                <div>
                  <label
                    htmlFor="specialty"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    Specialty
                  </label>
                  <select
                    id="specialty"
                    className="w-full rounded-md border px-3 py-2 focus:outline-none"
                    value={specialtyFilter}
                    onChange={(e) => setSpecialtyFilter(e.target.value)}
                  >
                    <option value="">All Specialties</option>
                  </select>
                </div>

                {/* Education Date Filter */}
                <div>
                  <label
                    htmlFor="educationDate"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    Education Date
                  </label>
                  <select
                    id="educationDate"
                    className="w-full rounded-md border px-3 py-2 focus:outline-none"
                    value={educationDateFilter}
                    onChange={(e) => setEducationDateFilter(e.target.value)}
                  >
                    <option value="">All Dates</option>
                    <option value="last-6-months">Last 6 Months</option>
                    <option value="last-year">Last Year</option>
                    <option value="last-2-years">Last 2 Years</option>
                    <option value="last-5-years">Last 5 Years</option>
                  </select>
                </div>
              </div>

              {loading ? (
                <p>Loading...</p>
              ) : (
                <DynamicTable<JobData>
                  columns={columns}
                  data={filteredApplications || []}
                  minWidth={1200}
                  pagination
                  selectable
                />
              )}
            </div>
          )}
          {/* applicant list Panel */}
          {activeTab === "applicant-list" && ""}
        </div>
      </div>
    </div>
  );
}
