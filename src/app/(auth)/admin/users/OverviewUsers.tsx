import React from "react";
import DataTable from "@/components/UI/data-table";
import Flag from "@/components/UI/flagitem";
import { BotOff, MapPin, Pin, ShieldCheck, Users } from "lucide-react";
import {
  BarChart,
  LineChart,
  AxisConfig,
  ChartsXAxisProps,
} from "@mui/x-charts";

import { Company } from "@/types";
import StatusCard from "@/components/UI/StatusCard";
import useFetch from "@/hooks/useFetch";
import { API_GET_COMPANIES } from "@/api/employer";
import CompanyMiniCard, {
  CompanyMiniCardSkeleton,
} from "../components/CompanyMiniCard";
import OverviewEmployersTable from "../components/employers/OverviewEmployersTable";
import { API_GET_SEEKERS } from "@/api/seeker";
import { formatName } from "@/util";
import { formatLocation } from "@/util/general";
import { LocalActivityOutlined } from "@mui/icons-material";
import Avatar from "@/components/UI/Avatar";
import UsersTable from "../components/users/OverviewEmployersTable";
import { topCountriesData } from "../constants";

const statusCards: StatusCardType[] = [
  {
    title: "Total Users",
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
    title: "Active Users",
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
    title: "InActive Users",
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

const dummyChartData = {
  newEmployers: [2423, 2200, 2100, 2500, 1900, 2300],
  category: [
    "Doctors",
    "Dentists",
    "Pharmacists",
    "Physiot...",
    "Nurses",
    "Technicians",
  ],
};

const UsersOverViewPanel: React.FC = () => {
  const { data: users, setData } =
    useFetch<PaginatedResponse<UserProfile>>(API_GET_SEEKERS);

  const topUsers =
    users?.data
      ?.filter((x) => Boolean(x.userName) && Boolean(x.firstName))
      .slice(0, 5) || [];

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
              Users
              <br />
              <span className="text-xl font-semibold text-main">
                & Top Categories
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
            <BarChart
              sx={{
                ".MuiChartsAxis-line": {
                  display: "none",
                },

                ".MuiChartsAxis-tick": {
                  display: "none",
                },
                ".MuiChartsAxis-tickLabel tspan": {
                  fontSize: "8px",
                },
              }}
              margin={{ top: 30 }}
              grid={{ horizontal: true }}
              borderRadius={6} // Adds rounded corners
              slotProps={{
                legend: {
                  direction: "row",
                  position: { vertical: "bottom", horizontal: "middle" },
                  hidden: true,
                }, //  Positions the legend at the bottom-middle and aligns it in a row.
              }}
              xAxis={[
                {
                  scaleType: "band",
                  data: dummyChartData.category,
                  barGapRatio: 0.8,
                  categoryGapRatio: 0.6,
                } as AxisConfig<"band", unknown, ChartsXAxisProps>,
              ]}
              series={[
                {
                  label: "labelX",
                  data: dummyChartData.newEmployers, // Data matches each x-axis category
                  color: "#2ba149e5",
                },
              ]}
              height={400}
            />
          </div>
        </div>
        {/* Right Column */}
        <div className="flex flex-col gap-3 lg:w-2/5">
          {/* Performance Overview */}
          <div className="rounded-base border border-gray-200 bg-white shadow-soft">
            <div className="mb-2 flex items-center justify-between border-b p-3 pb-2">
              <h5 className="text-xl font-semibold text-main">
                Top Users
                <span className="ml-1 text-xs text-secondary">(Revenue)</span>
              </h5>

              {/* <DummyActionMenu /> */}
            </div>

            <DataTable
              data={topUsers}
              cellClassName="p-2 text-xs"
              className="border-none shadow-none"
              hideTableHeader={true}
              columns={[
                {
                  render: (item) => (
                    <div className="flex gap-2">
                      <Avatar
                        src={item.avatar}
                        alt={item.firstName + "image"}
                        size={32}
                      />
                      <div>
                        <p className="text-sm">{formatName(item, true)}</p>
                        <span className="text-xs text-secondary">
                          {item.speciality}
                        </span>
                      </div>
                    </div>
                  ),
                },
                {
                  render: (item) => (
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm">{formatLocation(item)}</span>
                    </div>
                  ),
                },
              ]}
            />
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
                    key: "users",
                    header: "Users",
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

      {topUsers && (
        <UsersTable
          users={users}
          updateUsers={setData}
        />
      )}
    </div>
  );
};

export default UsersOverViewPanel;
