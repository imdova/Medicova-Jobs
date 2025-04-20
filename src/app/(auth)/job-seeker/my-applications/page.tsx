import HeaderSection from "./components/HeaderSection";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/config";
import { Button, Tab, Tabs } from "@mui/material";
import Link from "next/link";
import SearchInput from "@/components/UI/search-Input";
import {
  CheckCircle,
  Eye,
  SearchIcon,
  Star,
  ThumbsDown,
  ThumbsUp,
  User,
} from "lucide-react";
import ApplicationsResult from "./components/applicationsResult";
import ApplicationsFilter from "./components/ApplicationsFilter";
import { updateSearchParams } from "@/util/general";
import { getApplications } from "@/lib/actions/applications.actions";

type ApplicationTap =
  | "Review"
  | "Viewed"
  | "Shortlisted"
  | "Interviewed"
  | "Accepted"
  | "Rejected"
  | "Withdrawn";

const tabs: {
  type: ApplicationTap;
  icon: React.ReactNode;
}[] = [
  {
    type: "Review",
    icon: <Eye className="h-5 w-5 text-blue-500" />,
  },
  {
    type: "Viewed",
    icon: <CheckCircle className="h-5 w-5 text-indigo-500" />,
  },
  {
    type: "Shortlisted",
    icon: <Star className="h-5 w-5 text-yellow-500" />,
  },
  {
    type: "Interviewed",
    icon: <User className="h-5 w-5 text-purple-500" />,
  },
  {
    type: "Accepted",
    icon: <ThumbsUp className="h-5 w-5 text-green-600" />,
  },
  {
    type: "Rejected",
    icon: <ThumbsDown className="h-5 w-5 text-red-600" />,
  },
];

const page = async ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const activeTab = (searchParams?.tab as ApplicationStatus) || null;
  const query = (searchParams?.q as string) || "";
  const startDate = (searchParams?.startDate as string) || null;
  const endDate = (searchParams?.endDate as string) || null;

  const page = parseInt(String(searchParams?.page || 1));
  const limit = parseInt(String(searchParams?.limit || 10));
  const data = await getServerSession(authOptions);
  const user = data?.user;

  const { data: applicationsData, success: applicantsSuccess } =
    await getApplications({
      seekerId: user?.id,
      page,
      limit,
      startDate,
      status: activeTab,
    });
  const { data: applications, total } = applicationsData || {
    data: [],
    total: 0,
  };

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
      {/* <div className="rounded-base border border-gray-200 bg-white p-3 shadow-soft md:p-5"> */}

      <div className="max-w-[calc(100vw-40px)] overflow-hidden rounded-base border border-gray-200 bg-white shadow-soft">
        <Tabs
          value={activeTab || "all"}
          aria-label="basic tabs example"
          variant="scrollable"
          scrollButtons={false}
          className="text-base"
        >
          <Tab
            LinkComponent={Link}
            href={updateSearchParams("tab", "", searchParams)}
            value={"all"}
            label={
              <div className="flex items-center gap-2">
                <span>all ({total})</span>
              </div>
            }
          />
          {tabs.map((tab) => (
            <Tab
              key={tab.type}
              LinkComponent={Link}
              href={updateSearchParams("tab", tab.type, searchParams)}
              value={tab.type}
              label={
                <div className="flex items-center gap-2">
                  <span>{tab.icon}</span>
                  <span>{tab.type} (0)</span>
                </div>
              }
            />
          ))}
        </Tabs>
      </div>
      <ApplicationsResult applications={applications} />
      {applications.length === 0 && !activeTab && (
        <div className="flex min-h-64 w-full flex-col items-center justify-center gap-2 p-5">
          <h3 className="text-center text-xl font-semibold text-secondary">
            No applications found
          </h3>
          <p className="text-center text-sm text-secondary">
            You have not applied to any jobs yet.
          </p>
          <Button LinkComponent={Link} href="/search" variant="contained">
            Find Jobs
          </Button>
        </div>
      )}
    </div>
  );
};

export default page;
