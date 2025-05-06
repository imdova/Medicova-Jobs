"use client";

import { API_GET_JOBS } from "@/api/employer";
import DynamicTable from "@/components/tables/DTable";
import CellOptions from "@/components/UI/CellOptions";
import { ToggleButton } from "@/components/UI/ToggleButton";
import useFetch from "@/hooks/useFetch";
import { JobData } from "@/types";
import { Eye, Trash } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type JobStatus = "all" | "new" | "active" | "inactive";

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

const JobList: React.FC = () => {
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
      <div className="box-content !p-0">
        <div className="mt-3 !p-0">
          {/* <OverveiwJobTable /> */}
          <div className="rounded-xl border bg-white p-4 shadow-sm">
            <div className="mb-6 flex flex-col justify-between gap-2 md:flex-row md:items-center">
              <h2 className="text-xl font-semibold">Total Jobs</h2>
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
                  pagination
                  headerClassName="bg-green-600 text-white"
                  cellClassName="text-sm py-3 px-2"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobList;
