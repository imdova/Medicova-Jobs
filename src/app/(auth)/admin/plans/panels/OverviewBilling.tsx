"use client";
import { Typography } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import { North, South } from "@mui/icons-material";
import useFetch from "@/hooks/useFetch";
import { ColumnConfig, Company } from "@/types";
import { API_GET_COMPANIES } from "@/api/employer";
import CompanyMiniCard, {
  CompanyMiniCardSkeleton,
} from "../../components/CompanyMiniCard";
import GenericChart from "@/components/charts/GenericChart";
import DynamicCountriesTable from "@/components/tables/CountiresTable";
import DynamicTable from "@/components/tables/DTable";
import { Download, Eye, ShieldCheck, UserPlus, Users } from "lucide-react";
import StatusCard from "@/components/UI/StatusCard";
import DataTable from "@/components/UI/data-table";
import Flag from "@/components/UI/flagitem";
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

type TopCountry = {
  id: string;
  code: string;
  name: string;
  job: number;
  employers: number;
  revenue: string;
};

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
const statusCards: StatusCardType[] = [
  {
    title: "Total Employers",
    value: "2,420",
    icon: (
      <Users className="block h-12 w-12 rounded-full bg-blue-50 p-2 text-blue-800" />
    ),
    trend: {
      value: "+20",
      description: "Since last Week",
      trendDirection: "up",
    },
  },
  {
    title: "Active Employers",
    value: "1,517",
    icon: (
      <ShieldCheck className="block h-12 w-12 rounded-full bg-primary-100 p-2 text-primary" />
    ),
    trend: {
      value: "20%",
      trendDirection: "up",
    },
  },
  {
    title: "New Employers",
    value: "903",
    icon: (
      <UserPlus className="block h-12 w-12 rounded-full bg-amber-50 p-2 text-amber-800" />
    ),
    trend: {
      value: "20%",
      trendDirection: "down",
    },
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
const columns: ColumnConfig<InvoiceRecord>[] = [
  {
    header: "#",
    render: (_transaction: InvoiceRecord, index: number) => (
      <span>{index + 1}</span>
    ),
  },
  {
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
    header: "Payment Method",
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
          className={`rounded-lg border px-3 py-1 text-xs ${
            transaction.status.toLowerCase() === "active"
              ? "border-green-500 bg-green-50 text-green-700 ring-green-600/20"
              : "border-red-500 bg-red-50 text-red-700 ring-red-600/10"
          }`}
        >
          {transaction.status}
        </span>
      );
    },
  },
  {
    header: "Receipt",
    render: (transaction: InvoiceRecord) => {
      return <span className="text-sm">{transaction.recipt || "-"}</span>;
    },
  },
  {
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
  const [selected, setSelected] = useState<(number | string)[]>([]);
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
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
            {statusCards.map((card) => (
              <StatusCard key={card.title} {...card} />
            ))}
          </div>
          {/* Chart Section */}
          <div className="relative mt-3 overflow-hidden rounded-xl border bg-white shadow-soft">
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
        <div className="col-span-1 flex flex-col gap-4 lg:col-span-3">
          {/*  Top Plans Overview */}
          <div className="rounded-base border border-gray-200 bg-white p-3 shadow-soft">
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
          <div className="grid h-full grid-cols-1 overflow-hidden rounded-xl border bg-white shadow-soft">
            <div className="mb-3 flex justify-between gap-8 p-3">
              <Typography>
                Top Countries
                <span className="ml-1 text-xs text-secondary">(Revenue)</span>
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
      </div>
      <div className="grid grid-cols-1 space-y-4 rounded-xl border bg-white p-3 shadow-soft">
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
        <DataTable<InvoiceRecord>
          data={filteredemployers}
          columns={columns}
          isSelectable
          searchQuery={searchQuery}
          selected={selected}
          setSelected={setSelected}
        />
      </div>
    </>
  );
};
export default OvarviewBilling;
