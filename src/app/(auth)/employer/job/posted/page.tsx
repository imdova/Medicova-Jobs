import dynamic from "next/dynamic";

// Dynamically import the PostJobForm component with SSR disabled
const PostJobForm = dynamic(() => import("../components/PostJobForm"), {
  ssr: false,
});

const PostJobPage = () => {
  return (
    <div className="p-2 md:p-5 bg-white min-h-screen">
      <PostJobForm />
    </div>
  );
};

export default PostJobPage;
