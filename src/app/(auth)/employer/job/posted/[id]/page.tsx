import { getJobById } from "@/lib/actions/job.actions";
import { notFound } from "next/navigation";
import PostJobForm from "../../components/PostJobForm";

const page = async ({ params: { id } }: { params: { id: string } }) => {
  console.log("🚀 ~ page ~ id:", id)
  const result = await getJobById(id);
  const job = result.success && result.data;
  if (!job) return notFound();

  return <PostJobForm job={job} />;
};

export default page;
