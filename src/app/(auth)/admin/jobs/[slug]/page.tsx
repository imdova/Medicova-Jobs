"use client";

import { API_GET_JOB_BY_ID, JOB_APPLICATIONS } from "@/api/employer";
import NotFoundPage from "@/app/not-found";
import GenericChart from "@/components/charts/GenericChart";
import DynamicCountriesTable from "@/components/tables/CountiresTable";
import DynamicTable from "@/components/tables/DTable";
import CellOptions from "@/components/UI/CellOptions";
import useFetch from "@/hooks/useFetch";
import { JobData } from "@/types";
import {
  Eye,
  ListOrdered,
  SquarePen,
  View,
  UsersRound,
  Trash,
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
    render: (_job: ApplicationsType, index: number) => <span>{index + 1}</span>,
  },
  {
    key: "name",
    header: "Full Name",
    render: (app: ApplicationsType) => (
      <div className="flex items-center gap-2">
        <Image
          className="h-8 w-8 rounded-full object-cover"
          src={app.applicant.avatar ?? "/images/avatar-placeholder.png"}
          width={200}
          height={200}
          alt={app.applicant.firstName}
        />
        <div>
          <Link className="hover:underline" href={``}>
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
    key: "date",
    header: "Applied Date",
    render: (app: ApplicationsType) => {
      const formattedDate = new Date(app.updated_at).toLocaleDateString(
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
    render: (app: ApplicationsType) => {
      return <span className="text-sm">{app.applicant.phone || "-"}</span>;
    },
  },
  {
    key: "country",
    header: "country",
    render: (app: ApplicationsType) => (
      <span className="text-sm">{app.applicant.country?.name || "-"}</span>
    ),
  },
  {
    key: "category",
    header: "Category",
    render: (app: ApplicationsType) => (
      <span className="text-sm">{app.applicant.category || "-"}</span>
    ),
  },
  {
    key: "specialty",
    header: "specialty",
    render: (app: ApplicationsType) => (
      <span className="text-sm">{app.applicant.specialty || "-"}</span>
    ),
  },
  {
    key: "careerLevel",
    header: "Career Level",
    render: (app: ApplicationsType) => (
      <span className="text-sm">{app.applicant.careerLevel || "-"}</span>
    ),
  },
  {
    key: "education",
    header: "Education",
    render: (app: ApplicationsType) => (
      <span className="text-sm">
        {app.applicant.lastEducation?.degree || "-"}
      </span>
    ),
  },
  {
    key: "age",
    header: "Age",
  },
  {
    key: "experience",
    header: "Experience",
    render: (app: ApplicationsType) => (
      <span className="text-sm">
        {app.applicant.yearsOfExperience.totalYears || "-"}
      </span>
    ),
  },
  {
    key: "action",
    header: "Action",
    render: () => (
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
    ),
  },
];

export default function SingleStudentOverview({ params }: SingleUserProps) {
  const slug = params.slug;
  const { data: job, loading } = useFetch<JobData>(
    `${API_GET_JOB_BY_ID}${slug}`,
  );
  const { data: applicates } = useFetch<PaginatedResponse<ApplicationsType>>(
    `${JOB_APPLICATIONS}?jobId=${job?.id}`,
  );
  const [activeTab, setActiveTab] = useState("job-overview");
  // State for filters
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [specialtyFilter, setSpecialtyFilter] = useState("");
  const [educationDateFilter, setEducationDateFilter] = useState("");

  // Filtered data
  const filteredApplications = applicates?.data.filter((application) => {
    // Search query filter
    const matchesSearch =
      !searchQuery ||
      application.applicant.firstName
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      application.applicant.email
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      application.job.title.toLowerCase().includes(searchQuery.toLowerCase());

    // Location filter
    const matchesLocation =
      !locationFilter || application.location === locationFilter;

    // Category filter
    const matchesCategory =
      !categoryFilter || application.applicant.category === categoryFilter;

    // Specialty filter
    const matchesSpecialty =
      !specialtyFilter || application.applicant.specialty === specialtyFilter;

    return (
      matchesSearch && matchesLocation && matchesCategory && matchesSpecialty
    );
  });

  console.log(job);
  console.log(applicates);

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

      <div className="mb-4 rounded-lg border bg-white p-4 shadow-sm">
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
                <div className="flex items-center gap-4 rounded-lg border bg-white p-4 shadow-sm">
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
              </div>
              <div className="mb-4 grid grid-cols-1 gap-4 lg:grid-cols-10">
                <div className="col-span-1 rounded-xl border bg-white p-4 shadow-sm lg:col-span-6">
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
                <div className="col-span-1 rounded-xl border shadow-sm lg:col-span-4">
                  <h2 className="mb-3 p-4 text-lg font-semibold">
                    Top Job Applicants
                  </h2>
                  <DynamicCountriesTable
                    data={countrydata}
                    columns={[
                      {
                        key: "country",
                        header: "Location",
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
                    showFlags={true}
                    onRowClick={(row) => console.log("Row clicked:", row)}
                  />
                </div>
              </div>
              <div className="rounded-xl border bg-white p-4 shadow-sm">
                <div className="mb-6 flex flex-col justify-between gap-2 md:flex-row md:items-center">
                  <h2 className="text-xl font-semibold">
                    Recent Job Applications
                  </h2>
                </div>

                {loading ? (
                  <p>Loading...</p>
                ) : (
                  <DynamicTable<ApplicationsType>
                    columns={columns}
                    data={applicates?.data || []}
                    minWidth={1200}
                    selectable
                  />
                )}
              </div>
            </div>
          )}
          {/* applicant list Panel */}
          {activeTab === "applicant-list" && (
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
                <DynamicTable<ApplicationsType>
                  columns={columns}
                  data={filteredApplications || []}
                  minWidth={1200}
                  pagination
                  selectable
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
