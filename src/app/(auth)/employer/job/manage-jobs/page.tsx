import { TextField } from "@mui/material";
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

const tabs: JobsTabs[] = ["active", "closed", "expired", "draft"];

const page = async ({ searchParams }: {
  searchParams?: { [key: string]: string | string[] | undefined };
}
) => {
  const activeTab = searchParams?.tab as JobsTabs || "active"
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
      <div className="max-w-[calc(100vw-40px)]  overflow-x-auto ">
        <div className="flex gap-3 md:gap-7 py-4 px-4"
        >
          {tabs.map((tab) => (
            <Link
              href={{ query: { tab } }}
              key={tab}
              scroll={false}
              className={`${activeTab === tab ? "border-primary" : "border-transparent"} border-b-2  hover:text-gray-600 capitalize text-main md:text-lg`}
            >
              {`${tab} (${filteredJobs(jobs, tab).length})`}
            </Link>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-4 p-2">
        {/* {filteredJobs(jobs, tabs[activeTab]).map((job) => ( */}
        {searchJobsByQueryAndDate(filteredJobs(jobs, activeTab), query).map((job) => (
          <JobCard key={job.id} job={job} isEdit={true} />
        ))}
      </div>
    </div>
  );
};

export default page;
