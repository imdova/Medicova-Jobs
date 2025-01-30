import { getJobById } from "@/lib/actions/job.actions";
import { notFound } from "next/navigation";
import JobApplicantsResult from "./jobApplicants";
import { getApplicationsByJobId } from "@/lib/actions/applications.actions";
import { filterSections } from "@/constants";
import JobFilter from "@/app/(public)/search/filter";
import CustomPagination from "@/components/UI/CustomPagination";
import { getPaginatedSeekers } from "@/lib/actions/employer.actions";

const Page = async ({ params: { id } }: { params: { id: string } }) => {
  const result = await getJobById(id);
  const applicationsResult = await getApplicationsByJobId(id);
  const seekers = await getPaginatedSeekers();
  const job = result.success && result.data;
  if (!job) return notFound();
  const { data: applications, total } = applicationsResult.data || {
    data: [],
    total: 0,
  };
  const doctors =
    seekers.data?.data.filter((x) =>
      applications.map((x) => x.seekerId).includes(x.id || ""),
    ) || [];
  return (
    <div className="container mx-auto my-8 flex min-h-screen w-full flex-row gap-5 p-2 lg:max-w-[1300px]">
      {/* Left Column: Filter Section */}
      <JobFilter
        sections={filterSections}
        searchKeys={["Residency (Location)"]}
      />
      {applicationsResult.success && applicationsResult.data && (
        <JobApplicantsResult job={job} doctors={doctors} />
      )}
      {total > 0 && total > applications.length && (
        <CustomPagination totalItems={total} />
      )}
    </div>
  );
};

export default Page;
