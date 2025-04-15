import { notFound } from "next/navigation";
import JobApplicantsResult from "./jobApplicants";
import { getApplications } from "@/lib/actions/applications.actions";
import { filterSections } from "@/constants";
import CustomPagination from "@/components/UI/CustomPagination";
import Filter from "@/components/Layout/filter/filter";

const Page = async ({ params: { id } }: { params: { id: string } }) => {
  const { data, success: applicantsSuccess } = await getApplications({
    jobId: id,
  });
  if (!applicantsSuccess) return notFound();
  const { data: applications, total } = data || { data: [], total: 0 };
  return (
    <div className="flex min-h-screen w-full px-2">
      {/* Left Column: Filter Section */}
      <Filter sections={filterSections} />
      {/* Right Column: Job Applicants */}
      <JobApplicantsResult applications={applications} />
      {total > 0 && total > applications.length && (
        <CustomPagination totalItems={total} />
      )}
    </div>
  );
};

export default Page;
