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
    q,
    country,
    state,
    page,
    limit,
    ctg,
    ind,
    sp,
    clv,
    emt,
    wp,
    gen,
    edu,
    sal,
    age,
  } = searchParams as {
    [key: string]: any;
  };

  const [salaryFrom, salaryTo] = sal?.split("_") || [];
  const [ageFrom, ageTo] = age?.split("_") || []
  const result = await getJobsByFilters({
    q,
    industryId: ind,
    specialityId: sp,
    categoryId: ctg,
    careerLevelId: clv,
    employmentTypeId: emt,
    workPlace: wp,
    gender: gen,
    educationLevel: edu,
    countryCode: country,
    stateCode: state,
    salaryFrom: salaryFrom,
    salaryTo: salaryTo,
    ageFrom: ageFrom,
    ageTo: ageTo,
    page: parseInt(page || "1"),
    limit: parseInt(limit || "10"),
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
