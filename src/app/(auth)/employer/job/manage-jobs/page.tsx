import { Button, Tab, Tabs } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import JobCard from "@/components/UI/job-card";
import { JobsTabs } from "@/types";
import { filteredJobs } from "@/lib/auth/utils";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/config";
import { getJobsByCompanyId } from "@/lib/actions/job.actions";
import { notFound } from "next/navigation";
import Link from "next/link";
import SearchInput from "@/components/UI/search-Input";
import { searchJobsByQuery } from "@/util/job/searchInJobs";
import { Add } from "@mui/icons-material";
import CustomPagination from "@/components/UI/CustomPagination";
import TimeRangePicker from "@/components/UI/TimeRangePicker.tsx";
import { filterItemsByDate } from "@/util/general";

const tabs: JobsTabs[] = ["all", "active", "closed", "expired", "draft"];

const page = async ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const activeTab = (searchParams?.tab as JobsTabs) || "all";
  const query = (searchParams?.q as string) || "";
  const startDate = (searchParams?.startDate as string) || null;
  const endDate = (searchParams?.endDate as string) || null;

  const page = parseInt(String(searchParams?.page || 1));
  const limit = parseInt(String(searchParams?.limit || 10));
  const data = await getServerSession(authOptions);
  const user = data?.user;
  if (!user?.companyId) return notFound();
  const result = await getJobsByCompanyId(
    user?.companyId,
    page,
    activeTab === "all" ? limit : 100,
  );
  const { data: jobs, total } = result.data || { data: [], total: 0 };
  const filteredJobsQuery = searchJobsByQuery(jobs, query);
  const filteredJobsDate = filterItemsByDate(
    filteredJobsQuery,
    startDate,
    endDate,
  );
  const tabJobs = filteredJobs(filteredJobsDate, activeTab);
  return (
    <div className="p-4">
      {/* Header Section */}
      <div className="mb-3 flex items-center justify-between gap-3">
        {/* Search Input */}
        <SearchInput
          isBounce={true}
          variant="outlined"
          placeholder="Search your job by title"
          InputProps={{
            endAdornment: <SearchIcon className="text-secondary" />,
          }}
          sx={{
            width: { xs: "100%", md: "40%" },
            "& .MuiOutlinedInput-root": {
              borderRadius: "25px",
            },
          }}
        />

        {/* Filter Section */}
        <div className="flex gap-8">
          <TimeRangePicker />
        </div>
      </div>

      {/* Tabs Section */}
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
              <Tab
                className="text-nowrap"
                label={`${tab} (${filteredJobs(filteredJobsDate, tab).length})`}
              />
            </Link>
          ))}
        </Tabs>
      </div>
      <div className="flex flex-col gap-4 p-2">
        {total === 0 && (
          <div className="flex flex-col items-center justify-center gap-2 p-5">
            <h3 className="text-center text-xl font-semibold text-secondary">
              No jobs found
            </h3>
            <p className="text-center text-sm text-secondary">
              You can create a new job by clicking the button below
            </p>
            <Button
              variant="contained"
              LinkComponent={Link}
              href="/employer/job/posted"
              color="primary"
              startIcon={<Add />}
            >
              Create a new job
            </Button>
          </div>
        )}
        {tabJobs.map((job) => (
          <JobCard key={job.id} job={job} isEdit={true} />
        ))}
      </div>
      {activeTab === "all" && jobs.length < total && (
        <CustomPagination totalItems={total} />
      )}
    </div>
  );
};

export default page;
