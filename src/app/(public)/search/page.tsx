import JobsResult from "./jobsResult";
import { getJobsByFilters } from "@/lib/actions/job.actions";
import CustomPagination from "@/components/UI/CustomPagination";
import { filteredJobs } from "@/lib/auth/utils";

const SearchPage: React.FC = async ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const {
    q: query,
    cCd: countryCodes,
    page,
    limit,
  } = searchParams as {
    [key: string]: string;
  };

  const result = await getJobsByFilters({
    page: parseInt(page || "1"),
    limit: parseInt(limit || "10"),
    countryCodes: countryCodes?.split(",") || [],
  });
  if (!result.success || !result.data) return <h1>No jobs found</h1>;
  const { data: jobs, total } = result.data;
  return (
    <div className="w-full px-2 md:px-6 md:pl-9 lg:w-[80%]">
      <JobsResult jobs={jobs} total={total} />
      {total === 0 && (
        <div>
          <div className="p-4 text-center">
            <h1 className="mb-4 text-3xl font-semibold">No jobs found</h1>
            <p className="text-gray-600">
              Please refine your search by changing the keywords or the country
            </p>
          </div>
        </div>
      )}
      {total > 0 && total > jobs.length && (
        <CustomPagination totalItems={total} />
      )}
    </div>
  );
};

export default SearchPage;
