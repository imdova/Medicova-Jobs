"use client";
import {
  Button,
  Menu,
  MenuItem,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import React, { useState } from "react";
import GenericChart from "@/components/charts/GenericChart";
import {
  BotOff,
  BriefcaseBusiness,
  Download,
  Eye,
  Search,
  ShieldCheck,
} from "lucide-react";
import useFetch from "@/hooks/useFetch";
import { ColumnConfig, Company, JobData } from "@/types";
import { API_GET_COMPANIES, API_GET_JOBS } from "@/api/employer";
import Link from "next/link";
import CompanyMiniCard, {
  CompanyMiniCardSkeleton,
} from "../../components/CompanyMiniCard";
import StatusCard from "@/components/UI/StatusCard";
import DataTable from "@/components/UI/data-table";
import Flag from "@/components/UI/flagitem";
import { CheckboxField } from "@/components/form/FormModal/FormField/CheckboxField";

type TopCountry = {
  id: string;
  code: string;
  name: string;
  job: number;
  employers: number;
  revenue: string;
};

const tabs = ["New Jobs", "Active Jobs", "Inactive Jobs"];
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
    title: "All Jobs",
    value: "2,420",
    icon: (
      <BriefcaseBusiness className="block h-12 w-12 rounded-full bg-blue-50 p-2 text-blue-800" />
    ),
    trend: {
      value: "+20",
      description: "Since last Week",
      trendDirection: "up",
    },
  },
  {
    title: "Active Jobs",
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
    title: "InActive Jobs",
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
// data jobs columns
const columns: ColumnConfig<JobData>[] = [
  {
    header: "#",
    render: (_job, index) => <span>{index + 1}</span>, // Now works
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
    key: "created_at",
    header: "Date",
    render: (job: JobData) => {
      const formattedDate = new Date(job.created_at).toLocaleDateString(
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
    key: "company",
    header: "Employer",
    render: (job: JobData) => {
      return (
        <Link
          href={`/co/${job.company?.username}`}
          className="text-sm transition hover:text-primary hover:underline"
        >
          {job.company?.name || "-"}
        </Link>
      );
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
    header: "views",
    render: () => <span className="text-sm">50</span>,
  },
  {
    key: "applicationCount",
    header: "applicants",
    render: (job: JobData) => (
      <span className="text-sm">{job.applicationCount || "-"}</span>
    ),
  },
  {
    key: "active",
    header: "Status",
    render: (item) => (
      <CheckboxField
        field={{
          name: "status",
          type: "checkbox",
        }}
        controllerField={{
          value: item.active,
        }}
      />
    ),
  },
  {
    key: "state",
    header: "state",
    render: (job: JobData) => (
      <span
        className={`rounded-lg border px-3 py-1 text-xs font-semibold ${job.active ? "bg-inputDark border-green-500 bg-green-50 text-green-700 ring-green-600/20" : "bg-inputDark border-red-500 bg-red-50 text-red-700 ring-red-600/10"}`}
      >
        {job.active ? "active" : "Inactive"}
      </span>
    ),
  },
];

const OvarviewJobs: React.FC = () => {
  const [selectedItems, setSelectedItems] = useState<(number | string)[]>([]);
  const [exportAnchorEl, setExportAnchorEl] = useState(null);
  const exportOpen = Boolean(exportAnchorEl);
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [query, setQuery] = useState("");
  const exportHandleClick = (event: any) => {
    setExportAnchorEl(event.currentTarget);
  };
  const exportHandleClose = () => {
    setExportAnchorEl(null);
  };
  const { data: jobs } = useFetch<PaginatedResponse<JobData>>(API_GET_JOBS); // Only one source of truth
  const { data: companies, loading } = useFetch<PaginatedResponse<Company>>(
    API_GET_COMPANIES,
    {
      defaultLoading: true,
    },
  );
  console.log(jobs);
  const topCompanies = companies?.data
    ?.sort(
      (a, b) => Number(b.completencePercent) - Number(a.completencePercent),
    )
    ?.filter((x) => Boolean(x.username));

  return (
    <>
      {/* start Overveiw page */}
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-8">
        <div className="col-span-1 lg:col-span-5">
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
            {statusCards.map((card) => (
              <StatusCard key={card.title} {...card} />
            ))}
          </div>
          <div className="relative mt-3 overflow-hidden rounded-xl border bg-white shadow-soft">
            <GenericChart
              chartTitle="Statistics Jobs Chart"
              chartDisplayType="line"
              showCards={false}
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
        <div className="col-span-1 flex flex-col lg:col-span-3">
          <div className="rounded-base border border-gray-200 bg-white p-3 shadow-soft">
            <div className="mb-2 flex items-center justify-between border-b p-1 pb-2">
              <h5 className="text-xl font-semibold text-main">
                Total Employers
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
          <div className="mt-3 flex-1 overflow-hidden rounded-xl border bg-white shadow-soft">
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
      <div className="mt-3 !p-0">
        <div className="rounded-xl border bg-white p-4 shadow-soft">
          <div className="space-y-4">
            <div className="flex flex-col justify-between md:flex-row md:items-end">
              <div className="w-full">
                <div className="mb-6 flex flex-col justify-between gap-2 md:flex-row md:items-center">
                  <h2 className="w-full text-xl font-semibold">Recent Jobs</h2>
                  <div className="flex w-full flex-col items-end gap-2 p-2 md:flex-row">
                    <TextField
                      className="w-full"
                      variant="outlined"
                      placeholder="Search For Jobs"
                      value={query}
                      InputProps={{
                        startAdornment: <Search />,
                      }}
                      onChange={(e) => setQuery(e.target.value)}
                    />
                    <div className="w-full md:w-fit">
                      <Button
                        onClick={exportHandleClick}
                        variant="outlined"
                        aria-controls={exportOpen ? "export-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={exportOpen ? "true" : undefined}
                        className="w-full min-w-[120px] space-x-2 p-3"
                      >
                        <Download className="inline-block h-5 w-5" />
                        <p className="inline-block text-sm">Export</p>
                        <ExpandMore className="inline-block h-5 w-5" />
                      </Button>
                      <Menu
                        id="export-menu"
                        anchorEl={exportAnchorEl}
                        open={exportOpen}
                        onClose={exportHandleClose}
                        className="mt-2"
                      >
                        <MenuItem className="hover:bg-gray-200">PDF</MenuItem>
                        <MenuItem className="hover:bg-gray-200">
                          Excel (CSV)
                        </MenuItem>
                      </Menu>
                    </div>
                  </div>
                </div>
                <div className="body-container overflow-x-auto">
                  <Tabs
                    value={activeTab}
                    onChange={(e, v) => setActiveTab(v)}
                    aria-label="basic tabs example"
                    variant="scrollable"
                    scrollButtons={false}
                    className="text-base"
                  >
                    {tabs.map((tab) => (
                      <Tab
                        key={tab}
                        className="text-nowrap text-xs"
                        label={tab}
                        value={tab}
                      />
                    ))}
                  </Tabs>
                </div>
              </div>
            </div>
            <div>
              <DataTable<JobData>
                data={jobs?.data || []}
                isSelectable
                searchQuery={query}
                columns={columns}
                selected={selectedItems}
                setSelected={setSelectedItems}
                options={[
                  {
                    label: "View Profile",
                    action: () => console.log("viewed profile"),
                    icon: <Eye size={15} />,
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default OvarviewJobs;
