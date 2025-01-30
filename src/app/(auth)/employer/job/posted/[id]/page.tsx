import { getJobById } from "@/lib/actions/job.actions";
import { notFound } from "next/navigation";
import PostJobForm from "../../components/PostJobForm";

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

  return <PostJobForm job={isDuplicated ? { ...job, id: undefined } : job} />;
};

export default page;
