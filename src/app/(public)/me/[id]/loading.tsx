import React from "react";
import { CircularProgress } from "@mui/material";

const LoadingPage = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <CircularProgress />
      <span className="ml-4">Loading...</span>
    </div>
  );
};

export default LoadingPage;
