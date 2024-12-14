import { redirect } from "next/navigation";

const JobPage = () => {
  // This will trigger the redirect to /job/posted
  redirect("/job/posted");
  
  return null; // Since we're redirecting, no UI is rendered here
};

export default JobPage;
