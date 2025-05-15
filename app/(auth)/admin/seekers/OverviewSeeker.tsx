import React, { Suspense } from "react";
import DataTable from "@/components/UI/data-table";
import Flag from "@/components/UI/flagitem";
import { BotOff, MapPin, ShieldCheck, Users } from "lucide-react";
import StatusCard from "@/components/UI/StatusCard";
import useFetch from "@/hooks/useFetch";
import { API_GET_SEEKERS } from "@/api/seeker";
import { formatName } from "@/util";
import { formatLocation } from "@/util/general";
import Avatar from "@/components/UI/Avatar";
import { topCountriesData } from "../constants";
import { Typography } from "@mui/material";
import GenericChart from "@/components/charts/GenericChart";
import SeekersTable from "../components/seekers/OverviewSeekersTable";

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

const OverviewSeekerPage: React.FC = () => {
  const { data: Seeker, setData } =
    useFetch<PaginatedResponse<UserProfile>>(API_GET_SEEKERS);

  const topSeeker =
    Seeker?.data
      ?.filter((x) => Boolean(x.userName) && Boolean(x.firstName))
      .slice(0, 5) || [];

  return (
    <div className="space-y-2">
      {/* Stats Section */}
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-10">
        <div className="col-span-1 lg:col-span-6">
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
            {statusCards.map((card) => (
              <StatusCard key={card.title} {...card} />
            ))}
          </div>
          {/* Chart Section */}
          <div className="relative mt-3 overflow-hidden rounded-xl border bg-white shadow-soft">
            <GenericChart
              chartTitle="Seekers & Job applications Trends"
              data={{
                yearly: {
                  categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                  series: [
                    {
                      name: "New Seeker",
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
                      name: "New Seeker",
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
                      name: "New Seeker",
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
                { title: "New Seeker", value: "1,240", color: "#FF8743" },
                {
                  title: "Job applications",
                  value: "2,480",
                  color: "#0884FF",
                },
              ]}
            />
          </div>
        </div>
        {/* Right Column */}
        <div className="col-span-1 flex flex-col gap-3 lg:col-span-4">
          {/* Performance Overview */}
          <div className="rounded-base border border-gray-200 bg-white shadow-soft">
            <div className="mb-2 flex items-center justify-between border-b p-3 pb-2">
              <h5 className="text-xl font-semibold text-main">
                Top Seeker
                <span className="ml-1 text-xs text-secondary">(Revenue)</span>
              </h5>

              {/* <DummyActionMenu /> */}
            </div>

            <DataTable
              data={topSeeker}
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
          <div className="h-full overflow-hidden rounded-xl border bg-white shadow-soft">
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
      {/* Seekers Table */}
      <Suspense>{topSeeker && <SeekersTable />}</Suspense>
    </div>
  );
};

export default OverviewSeekerPage;
