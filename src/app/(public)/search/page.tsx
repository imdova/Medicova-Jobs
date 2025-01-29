import JobsResult from "./jobsResult";
import { getJobsByFilters } from "@/lib/actions/job.actions";
import CustomPagination from "@/components/UI/CustomPagination";

const SearchPage: React.FC = async ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const {
    q: query,
    country,
    cCd,
  } = searchParams as {
    [key: string]: string;
  };

  const result = await getJobsByFilters();
  if (!result.success || !result.data) return <h1>No jobs found</h1>;
  const { data: jobs, total } = result.data;
  return (
    <div className="w-full px-2 md:px-6 md:pl-9 lg:w-[80%]">
      <JobsResult jobs={jobs} total={total} />
      {total === 0 && <div>
          <div className=" p-4 text-center">
            <h1 className="text-3xl font-semibold mb-4">
              No jobs found
            </h1>
            <p className="text-gray-600">
              Please refine your search by changing the keywords or the country
            </p>
          </div>
        </div>}
      {total > 0 && total > jobs.length && (
        <CustomPagination totalItems={total} />
      )}
    </div>
  );
};

export default SearchPage;
