"use client";
import { Typography } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import { North, South } from "@mui/icons-material";
import useFetch from "@/hooks/useFetch";
import { Company } from "@/types";
import { API_GET_COMPANIES } from "@/api/employer";
import CompanyMiniCard, {
  CompanyMiniCardSkeleton,
} from "../../components/CompanyMiniCard";
import GenericChart from "@/components/charts/GenericChart";
import DynamicCountriesTable from "@/components/tables/CountiresTable";
import DynamicTable from "@/components/tables/DTable";
import { Download, Eye } from "lucide-react";
// Type definitions
type CountryData = {
  country: string;
  countryCode: string;
  employers?: number;
  jobs?: number;
  revenue?: number;
};
type InvoiceRecord = {
  id: number;
  updated_at: string;
  invoice: number;
  avatar?: string;
  plan: string;
  name: string;
  payment: string;
  amount: number;
  status: string;
  recipt: number;
};

interface EmployerStats {
  totalEmployers: number;
  totalEmployersGrowth: number;
  activeEmployers: number;
  activeEmployersGrowth: number;
  inactiveEmployers: number;
  inactiveEmployersGrowth: number;
}

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

// Dummy data
const dummyEmployerStats: EmployerStats = {
  totalEmployers: 2420,
  totalEmployersGrowth: 20,
  activeEmployers: 1517,
  activeEmployersGrowth: 20,
  inactiveEmployers: 903,
  inactiveEmployersGrowth: -10,
};
// transactions dummy data
const transaction: InvoiceRecord[] = [
  {
    id: 1,
    updated_at: "13 July, 2021",
    invoice: 12,
    plan: "Basic",
    name: "Jack",
    payment: "VISA",
    amount: 8.12,
    status: "Active",
    recipt: 209,
  },
  {
    id: 2,
    updated_at: "13 July, 2021",
    invoice: 12,
    plan: "Basic",
    name: "Jack",
    payment: "VISA",
    amount: 8.12,
    status: "Active",
    recipt: 209,
  },
  {
    id: 3,
    updated_at: "22 September, 2021",
    invoice: 12,
    plan: "Basic",
    name: "Jack",
    payment: "VISA",
    amount: 8.12,
    status: "Active",
    recipt: 209,
  },
  {
    id: 4,
    updated_at: "30 October, 2021",
    invoice: 12,
    plan: "Basic",
    name: "Jack",
    payment: "VISA",
    amount: 8.12,
    status: "Active",
    recipt: 209,
  },
];

