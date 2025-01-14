import dynamic from "next/dynamic";

// Dynamically import the PostJobForm component with SSR disabled
const PostJobForm = dynamic(() => import("../components/PostJobForm"), {
  ssr: false,
});

const PostJobPage = () => {
  return <PostJobForm />;
};

export default PostJobPage;
