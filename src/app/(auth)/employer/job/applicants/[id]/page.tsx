import { getJobById } from "@/lib/actions/job.actions";
import { notFound } from "next/navigation";
import JobApplicantsResult from "./jobApplicants";
import { getApplications } from "@/lib/actions/applications.actions";
import { filterSections } from "@/constants";
import CustomPagination from "@/components/UI/CustomPagination";
import { getPaginatedSeekers } from "@/lib/actions/employer.actions";
import FilterSideBar from "@/components/Layout/filter/silter-sidebar";

const Page = async ({ params: { id } }: { params: { id: string } }) => {
  const { data: job, success: jobSuccess } = await getJobById(id);
  const { data: applicantsPages, success: applicantsSuccess } =
    await getApplications({ jobId: id });
  const { data: applications, total } = applicantsPages
    ? applicantsPages
    : { data: [], total: 0 };
  const applicantsIds = (applications.map((x) => x.seekerId) || []).filter(
    (id): id is string => id !== null,
  );
  const { data: seekers, success: seekersSuccess } =
    await getPaginatedSeekers();
  if (!jobSuccess || !applicantsSuccess || !seekersSuccess) return notFound();
  // const { data: users, success: usersSuccess } =
  //   await getUsersWithIds(applicantsIds);

  const doctors = seekers?.data.filter((x) =>
    applicantsIds.includes(x.id as string),
  );
  return (
    <div className="container mx-auto my-8 flex min-h-screen w-full flex-row gap-5 p-2 lg:max-w-[1300px]">
      {/* Left Column: Filter Section */}
      <FilterSideBar
        sections={filterSections}
        searchKeys={["Residency (Location)"]}
      />
      {job && <JobApplicantsResult job={job} doctors={doctors || []} />}
      {total > 0 && total > applications.length && (
        <CustomPagination totalItems={total} />
      )}
    </div>
  );
};

export default Page;
