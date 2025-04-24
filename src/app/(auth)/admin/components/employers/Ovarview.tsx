import React from "react";
import DataTable from "@/components/UI/data-table";
import Flag from "@/components/UI/flagitem";
import { BotOff, ShieldCheck, Users } from "lucide-react";
import { LineChart } from "@mui/x-charts";
import { Company } from "@/types";
import CompanyMiniCard, { CompanyMiniCardSkeleton } from "../CompanyMiniCard";
import StatusCard from "@/components/UI/StatusCard";
import useFetch from "@/hooks/useFetch";
import { API_GET_COMPANIES } from "@/api/employer";
import OverviewEmployersTable from "./OverviewEmployersTable";

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
    title: "InActive Employers",
    value: "903",
    icon: (
      <BotOff className="block h-12 w-12 rounded-full bg-amber-50 p-2 text-amber-800" />
    ),
    trend: {
      value: "20%",
      trendDirection: "down",
    },
  },
];

interface ChartData {
  newEmployers: number[];
  jobApplicants: number[];
  months: string[];
}

const chartData: ChartData = {
  newEmployers: [120, 150, 180, 220, 270, 310, 330, 290, 320, 350, 380, 400],
  jobApplicants: [
    1800, 2200, 2600, 3100, 3500, 3800, 4200, 3900, 4300, 4700, 5100, 5500,
  ],
  months: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
};

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
      <div className="flex flex-col gap-2 lg:flex-row">
        <div className="flex-1 lg:w-3/5">
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
            {statusCards.map((card) => (
              <StatusCard key={card.title} {...card} />
            ))}
          </div>
          {/* Chart Section */}
          <div className="relative mt-3 rounded-base border border-gray-200 bg-white p-3 shadow-soft">
            <h5 className="p-1 text-xl font-semibold text-main">
              Employer
              <br />
              <span className="text-xl font-semibold text-main">
                & Job Application Trends
              </span>
            </h5>
            <div className="mt-4 flex w-full items-center justify-between">
              <h5 className="text-secondary">
                Statistics
                <br />
                <span className="text-main">User Report</span>
              </h5>
              <div className="rounded-base border border-gray-200">
                {["day", "week", "month", "3 months", "year"].map((x) => (
                  <button
                    key={x}
                    className="rounded-base px-4 py-2 text-xs hover:bg-primary hover:text-white"
                  >
                    {x}
                  </button>
                ))}
              </div>
            </div>
            <LineChart
              margin={{ top: 30, bottom: 70, left: 40, right: 10 }}
              xAxis={[{ data: chartData.months, scaleType: "point" }]}
              slotProps={{
                legend: {
                  direction: "row",
                  position: { vertical: "bottom", horizontal: "middle" },
                },
              }}
              series={[
                {
                  curve: "linear",
                  data: chartData.newEmployers, // Uses actual data
                  label: "New Employers",
                  color: "#FF8743",
                },
                {
                  curve: "linear",
                  data: chartData.jobApplicants, // Uses actual data
                  label: "Job Applications",
                  color: "#0884FF",
                },
              ]}
              height={400}
              grid={{ horizontal: true }}
              sx={{
                ".MuiChartsAxis-line": { display: "none" },
                ".MuiChartsAxis-tick": { display: "none" },
                ".MuiChartsLegend-mark": { borderRadius: 100 },
                ".MuiChartsAxis-tickLabel tspan": { fontSize: "10px" },
                ".css-1u0lry5-MuiChartsLegend-root tspan": { fontSize: "10px" },
              }}
            />
          </div>
        </div>
        {/* Right Column */}
        <div className="flex flex-col gap-3 lg:w-2/5">
          {/* Performance Overview */}
          <div className="rounded-base border border-gray-200 bg-white p-3 shadow-soft">
            <div className="mb-2 flex items-center justify-between border-b p-1 pb-2">
              <h5 className="text-xl font-semibold text-main">
                Performance Overview
                <span className="ml-1 text-xs text-secondary">(Revenue)</span>
              </h5>

              {/* <DummyActionMenu /> */}
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
          <div className="rounded-base border border-gray-200 bg-white shadow-soft">
            <div className="mb-2 flex items-center justify-between border-b p-3 pb-2">
              <h5 className="text-xl font-semibold text-main">
                Top Countries
                <span className="ml-1 text-xs text-secondary">(Revenue)</span>
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

      {topCompanies && (
        <OverviewEmployersTable
          companies={{ data: topCompanies, total: topCompanies?.length }}
          updateCompanyData={setData}
        />
      )}
    </div>
  );
};

export default DashboardOverView;
