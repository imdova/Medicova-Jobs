import JobsResult from "./jobsResult";
import { getJobsByFilters } from "@/lib/actions/job.actions";
import CustomPagination from "@/components/UI/CustomPagination";
import { filteredJobs } from "@/lib/auth/utils";

const SearchPage: React.FC = async ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const { q, country, page, limit, ctg } = searchParams as {
    [key: string]: string;
  };

  const result = await getJobsByFilters({
    q,
    page: parseInt(page || "1"),
    limit: parseInt(limit || "10"),
    countryCode: country,
    categoryId: ctg,
  });
  if (!result.success || !result.data) return <h1>No jobs found</h1>;
  const { data, total } = result.data;
  const jobs = filteredJobs(data, "active");
  return (
    <div className="w-full px-2 md:px-6 md:pl-9 lg:w-[80%]">
      <JobsResult jobs={jobs} total={total} />
      {total > 0 && total > jobs.length && (
        <CustomPagination totalItems={total} />
      )}
    </div>
  );
};

export default SearchPage;
