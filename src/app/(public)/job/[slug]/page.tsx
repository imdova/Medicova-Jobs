import { getJobById } from "@/lib/actions/job.actions";
import { notFound } from "next/navigation";
import JobDetailPage from "./jobDetailsPage";

const page = async ({ params: { slug } }: { params: { slug: string } }) => {
  const result = await getJobById(slug);
  const job = result.success && result.data;
  if (!job) return notFound();

  return <JobDetailPage job={job} />;
};

export default page;