// transactions columns
const columns = [
  {
    key: "orderNum",
    header: "#",
    render: (_transaction: InvoiceRecord, index: number) => (
      <span>{index + 1}</span>
    ),
  },
  {
    key: "date",
    header: "Date",
    render: (transaction: InvoiceRecord) => {
      const formattedDate = new Date(transaction.updated_at).toLocaleDateString(
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
    key: "plan",
    header: "plan",
    render: (transaction: InvoiceRecord) => {
      return <span className="text-sm">{transaction.plan || "-"}</span>;
    },
  },
  {
    key: "employer",
    header: "employer",
    render: (transaction: InvoiceRecord) => {
      return (
        <div className="flex items-center gap-2">
          <Image
            className="h-9 w-9 rounded-full object-cover"
            src={transaction?.avatar || "/images/avatar-placeholder.png"}
            alt={transaction.name}
            width={200}
            height={200}
          />
          <span className="text-sm">{transaction.name}</span>
        </div>
      );
    },
  },
  {
    key: "payment_method",
    header: "Payment Method",
    align: "center",
    render: (transaction: InvoiceRecord) => {
      return (
        <span className="text-center text-sm">
          {transaction.payment || "-"}
        </span>
      );
    },
  },
  {
    key: "amount",
    header: "Amount",
    render: (transaction: InvoiceRecord) => {
      return <span className="text-sm">{transaction.amount || "-"}</span>;
    },
  },
  {
    key: "status",
    header: "Status",
    render: (transaction: InvoiceRecord) => {
      return (
        <span
          className={`rounded-xl px-3 py-1 text-sm ${transaction.status === "active" ? "bg-green-100 text-green-700" : "bg-red-200 text-red-700"}`}
        >
          {transaction.status}
        </span>
      );
    },
  },
  {
    key: "receipt",
    header: "Receipt",
    render: (transaction: InvoiceRecord) => {
      return <span className="text-sm">{transaction.recipt || "-"}</span>;
    },
  },
  {
    key: "action",
    header: "Action",
    render: () => (
      <div className="flex items-center gap-4">
        <button className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500 text-white transition hover:bg-blue-700">
          <Eye size={17} />
        </button>
        <button className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500 text-white transition hover:bg-green-700">
          <Download size={17} />
        </button>
      </div>
    ),
  },
];

const OvarviewBilling: React.FC = () => {
  // State variables
  const [employerStats, setEmployerStats] =
    useState<EmployerStats>(dummyEmployerStats);
  const [searchQuery, setSearchQuery] = useState("");
  const { data: employers, loading } =
    useFetch<PaginatedResponse<Company>>(API_GET_COMPANIES);
  const topCompanies = employers?.data
    ?.sort(
      (a, b) => Number(b.completencePercent) - Number(a.completencePercent),
    )
    ?.filter((x) => Boolean(x.username));

  const filteredemployers = transaction?.filter((transaction) => {
    // Search filter
    const query = searchQuery.toLowerCase();
    const searchMatch =
      !query ||
      transaction.name.toLowerCase().includes(query) ||
      transaction.plan?.toLowerCase().includes(query) ||
      transaction.payment.toLowerCase().includes(query);

    return searchMatch;
  });

  return (
    <>
      {/* start Overveiw page */}
      <div className="mb-4 grid grid-cols-1 gap-4 lg:grid-cols-8">
        <div className="col-span-1 lg:col-span-5">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
            {/* Total Employers */}
            <div className="flex items-center justify-between gap-3 rounded-lg rounded-xl border bg-white p-4 shadow-sm">
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
                  src="/icons/user-1.png"
                  alt="Total Employers Icon"
                  width={30}
                  height={30}
                />
              </div>
            </div>
            {/* Active Employers */}
            <div className="flex items-center justify-between gap-3 rounded-lg rounded-xl border bg-white p-4 shadow-sm">
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
                  src="/icons/user-2.png"
                  alt="Active Employers Icon"
                  width={30}
                  height={30}
                />
              </div>
            </div>
            {/* Inactive Employers */}
            <div className="flex items-center justify-between gap-3 rounded-xl border bg-white p-4 shadow-sm">
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
                  src="/icons/user-3.png"
                  alt="Inactive Employers Icon"
                  width={30}
                  height={30}
                />
              </div>
            </div>
          </div>
          {/* Chart Section */}
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
          {/* Performance Overview */}
          <div className="rounded-base border border-gray-200 bg-white p-3 shadow-sm">
            <div className="mb-2 flex items-center justify-between border-b p-1 pb-2">
              <h5 className="text-xl font-semibold text-main">
                Top Plans
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
      <div className="space-y-4 rounded-xl border bg-white p-3 shadow-sm">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <h2 className="text-lg font-semibold">Recent Transactions</h2>
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
              placeholder="Search Transactions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full rounded-md border border-gray-300 py-2 pl-10 pr-3 text-sm focus:border-green-500 focus:outline-none focus:ring-green-500"
            />
          </div>
        </div>

        {/* Table */}
        <DynamicTable<InvoiceRecord>
          columns={columns}
          data={filteredemployers || []}
          minWidth={950}
          selectable={true}
          headerClassName="bg-green-600 text-white"
          cellClassName="text-sm py-3 px-2"
        />
      </div>
    </>
  );
};
export default OvarviewBilling;
