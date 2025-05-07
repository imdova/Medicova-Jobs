"use client";
import { API_GET_COMPANIES } from "@/api/employer";
import DynamicTable from "@/components/tables/DTable";
import CellOptions from "@/components/UI/CellOptions";
import { ToggleButton } from "@/components/UI/ToggleButton";
import useFetch from "@/hooks/useFetch";
import { Company } from "@/types";
import { Eye, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type EmployerStatus = "all" | "new" | "active" | "inactive";

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

const EmployerList: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState<EmployerStatus>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const { data: employers, loading } =
    useFetch<PaginatedResponse<Company>>(API_GET_COMPANIES);
  console.log(employers);

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
    <div>
      {/* Employers Table */}
      <div className="rounded-xl border bg-white p-4 shadow-sm">
        <div className="mb-6 flex flex-col justify-between gap-2 md:flex-row md:items-center">
          <h2 className="text-xl font-semibold">All Employers</h2>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            {/* Status Tabs */}
            <div className="flex space-x-1 rounded-lg bg-gray-100 p-1">
              {(["all", "new", "active", "inactive"] as EmployerStatus[]).map(
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
              pagination
              headerClassName="bg-green-600 text-white"
              cellClassName="text-sm py-3 px-2"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployerList;
