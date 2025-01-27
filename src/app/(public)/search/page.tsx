import JobsResult from "./jobsResult";
import {
  getJobsByFilters,
} from "@/lib/actions/job.actions";
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
      <JobsResult jobs={jobs} />
      <CustomPagination
        totalItems={100}
      />
    </div>
  );
};

export default SearchPage;
