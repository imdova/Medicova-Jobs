import CustomPagination from "@/components/UI/CustomPagination";
import HeaderSection from "./components/HeaderSection";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/config";
import { Button, Chip, Tab, Tabs } from "@mui/material";
import Link from "next/link";
import SearchInput from "@/components/UI/search-Input";
import { SearchIcon } from "lucide-react";
import { FilterList } from "@mui/icons-material";
import DataTable from "@/components/UI/data-table";
import Avatar from "@/components/UI/Avatar";
import ApplicationsResult from "./components/applicationsResult";
import ApplicationsFilter from "./components/ApplicationsFilter";

// TODO: Error: Property 'filter' does not exist on type 'never'.ts(2339)

type ApplicationsTabs =
  | "all"
  | "review"
  | "viewed"
  | "shortlisted"
  | "interviewed"
  | "accepted"
  | "rejected";
const tabs: ApplicationsTabs[] = [
  "all",
  "review",
  "viewed",
  "shortlisted",
  "interviewed",
  "accepted",
  "rejected",
];

const page = async ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const activeTab = (searchParams?.tab as ApplicationsTabs) || "all";
  const query = (searchParams?.q as string) || "";
  const startDate = (searchParams?.startDate as string) || null;
  const endDate = (searchParams?.endDate as string) || null;

  const page = parseInt(String(searchParams?.page || 1));
  const limit = parseInt(String(searchParams?.limit || 10));
  const data = await getServerSession(authOptions);
  const user = data?.user;

  // const result = await getJobsByCompanyId(
  //     user?.companyId,
  //     page,
  //      100,
  //   );
  //   const { data: jobs, total } = result.data || { data: [], total: 0 };
  //   const filteredJobsQuery = searchJobsByQuery(jobs, query);
  //   const filteredJobsDate = filterItemsByDate(
  //     filteredJobsQuery,
  //     startDate,
  //     endDate,
  //   );
  //   const tabJobs = filteredJobs(filteredJobsDate, activeTab);

  // TODO:  number of applications in each  tab
  return (
    <div className="space-y-4 px-2 md:px-5">
      <HeaderSection />
      <div className="flex items-center justify-between">
        <h6 className="text-xl font-medium">Applications History</h6>
        <div className="flex w-full gap-2 md:w-auto">
          <SearchInput
            isBounce={true}
            variant="outlined"
            placeholder="Search your job by title"
            InputProps={{
              endAdornment: <SearchIcon className="text-secondary" />,
            }}
          />
          <ApplicationsFilter />
        </div>
      </div>
      <div className="max-w-[calc(100vw-40px)]">
        <Tabs
          value={tabs.indexOf(activeTab)}
          aria-label="basic tabs example"
          variant="scrollable"
          scrollButtons={false}
          className="text-base"
        >
          {tabs.map((tab) => (
            <Link key={tab} href={{ query: { ...searchParams, tab } }}>
              <Tab className="text-nowrap" label={`${tab} (0)`} />
            </Link>
          ))}
        </Tabs>
      </div>
      <ApplicationsResult />
    </div>
  );
};

export default page;
