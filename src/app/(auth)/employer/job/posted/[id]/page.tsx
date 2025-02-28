import { getJobById } from "@/lib/actions/job.actions";
import { notFound } from "next/navigation";
import PostJobForm from "../../components/PostJobForm";
import { getEmploymentTypes, getIndustries } from "@/lib/actions/employer.actions";

const page = async ({
  params: { id },
  searchParams,
}: {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const isDuplicated = searchParams?.duplicate === "true";
  const result = await getJobById(id);
  const job = result.success && result.data;
  if (!job) return notFound();

  const industriesResult = await getIndustries();
  const industries = industriesResult.success && industriesResult.data || []
  const employmentResult = await getEmploymentTypes();
  const employmentTypes = employmentResult.success && employmentResult.data || []

  return <PostJobForm job={isDuplicated ? { ...job, id: undefined } : job} industries={industries} employmentTypes={employmentTypes} />;
};

export default page;
