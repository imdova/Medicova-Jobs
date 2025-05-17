import React from "react";
import DataTable from "@/components/UI/data-table";
import Flag from "@/components/UI/flagitem";
import { BotOff, ShieldCheck, Users } from "lucide-react";
import { Company } from "@/types";
import CompanyMiniCard, { CompanyMiniCardSkeleton } from "../CompanyMiniCard";
import StatusCard from "@/components/UI/StatusCard";
import useFetch from "@/hooks/useFetch";
import { API_GET_COMPANIES } from "@/api/employer";
import OverviewEmployersTable from "./OverviewEmployersTable";
import GenericChart from "@/components/charts/GenericChart";

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
      <Users className="block h-11 w-11 rounded-full bg-blue-50 p-2 text-blue-800" />
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
      <ShieldCheck className="bg-primary-100 text-primary block h-11 w-11 rounded-full p-2" />
    ),
    trend: {
      value: "20%",
      trendDirection: "up",
    },
  },
  {
    title: "InActive Employers",
    value: "903",
    icon: (
      <BotOff className="block h-11 w-11 rounded-full bg-amber-50 p-2 text-amber-800" />
    ),
    trend: {
      value: "20%",
      trendDirection: "down",
    },
  },
];

const DashboardOverView: React.FC = () => {
  const {
    data: companies,
    loading,
    setData,
  } = useFetch<PaginatedResponse<Company>>(API_GET_COMPANIES, {
    defaultLoading: true,
  });

  const topCompanies = companies?.data
    ?.sort(
      (a, b) => Number(b.completencePercent) - Number(a.completencePercent),
    )
    ?.filter((x) => Boolean(x.username));

  return (
    <div className="space-y-2">
      {/* Stats Section */}
      <div className="grid grid-cols-1 gap-2 lg:grid-cols-9">
        <div className="col-span-1 lg:col-span-6">
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
            {statusCards.map((card) => (
              <StatusCard key={card.title} {...card} />
            ))}
          </div>
          {/* Chart Section */}
          <div className="shadow-soft relative mt-3 overflow-hidden rounded-xl border border-gray-200 bg-white">
            <GenericChart
              chartTitle="Employers & Job applications Trends"
              data={{
                yearly: {
                  categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                  series: [
                    {
                      name: "New employer",
                      data: [100, 120, 90, 140, 110, 130],
                      color: "#FF8743",
                    },
                    {
                      name: "Job applications",
                      data: [200, 240, 180, 280, 220, 260],
                      color: "#0884FF",
                    },
                  ],
                },
                monthly: {
                  categories: ["Week 1", "Week 2", "Week 3", "Week 4"],
                  series: [
                    {
                      name: "New employer",
                      data: [30, 40, 35, 45],
                      color: "#FF8743",
                    },
                    {
                      name: "Job applications",
                      data: [60, 80, 70, 90],
                      color: "#0884FF",
                    },
                  ],
                },
                weekly: {
                  categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                  series: [
                    {
                      name: "New employer",
                      data: [10, 15, 12, 18, 14, 8, 5],
                      color: "#FF8743",
                    },
                    {
                      name: "Job applications",
                      data: [20, 30, 25, 35, 28, 15, 10],
                      color: "#0884FF",
                    },
                  ],
                },
              }}
              cards={[
                { title: "New employer", value: "1,240", color: "#FF8743" },
                { title: "Job applications", value: "2,480", color: "#0884FF" },
              ]}
            />
          </div>
        </div>
        {/* Right Column */}
        <div className="col-span-1 flex flex-col gap-3 lg:col-span-3">
          {/* Performance Overview */}
          <div className="rounded-base shadow-soft border border-gray-200 bg-white">
            <div className="mb-2 flex items-center justify-between border-b border-gray-200 p-1 pb-2">
              <h5 className="text-main p-2 text-lg font-semibold">
                Performance Overview
                <span className="text-secondary ml-1 text-xs">(Revenue)</span>
              </h5>

              {/* <DummyActionMenu /> */}
            </div>
            {loading ? (
              <div className="grid grid-cols-1 gap-3 p-3 md:grid-cols-2">
                {[1, 2, 3, 4].map((item) => (
                  <CompanyMiniCardSkeleton key={item} />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3 p-3 md:grid-cols-2">
                {topCompanies
                  ?.slice(0, 4)
                  .map((company) => (
                    <CompanyMiniCard key={company.id} company={company} />
                  ))}
              </div>
            )}
          </div>
          {/* Top Countries */}
          <div className="rounded-base shadow-soft border border-gray-200 bg-white">
            <div className="mb-2 flex items-center justify-between border-b border-gray-200 p-3 pb-2">
              <h5 className="text-main text-lg font-semibold">
                Top Countries
                <span className="text-secondary ml-1 text-xs">(Revenue)</span>
              </h5>

              {/* <DummyActionMenu /> */}
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
      {/* Employers Table */}
      {topCompanies && <OverviewEmployersTable />}
    </div>
  );
};

export default DashboardOverView;
