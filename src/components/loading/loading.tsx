import { CircularProgress } from "@mui/material";

const Loading: React.FC = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <CircularProgress />
      <h6 className="ml-4">Loading...</h6>
    </div>
  );
};


export const IconSkeleton = () => {
  return <div className="h-6 w-6 animate-pulse rounded-full bg-gray-300"></div>;
};

export default Loading;
