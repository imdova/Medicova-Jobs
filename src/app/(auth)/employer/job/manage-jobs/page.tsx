import { Button, Tab, Tabs, TextField } from "@mui/material";
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
import { searchJobsByQueryAndDate } from "@/util/job/searchInJobs";
import { Add } from "@mui/icons-material";

const tabs: JobsTabs[] = ["all", "active", "closed", "expired", "draft"];

const page = async ({ searchParams }: {
  searchParams?: { [key: string]: string | string[] | undefined };
}
) => {
  const activeTab = searchParams?.tab as JobsTabs || "all"
  const query = searchParams?.q as string || ""
  const data = await getServerSession(authOptions);
  const user = data?.user
  if (!user?.companyId) return notFound()
  const result = await getJobsByCompanyId(user?.companyId, 1, 10);
  const { data: jobs } = result.data || { data: [], total: 0 };

  return (
    <div className="p-4" >
      {/* Header Section */}
      <div className="flex justify-between items-center mb-3 gap-3"
      >
        {/* Search Input */}
        <SearchInput
          isBounce={true}
          variant="outlined"
          placeholder="Search your job by title"
          InputProps={{
            endAdornment: (
              <SearchIcon className="text-secondary" />
            ),
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
          <TextField
            className="hidden md:block"
            type="date"
            variant="outlined"
          />
        </div>
      </div>

      {/* Tabs Section */}
      <Tabs
        value={tabs.indexOf(activeTab)}
        aria-label="basic tabs example"
        variant="scrollable"
        scrollButtons={false}
        className="text-base"
      >
        {tabs.map(tab => (
          <Link key={tab} href={{ query: { tab } }}>
            <Tab label={`${tab} (${filteredJobs(jobs, tab).length})`} />
          </Link>
        ))}
      </Tabs>
      <div className="flex flex-col gap-4 p-2">
        {filteredJobs(jobs, "all").length === 0 && (
          <div className="flex flex-col items-center justify-center gap-2 p-5">
            <h3 className="text-center text-xl text-secondary font-semibold">
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
        {searchJobsByQueryAndDate(filteredJobs(jobs, activeTab), query).map((job) => (
          <JobCard key={job.id} job={job} isEdit={true} />
        ))}
      </div>
    </div>
  );
};

export default page;
