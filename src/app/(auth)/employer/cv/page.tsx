import { redirect } from "next/navigation";

const cvPage = () => {
  // This will trigger the redirect to /cv/candidates
  redirect("/cv/candidates");
  
  return null; // Since we're redirecting, no UI is rendered here
};

export default cvPage;
