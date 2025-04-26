import JobsResult from "./jobsResult";
import { getJobFilters, getJobsByFilters } from "@/lib/actions/job.actions";
import CustomPagination from "@/components/UI/CustomPagination";
import { filteredJobs } from "@/lib/auth/utils";
import JobFilter from "./components/JobFilter";

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
    emp,
    wp,
    gen,
    edu,
    sal,
    age,
  } = searchParams as {
    [key: string]: any;
  };

  const [salaryFrom, salaryTo] = sal?.split("_") || [];
  const [ageFrom, ageTo] = age?.split("_") || [];
  const result = await getJobsByFilters({
    q,
    industryId: ind?.split(","),
    specialityId: sp?.split(","),
    categoryId: ctg?.split(","),
    careerLevelId: clv?.split(","),
    employmentTypeId: emp?.split(","),
    workPlace: wp?.split(","),
    gender: gen?.split(","),
    educationLevel: edu?.split(","),
    countryCode: country?.split(","),
    stateCode: state?.split(","),
    salaryFrom: salaryFrom,
    salaryTo: salaryTo,
    ageFrom: ageFrom,
    ageTo: ageTo,
    page: parseInt(page || "1"),
    limit: parseInt(limit || "10"),
  });
  const { data: jobs, total } = result.data || { data: [], total: 0 };
  return (
    <main className="container mx-auto my-8 flex min-h-screen w-full flex-row p-2 lg:max-w-[1170px]">
      <JobSearchFilter />
      <div className="w-full px-2 md:px-6 md:pl-9 lg:w-[80%]">
        <JobsResult jobs={jobs} total={total} />
        {total > 0 && total > jobs.length && (
          <CustomPagination totalItems={total} />
        )}
      </div>
    </main>
  );
};

export const JobSearchFilter = async () => {
  const { data } = await getJobFilters();
  if (!data) return null;

  return <JobFilter data={data} />;
};

export default SearchPage;
