import React from "react";
import { CircularProgress } from "@mui/material";
import Link from "next/link";

type CompleteProfileProps = {
  percentage?: number;
};
const CompleteProfile: React.FC<CompleteProfileProps> = ({ percentage }) => {
  // Function to determine color based on value
  const getProgressColor = (progress: number): string => {
    if (progress >= 80) return "var(--primary)";
    if (progress >= 50) return "var(--warning)";
    return "var(--error)";
  };

  if (!percentage || percentage >= 100) return null;

  const progressColor = getProgressColor(percentage);

  return (
    <div className="mb-5 flex rounded-base border border-gray-100 bg-white p-3 shadow-soft md:p-5">
      {/* Title and Description */}
      <div className="flex-1">
        <Link
          href={"/employer/company-info"}
          className="mb-2 text-2xl font-bold hover:underline"
          style={{ color: progressColor }}
        >
          Complete your company profile!
        </Link>
        <p className="max-w-60 text-secondary">
          You are almost there—lets finish setting things up!
        </p>
      </div>
      {/* Circular Progress with Value */}
      <div className="grid h-[70px] w-[70px] grid-cols-1 grid-rows-1">
        <CircularProgress
          variant="determinate"
          value={percentage}
          size={70}
          sx={{
            color: progressColor,
          }}
          className="col-start-1 row-start-1"
        />
        <div className="col-start-1 row-start-1 flex items-center justify-center">
          <span className="text-xl font-black" style={{ color: progressColor }}>
            {percentage}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default CompleteProfile;
